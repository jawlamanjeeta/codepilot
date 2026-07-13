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
    <section id={id} className="frame reveal-up delay-1">
      <div className="frame-inner grid min-h-[420px] grid-cols-1 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="flex flex-col justify-between border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="space-y-5">
            <p className="kicker">{label}</p>
            <h2 className="section-title max-w-[9ch]">{title}</h2>
          </div>

          <p className="tech-copy max-w-md pt-8">{copy}</p>
        </div>

        <div className="relative min-h-[320px] overflow-hidden p-6 lg:p-8">
          <div className="absolute inset-6 border border-white/8 bg-white/[0.015]" />

          {mode === "waves" && (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <svg viewBox="0 0 900 420" className="h-full w-full" fill="none">
                {Array.from({ length: 13 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${70 + i * 18} C 170 ${20 + i * 15}, 260 ${170 + i * 8}, 460 ${90 + i * 10} S 690 ${30 + i * 14}, 900 ${95 + i * 8}`}
                    stroke="rgba(255,255,255,0.13)"
                  />
                ))}
                <circle cx="145" cy="210" r="12" fill="white" />
                <circle cx="235" cy="272" r="10" fill="white" />
                <circle cx="84" cy="318" r="10" fill="white" />
              </svg>
            </div>
          )}

          {mode === "folders" && (
            <div className="absolute inset-0 p-8">
              <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  "Weak topic detection",
                  "Personalized roadmap",
                  "Cross-platform import",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="relative flex items-start justify-center border border-white/10 bg-white/[0.03] p-4 transition duration-500 hover:-translate-y-1 hover:border-white/25"
                    style={{
                      transform:
                        index === 1
                          ? "perspective(900px) rotateX(18deg) rotateY(-12deg)"
                          : "perspective(900px) rotateX(18deg) rotateY(-18deg)",
                    }}
                  >
                    <div className="absolute left-5 top-0 h-5 w-16 -translate-y-full border border-b-0 border-white/10 bg-white/[0.04]" />
                    <p className="max-w-[11ch] pt-10 text-[1.8rem] leading-tight tracking-[-0.05em] text-white/92">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === "dots" && (
            <div className="absolute inset-0">
              <div className="diagram-dots absolute inset-6 border border-white/10" />
              <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full" fill="none">
                <circle cx="360" cy="220" r="88" stroke="rgba(255,255,255,0.24)" strokeDasharray="4 12" />
                <circle cx="360" cy="220" r="138" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 14" />
                <circle cx="360" cy="220" r="188" stroke="rgba(255,255,255,0.14)" strokeDasharray="3 14" />
                <rect x="620" y="74" width="180" height="250" stroke="rgba(255,255,255,0.16)" />
              </svg>
            </div>
          )}

          <div className="absolute bottom-6 left-6 max-w-sm border border-white/15 bg-black/70 p-4 backdrop-blur-md">
            <p className="kicker mb-2">CodePilot layer</p>
            <p className="text-sm leading-6 text-white/72">
              Transform raw profile activity into structured insight, targeted
              practice, and visual trend intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}