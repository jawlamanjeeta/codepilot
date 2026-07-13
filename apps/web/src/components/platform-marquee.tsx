"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Codeforces",
  "LeetCode",
  "AtCoder",
  "CodeChef",
  "Codeforces",
  "LeetCode",
  "AtCoder",
  "CodeChef",
];

export function PlatformMarquee() {
  return (
    <section id="platforms" className="overflow-hidden border-y border-line bg-panel/40">
      <div className="mx-auto max-w-shell px-6 py-5">
        <motion.div
          className="flex min-w-max gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {ITEMS.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="group flex items-center gap-3 font-mono text-sm uppercase tracking-[0.24em] text-text-secondary transition-colors hover:text-text-primary"
            >
              <span className="inline-block h-2 w-2 rounded-full border border-line bg-panel-raised transition-colors group-hover:border-signal group-hover:bg-signal" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}