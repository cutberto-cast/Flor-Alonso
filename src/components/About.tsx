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

      // ── Social icons: animate once on scroll ──────────────────────
      ScrollTrigger.create({
        trigger: ".social-login-icons",
        start: "top 88%",
        once: true,
        onEnter: () => {
          const containers = ref.current?.querySelectorAll(".socialcontainer");
          containers?.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("is-active");
              setTimeout(() => el.classList.remove("is-active"), 1600);
            }, i * 380);
          });
        },
      });

      // ── Experience card: flip once on scroll ──────────────────────
      ScrollTrigger.create({
        trigger: ".exp-card-inner",
        start: "top 88%",
        once: true,
        onEnter: () => {
          const el = ref.current?.querySelector<HTMLElement>(".exp-card-inner");
          if (!el) return;
          gsap.to(el, {
            rotateY: 180, duration: 0.7, ease: "power3.out",
            onComplete: () => {
              gsap.to(el, {
                rotateY: 0, duration: 0.7, ease: "power3.in", delay: 2,
                onComplete: () => gsap.set(el, { clearProps: "transform" }),
              });
            },
          });
        },
      });

      // ── Feature cards: flip each once on scroll ───────────────────
      ScrollTrigger.create({
        trigger: ".feature-cards-grid",
        start: "top 88%",
        once: true,
        onEnter: () => {
          const els = ref.current?.querySelectorAll<HTMLElement>(".feature-card-inner");
          els?.forEach((el, i) => {
            setTimeout(() => {
              gsap.to(el, {
                rotateY: 180, duration: 0.7, ease: "power3.out",
                onComplete: () => {
                  gsap.to(el, {
                    rotateY: 0, duration: 0.7, ease: "power3.in", delay: 1.8,
                    onComplete: () => gsap.set(el, { clearProps: "transform" }),
                  });
                },
              });
            }, i * 420);
          });
        },
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
                
                {/* Social Icons Section */}
                <div className="about-text pt-2">
                  <p className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wider text-center">Síguenos:</p>
                  <div className="social-login-icons justify-center transform scale-90 origin-top">
                    {/* Facebook */}
                    <a href="#" className="socialcontainer">
                      <div className="icon social-icon-1-1">
                        <svg viewBox="0 0 320 512" fill="white" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                        </svg>
                      </div>
                      <div className="social-icon-1">
                        <svg viewBox="0 0 320 512" fill="white" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                        </svg>
                      </div>
                    </a>
                    {/* Instagram */}
                    <a href="#" className="socialcontainer">
                      <div className="icon social-icon-2-2">
                        <svg fill="white" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                        </svg>
                      </div>
                      <div className="social-icon-2">
                        <svg fill="white" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                        </svg>
                      </div>
                    </a>
                    {/* TikTok */}
                    <a href="#" className="socialcontainer">
                      <div className="icon social-icon-3-3">
                        <svg viewBox="0 0 448 512" fill="white" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                        </svg>
                      </div>
                      <div className="social-icon-3">
                        <svg viewBox="0 0 448 512" fill="white" height="1.6em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                        </svg>
                      </div>
                    </a>
                  </div>
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
                <div className="group w-full aspect-square perspective-[1000px] bg-transparent font-display cursor-default">
                  <div className="exp-card-inner relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    
                    {/* Front */}
                    <div className="absolute w-full h-full glass rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-[0_8px_30px_rgba(238,43,91,0.08)] [backface-visibility:hidden]">
                      <span className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">15+</span>
                      <span className="text-gray-400 text-sm font-medium leading-snug">Años de<br />experiencia</span>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full flex flex-col justify-center items-center p-6 liquid-glass rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] border border-primary/30 text-center shadow-[0_8px_30px_rgba(238,43,91,0.08)]">
                      <span className="material-icons-outlined text-primary text-3xl mb-2">auto_awesome</span>
                      <p className="text-gray-700 text-sm font-medium leading-snug">
                        Más de una década perfeccionando el arte floral para tus momentos inolvidables.
                      </p>
                    </div>

                  </div>
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

            {/* Features (Flip Cards) */}
            <div className="feature-cards-grid grid grid-cols-3 gap-2 md:gap-6 mt-8">
              {features.map((f) => (
                <div key={f.icon} className="about-feature group w-full aspect-[3/4] perspective-[1000px] bg-transparent font-display cursor-default">
                  <div className="feature-card-inner relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* Front */}
                    <div className="absolute w-full h-full flex flex-col justify-center items-center p-2 md:p-4 bg-white/80 border border-primary/20 rounded-2xl md:rounded-[1.5rem] shadow-[0_8px_14px_0_rgba(0,0,0,0.05)] [backface-visibility:hidden]">
                      <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-4 text-primary">
                        <span className="material-icons-outlined text-base md:text-3xl">{f.icon}</span>
                      </div>
                      <h4 className="font-extrabold text-gray-800 text-[9px] md:text-lg leading-tight">{f.title}</h4>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full flex flex-col justify-center items-center p-2 md:p-5 liquid-glass rounded-2xl md:rounded-[1.5rem] [backface-visibility:hidden] [transform:rotateY(180deg)] border border-primary/30 text-center">
                      <h4 className="font-extrabold text-primary text-[9px] md:text-base mb-1 md:mb-2">{f.title}</h4>
                      <p className="text-gray-700 text-[8px] md:text-sm font-medium leading-snug">{f.desc}</p>
                    </div>

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
