"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const links = [
  { href: "#about",   label: "Nosotros" },
  { href: "#process", label: "Cómo Funciona" },
  { href: "#catalog", label: "Catálogo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef  = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-sm border-b border-rose-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <span className="material-icons-round text-primary text-xl">local_florist</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Flor<span className="text-gradient">Arte</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden glass rounded-xl w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer"
          aria-label="Abrir menú"
        >
          <span className="material-icons-round text-xl">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <div ref={menuRef} className="md:hidden glass border-t border-rose-100 px-6 py-5 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-base font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
