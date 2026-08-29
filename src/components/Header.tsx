"use client";
import { useState } from "react";
import { SITE_CONFIG } from "@/config";

const navLinks = [
  { label: "Betrabet", href: "#" },
  { label: "Betrabet Giris", href: "#giris" },
  { label: "Betrabet Bonus", href: "#bonus" },
  { label: "Guvenilir mi?", href: "#guvenilir" },
  { label: "Betrabet Casino", href: "#casino" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-header-bg/95 backdrop-blur border-b border-card-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-yellow-300 flex items-center justify-center font-black text-black text-lg">
            B
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">BETRA</span>
            <span className="text-white">BET</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE_CONFIG.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
          >
            Uye Girisi
          </a>
          <a
            href={SITE_CONFIG.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-primary text-black text-sm font-bold hover:bg-primary-hover transition glow-primary"
          >
            Uye Ol
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
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-gray-300 hover:text-primary transition"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 mt-3">
            <a href={SITE_CONFIG.loginUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold">
              Uye Girisi
            </a>
            <a href={SITE_CONFIG.registerUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 rounded-lg bg-primary text-black text-sm font-bold">
              Uye Ol
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
