"use client";

const TOPICS = [
  { label: "DP", value: 41 },
  { label: "Binary Search", value: 74 },
  { label: "Number Theory", value: 22 },
  { label: "Graphs", value: 94 },
  { label: "Greedy", value: 83 },
  { label: "Trees", value: 91 },
];

function barColor(value: number) {
  if (value >= 70) return "var(--accepted)";
  if (value >= 40) return "var(--pending)";
  return "var(--wrong)";
}

export function SkillScoreCard() {
  return (
    <div className="h-full rounded-md border border-line bg-panel p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        Skill breakdown
      </p>

      <div className="mt-5 space-y-4">
        {TOPICS.map((topic) => (
          <div key={topic.label} className="flex items-center gap-3">
            <span className="w-32 shrink-0 font-body text-sm text-text-secondary">
              {topic.label}
            </span>
            <div className="h-1.5 flex-1 rounded-sm bg-panel-raised">
              <div
                className="h-full rounded-sm transition-all duration-700 ease-out"
                style={{ width: `${topic.value}%`, background: barColor(topic.value) }}
              />
            </div>
            <span className="w-10 text-right font-mono text-xs text-text-secondary">
              {topic.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}