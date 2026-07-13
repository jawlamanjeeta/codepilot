const STRONG = [
  { label: "Graphs", value: 94 },
  { label: "Trees", value: 91 },
  { label: "Greedy", value: 83 },
];

export function StrongestTopics() {
  return (
    <div className="h-full rounded-md border border-accepted/30 bg-panel p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-accepted">Strongest topics</p>

      <ul className="mt-4 space-y-3">
        {STRONG.map((topic) => (
          <li key={topic.label} className="flex items-center justify-between">
            <span className="font-body text-sm text-text-primary">{topic.label}</span>
            <span className="font-mono text-xs text-accepted">{topic.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}