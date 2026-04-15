"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Cta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-content", start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#1a0a14] to-gray-950" />
      <div className="blob bg-primary/25 w-[500px] h-[500px]" style={{ top: "-15%", right: "-8%", animationDelay: "0s" }} />
      <div className="blob bg-rose-800/20 w-[400px] h-[400px]" style={{ bottom: "-10%", left: "-5%", animationDelay: "-6s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="cta-content">

          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(238,43,91,0.2)]">
            <span className="material-icons-outlined text-4xl text-primary">celebration</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white font-display tracking-tight mb-6">
            ¿Listo para <span className="text-gradient">sorprender?</span>
          </h2>

          <p className="text-xl text-white/55 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Haz tu pedido hoy mismo. Habla directamente con nuestros floristas o explora el catálogo para encontrar la opción perfecta.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="group flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold h-16 px-10 rounded-full border border-primary/30 transition-all duration-300 hover:shadow-[0_0_50px_rgba(238,43,91,0.5)] hover:-translate-y-0.5 cursor-pointer">
              <i className="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform" />
              Pedir por WhatsApp
            </button>
            <Link
              href="#catalog"
              className="flex items-center justify-center bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-bold h-16 px-10 rounded-full border border-white/15 transition-all duration-300"
            >
              Ver Catálogo
            </Link>
          </div>

          <p className="mt-10 text-sm text-white/30 tracking-wide">
            Atención inmediata · Entregas el mismo día · Pago seguro
          </p>
        </div>
      </div>
    </section>
  );
}
