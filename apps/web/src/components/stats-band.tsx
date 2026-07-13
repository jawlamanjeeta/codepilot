"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

const STATS: Stat[] = [
  { label: "Problems analyzed", value: 4200000, suffix: "+" },
  { label: "Submissions synced", value: 18600000, suffix: "+" },
  { label: "Avg. 60-day rating gain", value: 173, prefix: "+" },
  { label: "Weak topics detected", value: 96000, suffix: "+" },
];

function formatCompact(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return `${n}`;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="flex flex-col gap-2 px-6 py-8">
      <span className="font-mono text-3xl text-text-primary md:text-4xl">
        {stat.prefix}
        {formatCompact(display)}
        {stat.suffix}
      </span>
      <span className="font-body text-sm text-text-secondary">{stat.label}</span>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 divide-y divide-line rounded-md border border-line md:grid-cols-4 md:divide-x md:divide-y-0"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </motion.div>
    </section>
  );
}