"use client";

import { useState } from "react";
import type { ShowcaseItem } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function ShowcaseGrid({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState<ShowcaseItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <Reveal
            key={item.slug}
            delay={(i % 4) * 80}
            className={item.featured ? "md:col-span-2" : ""}
          >
          <div className="group flex flex-col text-left w-full h-full rounded-xl border border-neutral-800 bg-neutral-950 hover:border-sky-500 transition-colors overflow-hidden">
            <button
              onClick={() => setActive(item)}
              className="flex flex-col text-left w-full flex-1"
            >
              <div className="flex items-center justify-between gap-4 border-b border-neutral-800 p-6 md:p-8">
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-neutral-50">
                    {item.metric}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-neutral-500">
                    {item.metricLabel}
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-400 group-hover:border-sky-500 group-hover:text-sky-300 group-hover:bg-sky-500/10 transition-colors">
                  View details
                </span>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-neutral-500">{item.org}</p>
                <h3 className="mt-2 text-xl md:text-2xl font-medium text-neutral-50">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{item.period}</p>
                <p className="mt-4 text-neutral-400 leading-relaxed">{item.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400 group-hover:border-sky-800 group-hover:text-sky-300 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </button>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 border-t border-emerald-500/30 bg-emerald-500/10 px-6 md:px-8 py-4 text-sm font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-neutral-950 hover:border-emerald-500 transition-colors"
              >
                {item.linkLabel ?? "View it here"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            )}
          </div>
          </Reveal>
        ))}
      </div>

      <Drawer item={active} onClose={() => setActive(null)} />
    </>
  );
}

function Drawer({ item, onClose }: { item: ShowcaseItem | null; onClose: () => void }) {
  const open = item !== null;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel: full-screen on mobile, constrained slide-over on desktop */}
      <div
        className={`absolute right-0 top-0 h-full w-full md:max-w-xl bg-neutral-950 border-l border-neutral-800 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {item && (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 p-6 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{item.org}</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-neutral-50">
                  {item.drawer.heading}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">{item.period}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full border border-neutral-700 h-10 w-10 flex items-center justify-center text-neutral-400 hover:text-sky-300 hover:border-sky-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {item.drawer.body.map((section) => (
                <div key={section.label}>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300">
                    {section.label}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="text-neutral-400 leading-relaxed flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300">
                  Tools & Skills
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-2 rounded-full bg-emerald-500 text-neutral-950 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-400 transition-colors"
                >
                  {item.linkLabel ?? "View it here"}
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
