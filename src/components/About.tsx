"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  { icon: "verified", title: "Frescura Garantizada", desc: "Seleccionadas a mano cada mañana." },
  { icon: "palette", title: "Diseño Exclusivo", desc: "Arreglos únicos creados por artistas." },
  { icon: "schedule", title: "Entrega Puntual", desc: "Comprometidos con tus momentos clave." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".about-images", {
        opacity: 0, x: -60, scale: 0.95, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-images", start: "top 82%" },
      });
      gsap.from(".about-badge", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".about-badge", start: "top 85%" },
      });
      gsap.from(".about-heading", {
        opacity: 0, y: 36, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
      });
      gsap.from(".about-text", {
        opacity: 0, y: 24, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 88%" },
      });
      gsap.from(".about-feature", {
        opacity: 0, y: 28, stagger: 0.13, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: ".about-feature", start: "top 88%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-32 bg-rose-50/30 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-100/50 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Images */}
          <div className="about-images">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-10">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <img
                    src="/hero-img/grid2.jpg"
                    alt="Florista preparando arreglo"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <img
                    src="/hero-img/grid4.jpg"
                    alt="Detalle de flores"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="glass rounded-3xl aspect-square flex flex-col items-center justify-center text-center p-6 shadow-[0_8px_30px_rgba(238,43,91,0.08)]">
                  <span className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">15+</span>
                  <span className="text-gray-400 text-sm font-medium leading-snug">Años de<br />experiencia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-6 space-y-6">
            <div className="about-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-bold uppercase tracking-widest">
              <span className="material-icons-outlined text-sm">favorite</span>
              Nuestra Historia
            </div>

            <h2 className="about-heading text-4xl md:text-5xl font-extrabold text-gray-900 font-display tracking-tight leading-tight">
              Más que flores,{" "}
              <span className="text-gradient">creamos emociones</span>
            </h2>

            <p className="about-text text-lg text-gray-500 font-light leading-relaxed max-w-lg">
              En FlorArte, cada pétalo cuenta una historia. Seleccionamos las flores más frescas para transformarlas en obras de arte efímeras que transmiten lo que las palabras no pueden expresar.
            </p>

            <div className="space-y-3 pt-2">
              {features.map((f) => (
                <div key={f.icon} className="about-feature liquid-glass rounded-2xl p-4 flex items-center gap-4 hover:bg-rose-50/50 transition-all duration-300 cursor-default group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <span className="material-icons-outlined text-primary">{f.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{f.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
