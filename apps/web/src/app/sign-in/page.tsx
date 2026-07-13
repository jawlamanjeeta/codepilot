import Link from "next/link";
import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <main className="grid-shell relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white lg:px-10">
      <div className="absolute inset-0 opacity-40">
        <div className="orbit">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="frame hidden lg:block">
          <div className="frame-inner relative flex h-full flex-col justify-between overflow-hidden p-8">
            <div>
              <p className="kicker mb-5">Secure access node</p>
              <h1 className="hero-title max-w-[8ch] text-[clamp(3rem,6vw,6rem)]">
                Enter the practice engine.
              </h1>
              <p className="muted-copy mt-6 max-w-xl">
                Authenticate to unlock protected analytics, topic diagnostics,
                forecasted progression, and your adaptive training workflow.
              </p>
            </div>

            <div className="relative mt-10 min-h-[320px] border border-white/10">
              <div className="circuit-bg absolute inset-0" />
              <svg viewBox="0 0 700 360" className="absolute inset-0 h-full w-full" fill="none">
                {Array.from({ length: 11 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="260"
                    cy="180"
                    rx={60 + i * 24}
                    ry={18 + i * 11}
                    stroke="rgba(255,255,255,0.12)"
                  />
                ))}
                <path d="M470 70H620V292H470" stroke="rgba(255,255,255,0.16)" />
                ircle cx="130" cy="180" r="8" fill="white" />
                ircle cx="230" cy="180" r="8" fill="white" />
                ircle cx="330" cy="180" r="8" fill="white" />
                ircle cx="430" cy="180" r="8" fill="white" />
              </svg>

              <div className="absolute bottom-5 left-5 border border-white/10 bg-black/70 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
                Auth / protected route handshake
              </div>
            </div>
          </div>
        </section>

        <section className="frame auth-panel my-auto">
          <div className="frame-inner p-6 sm:p-8">
            <div className="mb-10 flex items-center justify-between">
              <Link href="/" className="text-xs uppercase tracking-[0.24em] text-white/55">
                ← Back
              </Link>
              <span className="mono-pill">GitHub OAuth</span>
            </div>

            <div className="space-y-5">
              <p className="kicker">Identity gateway</p>
              <h2 className="section-title max-w-[8ch] text-[clamp(2.1rem,5vw,4rem)]">
                Sign in to CodePilot.
              </h2>
              <p className="muted-copy max-w-md">
                Continue with GitHub to access your protected dashboard and begin importing your competitive programming identity.
              </p>
            </div>

            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/dashboard" });
              }}
              className="mt-10"
            >
              <button
                type="submit"
                className="w-full border border-white/25 bg-white px-5 py-4 text-left text-sm font-medium uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200"
              >
                Continue with GitHub
              </button>
            </form>

            <div className="mt-8 grid gap-3">
              <div className="input-shell px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Access scope
                </p>
                <p className="mt-2 text-sm text-white/72">
                  Profile identity, session creation, protected dashboard access
                </p>
              </div>
              <div className="input-shell px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Security note
                </p>
                <p className="mt-2 text-sm text-white/72">
                  Sessions are stored through Prisma and validated before protected routes render.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}