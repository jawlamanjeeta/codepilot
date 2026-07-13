"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SkillScoreCard } from "@/components/dashboard/skill-score-card";
import { WeakestTopics } from "@/components/dashboard/weakest-topics";
import { StrongestTopics } from "@/components/dashboard/strongest-topics";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";

export function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="mx-auto max-w-shell px-6 py-32">
      <div ref={ref} className="mx-auto max-w-5xl [perspective:1600px]">
        <motion.div
          initial={{ rotateX: 5, rotateY: -4, opacity: 0, y: 32 }}
          animate={
            inView
              ? { rotateX: 0, rotateY: 0, opacity: 1, y: 0 }
              : { rotateX: 5, rotateY: -4, opacity: 0, y: 32 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-md border border-line bg-panel shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-2 border-b border-line bg-panel-raised px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-wrong" />
            <span className="h-2.5 w-2.5 rounded-full bg-pending" />
            <span className="h-2.5 w-2.5 rounded-full bg-accepted" />
            <span className="ml-4 font-mono text-xs text-text-secondary">
              app.codepilot.dev/dashboard
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
            <KpiCard label="Overall Skill" value="78" suffix="/100" />
            <KpiCard label="Est. rating (60d)" value="1830" trend="+207" />
            <KpiCard label="Candidate Master" value="74" suffix="%" />

            <div className="md:col-span-2">
              <SkillScoreCard />
            </div>
            <div>
              <WeakestTopics />
            </div>

            <div className="md:col-span-1">
              <StrongestTopics />
            </div>
            <div className="md:col-span-2">
              <ActivityHeatmap />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}