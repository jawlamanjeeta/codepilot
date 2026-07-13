"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type KpiCardProps = {
  label: string;
  value: string;
  suffix?: string;
  trend?: string;
};

export function KpiCard({ label, value, suffix, trend }: KpiCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ""));

  useEffect(() => {
    if (!inView || Number.isNaN(numericValue)) return;
    const controls = animate(0, numericValue, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, numericValue]);

  const trendUp = trend?.startsWith("+");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-md border border-line bg-panel p-5"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-3xl text-text-primary">{display}</span>
        {suffix && <span className="font-mono text-sm text-text-secondary">{suffix}</span>}
      </div>
      {trend && (
        <p className={`mt-2 font-mono text-xs ${trendUp ? "text-accepted" : "text-wrong"}`}>
          {trend}
        </p>
      )}
    </motion.div>
  );
}