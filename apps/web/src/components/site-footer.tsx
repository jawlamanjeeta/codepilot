import Link from "next/link";
import { Github, Twitter, BookOpenText } from "lucide-react";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Platforms", href: "#platforms" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto grid max-w-shell gap-10 px-6 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="7" cy="21" r="3" stroke="var(--accepted)" strokeWidth="1.4" />
              <circle cx="21" cy="21" r="3" stroke="var(--pending)" strokeWidth="1.4" />
              <circle cx="14" cy="6" r="3" stroke="var(--signal)" strokeWidth="1.4" />
              <path d="M9.5 19L12 8.5M18.5 19L16 8.5" stroke="var(--line)" strokeWidth="1.2" />
            </svg>
            <span className="font-display text-base text-text-primary">CodePilot</span>
          </div>

          <p className="mt-4 max-w-sm font-body text-sm text-text-secondary">
            AI-powered analytics for competitive programmers who want to know exactly what to practice next.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">Navigation</p>
          <div className="mt-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} className="font-body text-sm text-text-secondary transition-colors hover:text-text-primary">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">Elsewhere</p>
          <div className="mt-4 flex items-center gap-4 text-text-secondary">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4 transition-colors hover:text-text-primary" />
            </Link>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <Twitter className="h-4 w-4 transition-colors hover:text-text-primary" />
            </Link>
            <Link href="#docs" aria-label="Docs">
              <BookOpenText className="h-4 w-4 transition-colors hover:text-text-primary" />
            </Link>
          </div>

          <p className="mt-6 font-mono text-xs text-text-secondary">
            © 2026 CodePilot
          </p>
        </div>
      </div>
    </footer>
  );
}