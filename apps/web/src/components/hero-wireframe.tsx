"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SkillGraphCanvas } from "./common/skill-graph-canvas";
import { MagneticButton } from "./magnetic-button";
import { ScopedMonoCursor } from "./scoped-mono-cursor";

const EYEBROW = "// diagnostic intelligence for competitive coders";
const HEADLINE = [
  "Stop",
  "guessing",
  "why",
  "your",
  "rating",
  "stalls.",
];

const subhead =
  "CodePilot isolates the weak patterns actually costing you performance, then turns them into a precise training system you can execute.";

const metrics = [
  { label: "profiles decoded", value: "50M+" },
  { label: "practice signals", value: "topic-weighted" },
  { label: "supported now", value: "Codeforces · LeetCode · CodeChef" },
];

export function HeroWireframe() {
  return (
    <ScopedMonoCursor>
      <section className="relative mx-auto max-w-shell px-6 pb-10 pt-10 md:pb-16 md:pt-14">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="pointer-events-none absolute left-6 top-20 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(138,155,168,0.18),transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute right-10 top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_72%)] blur-3xl" />

        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] md:gap-8 lg:gap-12">
          <div className="relative z-10 max-w-[640px]">
            <motion.p
              className="kicker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {EYEBROW}
            </motion.p>

            <div className="mt-5 space-y-3 md:mt-6">
              <h1 className="hero-title max-w-[8.5ch]">
                {HEADLINE.map((word, i) => (
                  <motion.span
                    key={word + i}
                    className={
                      word === "guessing" || word === "rating"
                        ? "mr-3 inline-block text-[var(--accent-strong)]"
                        : "mr-3 inline-block"
                    }
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.28 + i * 0.06,
                      duration: 0.58,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                className="h-px w-24 bg-gradient-to-r from-[var(--accent)]/80 to-transparent"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <motion.p
              className="muted-copy mt-6 max-w-[34rem] text-[1.02rem] md:mt-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {subhead}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3 md:mt-9"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <Link
                  href="/sign-in"
                  className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--accent)] bg-[var(--accent-strong)] px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-black transition-transform duration-300"
                >
                  Import your profile
                </Link>
              </MagneticButton>

              <Link href="/dashboard" className="ghost-link">
                See sample report
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 grid gap-3 border-t border-white/8 pt-6 md:mt-10 md:grid-cols-3 md:gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.92, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/7 bg-white/[0.02] px-4 py-4"
                >
                  <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-[var(--text-faint)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-soft)] md:text-[0.95rem]">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="frame scanlines overflow-hidden p-3 md:p-4">
              <div className="frame-inner relative overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(183,195,203,0.12),transparent_42%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 md:px-5">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      Live weakness map
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-soft)]">
                      Topic pressure, stagnation zones, recovery vectors
                    </p>
                  </div>
                  <div className="mono-pill min-h-0 px-3 py-2 text-[0.62rem]">
                    signal online
                  </div>
                </div>

                <div className="relative h-[420px] w-full md:h-[500px]">
                  <div className="circuit-bg" />
                  <SkillGraphCanvas progress={100} mode="idle" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ScopedMonoCursor>
  );
}