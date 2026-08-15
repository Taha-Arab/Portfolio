"use client";

import { openDigitalTwin } from "@/lib/twin-events";

export function TwinHeroButton() {
  return (
    <button
      onClick={openDigitalTwin}
      className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-neutral-500 hover:text-neutral-50 transition-colors inline-flex items-center gap-2"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Chat with my AI twin
    </button>
  );
}

export function TwinBanner() {
  return (
    <button
      onClick={openDigitalTwin}
      className="group w-full flex items-center justify-center gap-2 border-y border-neutral-900 bg-neutral-900/40 py-4 text-sm text-neutral-300 hover:text-neutral-50 hover:bg-neutral-900/70 transition-colors"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      Curious what I'd say in an interview? Ask my AI digital twin
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}
