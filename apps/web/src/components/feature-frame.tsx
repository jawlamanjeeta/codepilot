"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Card = {
  id: string;
  title: string;
  copy: string;
  size: "hero" | "normal";
  readout: React.ReactNode;
};

const VERDICTS = ["AC", "WA", "TLE", "AC", "WA"];

function VerdictFlicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setI((v) => (v + 1) % VERDICTS.length), 900);
    return () => clearInterval(interval);
  }, []);

  const color =
    VERDICTS[i] === "AC" ? "text-accepted" : VERDICTS[i] === "WA" ? "text-wrong" : "text-pending";

  return <span className={`font-mono text-xs ${color}`}>{VERDICTS[i]}</span>;
}

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 font-mono text-xs text-text-secondary">{label}</span>
      <div className="h-1.5 flex-1 rounded-sm bg-panel-raised">
        <div
          className="h-full rounded-sm"
          style={{ width: `${value}%`, background: `var(${color})` }}
        />
      </div>
      <span className="w-10 text-right font-mono text-xs text-text-secondary">{value}%</span>
    </div>
  );
}

const CARDS: Card[] = [
  {
    id: "weak-topics",
    title: "Weak Topic Detection",
    copy: "See which topics are actually costing you rating — ranked, not guessed.",
    size: "hero",
    readout: (
      <div className="mt-6 space-y-3">
        <MiniBar label="DP" value={41} color="--wrong" />
        <MiniBar label="Number Theory" value={22} color="--wrong" />
        <MiniBar label="Graphs" value={94} color="--accepted" />
      </div>
    ),
  },
  {
    id: "import",
    title: "Multi-Platform Import",
    copy: "Connect Codeforces, LeetCode, AtCoder, and CodeChef in one pass.",
    size: "normal",
    readout: <span className="font-mono text-xs text-text-secondary">4 platforms synced</span>,
  },
  {
    id: "coach",
    title: "AI Coach & Roadmap",
    copy: "A weekly plan built from your accuracy drop-off, not a random topic list.",
    size: "normal",
    readout: <span className="font-mono text-xs text-signal">week 3 · tree dp</span>,
  },
  {
    id: "mistakes",
    title: "Mistake Clustering",
    copy: "Find the pattern behind your wrong answers — overflow, off-by-one, TLE.",
    size: "normal",
    readout: <VerdictFlicker />,
  },
  {
    id: "contest",
    title: "Contest Simulator & Rating Predictor",
    copy: "Estimate rating gain and rank before you sit down for a round.",
    size: "normal",
    readout: <span className="font-mono text-xs text-accepted">+46 projected</span>,
  },
  {
    id: "review",
    title: "AI Code Review",
    copy: "Upload a solution and get flagged complexity, naming, and STL fixes.",
    size: "normal",
    readout: <span className="font-mono text-xs text-pending">3 flags found</span>,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } },
};

export function FeatureFrame() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="features" className="mx-auto max-w-shell px-6 py-32">
      <p className="font-mono text-sm text-signal">// what you get</p>
      <h2 className="mt-3 max-w-xl font-display text-3xl text-text-primary md:text-4xl">
        Six systems, one profile.
      </h2>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4"
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.id}
            variants={item}
            className={`group relative overflow-hidden rounded-md border border-line bg-panel p-6 transition-colors hover:border-signal ${
              card.size === "hero" ? "md:col-span-2 md:row-span-2" : "md:col-span-2"
            }`}
          >
            <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
              {card.id !== "mistakes" && <span className="font-mono text-xs text-signal">●</span>}
            </div>

            <h3 className="font-display text-lg text-text-primary">{card.title}</h3>
            <p className="mt-3 max-w-sm font-body text-sm text-text-secondary">{card.copy}</p>

            <div className="mt-2">{card.readout}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}