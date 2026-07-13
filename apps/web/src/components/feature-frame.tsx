type FeatureFrameProps = {
  id: string;
  title: string;
  label: string;
  copy: string;
  mode?: "waves" | "folders" | "dots";
};

export function FeatureFrame({
  id,
  title,
  label,
  copy,
  mode = "waves",
}: FeatureFrameProps) {
  return (
    <section id={id} className="frame">
      <div className="frame-inner grid min-h-[360px] grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col justify-between border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
          <div>
            <p className="kicker mb-4">{label}</p>
            <h2 className="section-title max-w-[8ch]">{title}</h2>
          </div>

          <p className="tech-copy max-w-sm">{copy}</p>
        </div>

        <div className="relative overflow-hidden p-6">
          {mode === "waves" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 800 420" className="h-full w-full" fill="none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${60 + i * 18} C 120 ${20 + i * 18}, 240 ${150 + i * 10}, 400 ${90 + i * 12} S 620 ${40 + i * 15}, 800 ${90 + i * 8}`}
                    stroke="rgba(255,255,255,0.12)"
                  />
                ))}
                <circle cx="120" cy="168" r="10" fill="white" />
                <circle cx="220" cy="260" r="10" fill="white" />
                <circle cx="80" cy="290" r="10" fill="white" />
              </svg>
            </div>
          )}

          {mode === "folders" && (
            <div className="absolute inset-0 p-6">
              <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  "Weak topic detection",
                  "Personalized roadmap",
                  "Cross-platform import",
                ].map((item) => (
                  <div
                    key={item}
                    className="relative flex items-start justify-center border border-white/10 bg-white/[0.02] p-4"
                    style={{ transform: "perspective(800px) rotateX(18deg) rotateY(-18deg)" }}
                  >
                    <div className="absolute left-5 top-0 h-5 w-16 -translate-y-full border border-b-0 border-white/10 bg-white/[0.04]" />
                    <p className="max-w-[12ch] pt-10 text-2xl leading-tight tracking-[-0.05em] text-white/90">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === "dots" && (
            <div className="absolute inset-0">
              <div className="diagram-dots absolute inset-6 rounded-none border border-white/10" />
              <svg viewBox="0 0 800 420" className="absolute inset-0 h-full w-full" fill="none">
                <circle
                  cx="350"
                  cy="210"
                  r="96"
                  stroke="rgba(255,255,255,0.24)"
                  strokeDasharray="3 9"
                />
                <circle
                  cx="350"
                  cy="210"
                  r="142"
                  stroke="rgba(255,255,255,0.18)"
                  strokeDasharray="3 11"
                />
                <circle
                  cx="350"
                  cy="210"
                  r="188"
                  stroke="rgba(255,255,255,0.14)"
                  strokeDasharray="2 12"
                />
                <rect
                  x="530"
                  y="72"
                  width="180"
                  height="250"
                  stroke="rgba(255,255,255,0.14)"
                />
              </svg>
            </div>
          )}

          <div className="absolute bottom-6 left-6 max-w-xs border border-white/15 bg-black/70 p-3">
            <p className="kicker mb-2">CodePilot layer</p>
            <p className="text-sm leading-6 text-white/70">
              Transform raw profile activity into structured insight, targeted practice,
              and visual trend intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}