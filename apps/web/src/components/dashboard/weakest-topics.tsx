const WEAK = [
  { label: "Number Theory", value: 22 },
  { label: "Geometry", value: 19 },
  { label: "DP", value: 41 },
];

export function WeakestTopics() {
  return (
    <div className="h-full rounded-md border border-wrong/30 bg-panel p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-wrong">Weakest topics</p>

      <ul className="mt-4 space-y-3">
        {WEAK.map((topic) => (
          <li key={topic.label} className="flex items-center justify-between">
            <span className="font-body text-sm text-text-primary">{topic.label}</span>
            <span className="font-mono text-xs text-wrong">{topic.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}