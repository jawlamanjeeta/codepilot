"use client";

import { motion } from "framer-motion";
import { SkillGraphCanvas } from "./common/skill-graph-canvas";
import { MagneticButton } from "./magnetic-button";
import { ScopedMonoCursor } from "./scoped-mono-cursor";

const HEADLINE = "Know exactly why you're stuck at your rating.".split(" ");

export function HeroWireframe() {
  return (
    <ScopedMonoCursor>
      <section className="mx-auto grid max-w-shell gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-sm text-signal">// analyzing 50M+ submissions</p>

          <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-text-primary md:text-6xl">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                className="mr-3 inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md font-body text-base text-text-secondary"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            CodePilot ranks the topics that are actually costing you rating, and
            builds the practice plan to fix them.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <button className="rounded-sm bg-signal px-5 py-3 font-mono text-xs uppercase tracking-widest text-bg-void">
                Import your profile
              </button>
            </MagneticButton>

            <button className="rounded-sm border border-line px-5 py-3 font-mono text-xs uppercase tracking-widest text-text-secondary hover:border-signal hover:text-text-primary">
              See a sample report
            </button>
          </motion.div>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-secondary">
            Codeforces · LeetCode · AtCoder · CodeChef
          </p>
        </div>

        <div className="h-[420px] w-full">
          <SkillGraphCanvas progress={100} mode="idle" />
        </div>
      </section>
    </ScopedMonoCursor>
  );
}