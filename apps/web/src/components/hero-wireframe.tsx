export function HeroWireframe() {
  return (
    <div className="frame scanlines relative overflow-hidden">
      <div className="orbit">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="frame-inner relative grid min-h-[520px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
          <div className="space-y-6">
            <p className="kicker">Competitive programming intelligence</p>
            <h1 className="hero-title max-w-[10ch]">
              Practice where weakness becomes signal.
            </h1>
            <p className="muted-copy max-w-xl text-base md:text-lg">
              Import Codeforces, LeetCode, and AtCoder data. Detect weak topics,
              forecast rating movement, and generate a focused training system.
            </p>
          </div>

          <div className="grid gap-4 pt-10 md:grid-cols-2">
            <div className="frame-inner bg-white/[0.02] p-4">
              <p className="kicker mb-3">Weakest zones</p>
              <ul className="space-y-2 text-sm text-white/7878">
                >Dynamic Programming</l/li>
                >Binary Search Boundaries</l/li>
                >Number Theory</li>
              </ul>
            </div>
            <div className="frame-inner bg-white/[0.02] p-4">
              <p className="kicker mb-3">Projected climb</p>
              <p className="text-4xl font-semibold tracking-[-0.06em]">+173</p>
              <p className="mt-2 text-sm text-white/60">
                Estimated rating movement in the next focused cycle.
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden p-6">
          <div className="float-wire absolute inset-8">
            <div className="absolute inset-x-0 top-0 flex justify-between text-[10px] uppercase tracking-[0.22em] text-white/35">
              <span>Signal mesh</span>
              <span>Realtime intelligence layer</span>
            </div>

            <div className="absolute inset-0 mt-10 border border-white/10">
              <div className="circuit-bg absolute inset-0" />

              <svg
                viewBox="0 0 800 700"
                className="absolute inset-0 h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4" stroke="rgba(255,255,255,0.2)">
                  <path d="M120 520H320V360H510" />
                  <path d="M150 180H340V305H520" />
                  <path d="M220 610V470H360V250H560" />
                  <path d="M620 180V300H500V520H290" />
                  <path d="M650 560H520V430H430V350" />
                </g>

                <g opacity="0.95">
                  <rect x="300" y="235" width="210" height="170" rx="8" stroke="rgba(255,255,255,0.55)" />
                  <rect x="332" y="266" width="146" height="108" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
                  ircle cx="185" cy="180" r="48" stroke="rgba(255,255,255,0.24)" />
                  ircle cx="630" cy="178" r="60" stroke="rgba(255,255,255,0.24)" />
                  ircle cx="180" cy="548" r="68" stroke="rgba(255,255,255,0.2)" />
                  ircle cx="625" cy="555" r="54" stroke="rgba(255,255,255,0.2)" />
                  <rect x="88" y="150" width="74" height="64" stroke="rgba(255,255,255,0.22)" />
                  <rect x="600" y="500" width="84" height="84" stroke="rgba(255,255,255,0.22)" />
                </g>

                <g fill="white">
                  ircle cx="320" cy="360" r="4" />
                  ircle cx="510" cy="360" r="4" />
                  ircle cx="340" cy="305" r="4" />
                  ircle cx="520" cy="305" r="4" />
                  ircle cx="360" cy="470" r="4" />
                  ircle cx="560" cy="250" r="4" />
                  ircle cx="430" cy="350" r="4" />
                </g>
              </svg>

              <div className="absolute left-6 top-6 border border-white/15 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                Data ingestion
              </div>

              <div className="absolute bottom-6 right-6 max-w-[220px] border border-white/15 bg-black/60 p-3">
                <p className="kicker mb-2">Engine output</p>
                <p className="text-sm leading-6 text-white/70">
                  Weak topic detection, contest prediction, and daily problem sequencing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}