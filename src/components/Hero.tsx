"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ─── Image paths ─────────────────────────────────────────────────── */
const ALL_IMAGES = Array.from({ length: 13 }, (_, i) => `/hero-img/grid${i + 1}.jpg`);

/* 5 rotating slots — all 13 images distributed across them */
const SLOTS: string[][] = [
  [ALL_IMAGES[0], ALL_IMAGES[5], ALL_IMAGES[10]],  // a: grid1, grid6, grid11
  [ALL_IMAGES[1], ALL_IMAGES[6], ALL_IMAGES[11]],  // b: grid2, grid7, grid12
  [ALL_IMAGES[2], ALL_IMAGES[7], ALL_IMAGES[12]],  // c: grid3, grid8, grid13
  [ALL_IMAGES[3], ALL_IMAGES[8]],                  // d: grid4, grid9
  [ALL_IMAGES[4], ALL_IMAGES[9]],                  // e: grid5, grid10
];

const ROTATE_INTERVAL = 4000; // ms between rotations

/* ─── Rotating Cell ───────────────────────────────────────────────── */
function RotatingCell({
  images,
  interval,
  className,
  style,
}: {
  images: string[];
  interval: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      {/* All images stacked — only the active one is visible via CSS opacity */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${i === activeIdx ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
    </div>
  );
}

/* ─── Hero Component ──────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-title span",
        { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.5)
        .fromTo(".hero-desc",
          { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .fromTo(".hero-btn",
          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 1.1)
        .fromTo(".hero-social",
          { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.4)
        .fromTo(".grid-cell",
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: "power4.out" }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex items-center">

      {/* ── Background: Bento Grid ───────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/*
          5-cell bento layout (4 cols × 2 rows) — all rotating:
            Row 1: [a]  [b  b]  [c]
            Row 2: [d  d]  [e]  [c]   ← c spans 2 rows (right column)
        */}
        <div
          className="w-full h-full grid gap-1.5 p-1.5"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `
              "a b b c"
              "d d e c"
            `,
          }}
        >
          {[
            { area: "a", slot: 0, offset: 0 },
            { area: "b", slot: 1, offset: 700 },
            { area: "c", slot: 2, offset: 1400 },
            { area: "d", slot: 3, offset: 2100 },
            { area: "e", slot: 4, offset: 2800 },
          ].map(({ area, slot, offset }) => (
            <RotatingCell
              key={area}
              images={SLOTS[slot]}
              interval={ROTATE_INTERVAL + offset}
              className="grid-cell rounded-2xl"
              style={{ gridArea: area }}
            />
          ))}
        </div>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* ── Foreground Content (centered white text) ─────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center flex flex-col items-center">

        <h1 className="hero-title font-extrabold leading-[1.05] tracking-tight font-display mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-[5.25rem] text-white opacity-0 drop-shadow-lg">
            Diseños florales
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-[5.25rem] text-white opacity-0 drop-shadow-lg">
            con <span className="text-rose-300">alma</span> y <span className="text-rose-300">pasión</span>
          </span>
        </h1>

        {/* <p className="hero-desc text-lg text-white/80 mb-10 max-w-xl font-light leading-relaxed opacity-0 drop-shadow-sm">
          Elevamos cada momento especial con arreglos confeccionados meticulosamente por floristas expertos en nuestra boutique premium.
        </p> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#catalog"
            className="hero-btn mt-10 opacity-0 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(238,43,91,0.45)] hover:-translate-y-0.5"
          >
            Catálogo
            <span className="material-icons-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="hero-social mt-12 flex items-center justify-center gap-5 opacity-0">
          <div className="flex -space-x-3">
            {[1, 5, 9].map((n) => (
              <img key={n} src={`https://i.pravatar.cc/100?img=${n}`} alt="Cliente"
                className="w-9 h-9 rounded-full border-2 border-white/40 shadow-md" />
            ))}
          </div>
          <p className="text-sm text-white/70 font-medium">
            <span className="text-white font-bold">+2,000</span> clientes felices
          </p>
        </div>
      </div>
    </section>
  );
}
