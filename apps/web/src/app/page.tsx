import Link from "next/link";
import { FeatureFrame } from "@/components/feature-frame";
import { HeroWireframe } from "@/components/hero-wireframe";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="grid-shell min-h-screen bg-black text-white">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
          <HeroWireframe />
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="marquee-lines">
            <span>
              weak topic detection — rating forecast — ai-guided practice — contest intelligence — consistency heatmaps — mistake clustering — platform sync — weak topic detection — rating forecast — ai-guided practice — contest intelligence —
            </span>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-8 lg:px-10">
          <FeatureFrame
            id="system"
            label="Signal system"
            title="You don’t train by guesswork anymore."
            copy="CodePilot converts fragmented competitive programming history into interpretable structure. Topics, consistency, contest form, and difficulty exposure become a visible system instead of scattered profile stats."
            mode="waves"
          />

          <FeatureFrame
            id="signals"
            label="Recommendation engine"
            title="Practice plans designed from your actual failure patterns."
            copy="Instead of random suggestions, the engine shapes a focused problem sequence using weakness intensity, recent attempts, solved difficulty bands, and predicted recovery zones."
            mode="folders"
          />

          <FeatureFrame
            id="engine"
            label="Prediction layer"
            title="See what your next rating cycle is likely to become."
            copy="The interface is built like an intelligence console. Forecasted rating direction, topic volatility, and preparation momentum are presented as a navigable system rather than a flat graph."
            mode="dots"
          />
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-10">
          <div className="frame">
            <div className="frame-inner grid gap-8 p-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="kicker mb-4">Access layer</p>
                <h2 className="section-title max-w-[10ch]">
                  Enter the intelligence dashboard.
                </h2>
                <p className="muted-copy mt-5 max-w-2xl">
                  Sign in to import profiles, unlock your protected dashboard,
                  and begin shaping your next training block with structured feedback.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/sign-in" className="ghost-link">
                  Sign in
                </Link>
                <span className="mono-pill">Protected / dashboard</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}