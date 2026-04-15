"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { icon: "shopping_bag",   title: "Explora la Colección",  desc: "Navega por nuestro catálogo de diseños exclusivos para encontrar el arreglo perfecto." },
  { icon: "smartphone",     title: "Pide por WhatsApp",     desc: "Envíanos tu selección directamente por mensaje para atención personalizada e inmediata." },
  { icon: "credit_card",    title: "Pago Seguro",            desc: "Realiza tu pago mediante transferencia o enlace seguro proporcionado por nuestro asesor." },
  { icon: "local_shipping", title: "Magia en Camino",        desc: "Preparamos tu pedido con flores frescas y lo entregamos puntualmente en tu dirección." },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".process-header", start: "top 82%" },
      });
      gsap.from(".process-card", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".process-card", start: "top 85%" },
      });
      gsap.from(".process-cta", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".process-cta", start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="py-32 bg-white relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[250px] bg-rose-50/80 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="process-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <span className="material-icons-outlined text-sm">route</span>
            Cómo Funciona
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-display tracking-tight mb-5">
            Tu pedido en{" "}
            <span className="text-gradient">4 simples pasos</span>
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            Hemos diseñado nuestro proceso para que enviar flores sea tan hermoso como recibirlas. Rápido, seguro y completamente personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="process-card group relative">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[3.5rem] left-[calc(100%-1.5rem)] w-12 border-t-2 border-dashed border-rose-200 z-20 group-hover:border-primary/40 transition-colors duration-500" />
              )}

              <div className="bg-white rounded-3xl p-7 h-full flex flex-col text-center border border-rose-100 hover:border-primary/20 hover:shadow-[0_12px_40px_rgba(238,43,91,0.08)] hover:-translate-y-1 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/12 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-500">
                    <span className="material-icons-outlined text-3xl text-primary">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-black shadow-[0_4px_12px_rgba(238,43,91,0.35)]">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed flex-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="process-cta mt-20 text-center">
          <Link
            href="#catalog"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-[0_8px_32px_rgba(238,43,91,0.35)] hover:-translate-y-0.5 group"
          >
            Iniciar mi pedido
            <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">east</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
