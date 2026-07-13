"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Connect your handle",
    copy: "Add your Codeforces, LeetCode, or AtCoder handle and choose what to sync first.",
  },
  {
    number: "02",
    title: "Sync your history",
    copy: "We ingest submissions, contests, solved difficulty, and topic coverage into one profile.",
  },
  {
    number: "03",
    title: "Get your plan",
    copy: "Receive a focused report with weak topics, projected rating movement, and your next practice block.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="mx-auto max-w-shell px-6 py-32">
      <p className="font-mono text-sm text-signal">// how it works</p>
      <h2 className="mt-3 max-w-lg font-display text-3xl text-text-primary md:text-4xl">
        Three steps. No guesswork.
      </h2>

      <div ref={ref} className="mt-12 border-t border-line">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.24, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[120px_1fr]"
          >
            <div className="font-mono text-sm text-text-secondary">{step.number}</div>
            <div>
              <h3 className="font-display text-xl text-text-primary">{step.title}</h3>
              <p className="mt-3 max-w-xl font-body text-sm text-text-secondary">{step.copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}