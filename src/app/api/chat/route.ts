import type { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/twin-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "openai/gpt-oss-20b:free";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY = 12;
const RATE_LIMIT = { windowMs: 60_000, max: 12 };

type ChatMessage = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [id, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) hits.delete(id);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of input.slice(-MAX_HISTORY)) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LENGTH) });
  }

  const last = messages.at(-1);
  if (!last || last.role !== "user") return null;
  return messages;
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return errorResponse("The digital twin is not configured. OPENROUTER_API_KEY is missing.", 500);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local";

  if (isRateLimited(ip)) {
    return errorResponse("You're sending messages a little fast. Give it a moment.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const messages = parseMessages((body as { messages?: unknown } | null)?.messages);
  if (!messages) return errorResponse("Invalid message history.", 400);

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": request.nextUrl.origin,
        "X-Title": "Taha Arab Digital Twin",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        // gpt-oss spends tokens on reasoning before it emits any answer text,
        // so keep the effort low and leave headroom in the budget.
        reasoning: { effort: "low" },
        max_tokens: 1400,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    return errorResponse(
      process.env.NODE_ENV === "production"
        ? "Couldn't reach the model provider. Try again in a moment."
        : `Couldn't reach the model provider (${detail}).`,
      502,
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error(`OpenRouter ${upstream.status}: ${detail.slice(0, 500)}`);
    const message =
      upstream.status === 429
        ? "The free model is rate limited right now. Try again shortly."
        : "The model provider returned an error. Try again in a moment.";
    return errorResponse(message, 502);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            // OpenRouter sends ": OPENROUTER PROCESSING" keep-alive comments.
            if (!trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const chunk = JSON.parse(payload);
              const text: unknown = chunk?.choices?.[0]?.delta?.content;
              if (typeof text === "string" && text) controller.enqueue(encoder.encode(text));
            } catch {
              // Ignore partial or non-JSON frames.
            }
          }
        }
        controller.close();
      } catch (error) {
        console.error("Stream failure:", error);
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
