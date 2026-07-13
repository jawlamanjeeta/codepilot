"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useState } from "react";

export function ScopedMonoCursor({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 500, damping: 38 });
  const springY = useSpring(y, { stiffness: 500, damping: 38 });

  return (
    <div
      className="relative cursor-none"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        x.set(-100);
        y.set(-100);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left + 4);
        y.set(e.clientY - rect.top + 2);
      }}
    >
      {children}

      {active && (
        <motion.div
          aria-hidden="true"
          style={{ x: springX, y: springY }}
          className="pointer-events-none absolute left-0 top-0 z-20 font-mono text-sm text-signal"
        >
          ▍
        </motion.div>
      )}
    </div>
  );
}