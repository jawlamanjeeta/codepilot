import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-white/90">
          <span className="grid h-8 w-8 place-items-center border border-white/30 text-[10px]">
            CP
          </span>
          <span>CodePilot</span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-white/60 md:flex">
          <a href="#system">System</a>
          <a href="#signals">Signals</a>
          <a href="#engine">Engine</a>
        </nav>

        <Link
          href="/sign-in"
          className="border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/90 transition hover:border-white/40 hover:bg-white/5"
        >
          Enter
        </Link>
      </div>
    </header>
  );
}