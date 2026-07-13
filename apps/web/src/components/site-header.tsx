import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="reveal-up flex items-center gap-3 text-sm uppercase tracking-[0.26em] text-white/92"
        >
          <span className="grid h-9 w-9 place-items-center border border-white/30 text-[10px]">
            CP
          </span>
          <span>CodePilot</span>
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/58 md:flex">
          <a href="#system" className="reveal-up delay-1 transition hover:text-white/90">
            System
          </a>
          <a href="#signals" className="reveal-up delay-2 transition hover:text-white/90">
            Signals
          </a>
          <a href="#engine" className="reveal-up delay-3 transition hover:text-white/90">
            Engine
          </a>
        </nav>

        <Link
          href="/sign-in"
          className="reveal-up delay-2 border border-white/20 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
        >
          Enter
        </Link>
      </div>
    </header>
  );
}