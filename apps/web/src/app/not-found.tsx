import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid-shell flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <div className="frame auth-panel w-full max-w-3xl">
        <div className="frame-inner grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="kicker">404 / route lost</p>
            <h1 className="section-title max-w-[8ch]">
              This page does not exist in the system.
            </h1>
            <p className="muted-copy max-w-md">
              The route you tried to access is unavailable, invalid, or has not
              been mapped into the current interface layer.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 border border-white/10 bg-white/[0.02] p-5">
            <div>
              <p className="kicker mb-3">Recovery options</p>
              <div className="space-y-3 text-sm text-white/70">
                <p>Return to the landing page.</p>
                <p>Open the sign-in gateway.</p>
                <p>Resume from a valid protected route.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/" className="ghost-link">
                Home
              </Link>
              <Link
                href="/sign-in"
                className="border border-white/20 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}