const WEEKS = 20;
const DAYS = 7;

function cellIntensity(seed: number) {
  const v = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
  if (v > 0.85) return "var(--accepted)";
  if (v > 0.55) return "rgba(62,213,152,0.5)";
  if (v > 0.3) return "rgba(62,213,152,0.22)";
  return "var(--bg-panel-raised)";
}

export function ActivityHeatmap() {
  return (
    <div className="h-full rounded-md border border-line bg-panel p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        Practice consistency
      </p>

      <div className="mt-4 grid grid-flow-col gap-1">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="grid gap-1">
            {Array.from({ length: DAYS }).map((_, d) => (
              <div
                key={d}
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: cellIntensity(w * DAYS + d) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}