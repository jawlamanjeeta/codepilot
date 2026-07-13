"use client";

import { MagneticButton } from "@/components/magnetic-button";

export function FinalCtaBand() {
  return (
    <section className="bg-panel">
      <div className="mx-auto flex max-w-shell flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm text-signal">// next step</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-text-primary md:text-4xl">
            Connect your handle and generate your first competitive programming report.
          </h2>
        </div>

        <MagneticButton>
          <button className="rounded-sm border border-signal bg-signal px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bg-void">
            Connect your handle
          </button>
        </MagneticButton>
      </div>
    </section>
  );
}