"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SubScore = {
  label: string;
  value: number;
  color: string;
};

const SUB_SCORES: SubScore[] = [
  { label: "Coding", value: 89, color: "var(--accepted)" },
  { label: "Algorithms", value: 81, color: "var(--signal)" },
  { label: "Consistency", value: 94, color: "var(--pending)" },
];

const COMPOSITE = 84;

function Arc({
  radius,
  value,
  color,
  strokeWidth,
  inView,
  delay,
}: {
  radius: number;
  value: number;
  color: string;
  strokeWidth: number;
  inView: boolean;
  delay: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <circle
      cx="120"
      cy="120"
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={inView ? circumference - dash : circumference}
      transform="rotate(-90 120 120)"
      style={{
        transition: `stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    />
  );
}

export function InterviewReadiness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [composite, setComposite] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, COMPOSITE, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setComposite(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  return (
    <section className="mx-auto max-w-shell px-6 py-32">
      <div ref={ref} className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-signal">// composite score</p>
          <h2 className="mt-3 max-w-md font-display text-3xl text-text-primary md:text-4xl">
            Your interview readiness, quantified.
          </h2>
          <p className="mt-5 max-w-md font-body text-sm text-text-secondary">
            One score built from coding accuracy, algorithmic range, and how
            consistently you practice — the same signal companies look for.
          </p>

          <div className="mt-8 space-y-4">
            {SUB_SCORES.map((sub) => (
              <div key={sub.label} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: sub.color }}
                />
                <span className="w-28 font-body text-sm text-text-secondary">{sub.label}</span>
                <span className="font-mono text-sm text-text-primary">{sub.value}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-[240px] w-[240px]"
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle cx="120" cy="120" r="108" fill="none" stroke="var(--line)" strokeWidth="10" />
            <Arc radius={108} value={SUB_SCORES[0].value} color={SUB_SCORES[0].color} strokeWidth={10} inView={inView} delay={0.1} />
            <Arc radius={90} value={SUB_SCORES[1].value} color={SUB_SCORES[1].color} strokeWidth={10} inView={inView} delay={0.25} />
            <Arc radius={72} value={SUB_SCORES[2].value} color={SUB_SCORES[2].color} strokeWidth={10} inView={inView} delay={0.4} />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-4xl text-text-primary">{composite}</span>
            <span className="font-mono text-xs text-text-secondary">/100</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}