"use client";
import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG } from "@/config";

// Menu, ana sayfa ici capalar yerine niyet sayfalarina baglanir:
// her sorgu kendi sayfasina ic link alir.
const navLinks = [
  { label: "Meritking", href: "/" },
  { label: "Güncel Giriş Adresi", href: "/meritking-guncel-giris-adresi" },
  { label: "Bonus", href: "/meritking-bonus" },
  { label: "Casino", href: "/meritking-casino" },
  { label: "Spor Bahisleri", href: "/meritking-spor-bahisleri" },
  { label: "Araçlar", href: "/araclar" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-header-bg/95 backdrop-blur border-b border-card-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center font-black text-black text-lg">
            M
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Merit</span>
            <span className="text-white">king</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE_CONFIG.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
          >
            Üye Girişi
          </a>
          <a
            href={SITE_CONFIG.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-primary text-black text-sm font-bold hover:bg-primary-hover transition glow-primary"
          >
            Üye Ol
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-300 p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-header-bg border-t border-card-border px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-gray-300 hover:text-primary transition"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3">
            <a href={SITE_CONFIG.loginUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold">
              Üye Girişi
            </a>
            <a href={SITE_CONFIG.registerUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg bg-primary text-black text-sm font-bold">
              Üye Ol
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
