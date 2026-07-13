"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Platforms", href: "#platforms" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-panel/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="7" cy="21" r="3" stroke="var(--accepted)" strokeWidth="1.4" />
            <circle cx="21" cy="21" r="3" stroke="var(--pending)" strokeWidth="1.4" />
            <circle cx="14" cy="6" r="3" stroke="var(--signal)" strokeWidth="1.4" />
            <path d="M9.5 19L12 8.5M18.5 19L16 8.5" stroke="var(--line)" strokeWidth="1.2" />
          </svg>
          <span className="font-display text-base text-text-primary">CodePilot</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-press group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-sm border border-line bg-panel-raised px-4 py-2 font-mono text-xs uppercase tracking-widest text-text-primary transition-colors hover:border-signal"
        >
          Connect your handle
        </motion.button>
      </div>
    </header>
  );
}