"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkillGraphCanvas } from "./skill-graph-canvas";

export function LoadSequence({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "morph" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);

    if (prefersReduced) {
      setPhase("done");
      return;
    }

    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / 1400) * 100);
      setProgress(pct);

      if (elapsed < 1400) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("morph");
        setTimeout(() => setPhase("done"), 400);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (reduced) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[320px] w-[420px]">
              <SkillGraphCanvas progress={progress} mode="loading" />
            </div>
            <p className="mt-6 font-mono text-sm text-text-secondary">
              checking submissions // {Math.round(progress)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      )}
    </>
  );
}