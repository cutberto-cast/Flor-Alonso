"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  { text: "El ramo fue espectacular, las flores súper frescas y el diseño mejor que en la foto. Mi novia quedó encantada. Definitivamente volveré.", author: "Carlos M.", role: "Cliente verificado", rating: 5, date: "Hace 2 días", avatar: 12 },
  { text: "Excelente servicio al cliente. Tuve que cambiar la dirección de entrega a último momento y fueron súper amables y eficientes.", author: "Ana P.", role: "Cliente recurrente", rating: 5, date: "Hace 1 semana", avatar: 23 },
  { text: "Hermosos arreglos y entrega muy puntual. Me encantó la tarjeta personalizada que incluyeron sin costo extra.", author: "Laura V.", role: "Cliente verificada", rating: 5, date: "Hace 1 mes", avatar: 45 },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonials-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 bg-[#221015] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[500px] h-[200px] bg-primary/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <span className="material-icons-outlined text-sm">stars</span>
            Testimonios
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight mb-5">
            Historias de <span className="text-gradient">alegría</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Nada nos hace más felices que ser cómplices de tus momentos inolvidables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card group bg-white/[0.06] backdrop-blur-sm rounded-3xl p-7 flex flex-col border border-white/10 hover:border-primary/30 hover:bg-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(238,43,91,0.12)] hover:-translate-y-1 transition-all duration-500 h-full"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="material-icons-outlined text-amber-400 text-lg">star</span>
                ))}
              </div>

              <p className="text-slate-200 font-medium leading-relaxed italic flex-grow mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/80?img=${t.avatar}`} alt={t.author}
                    className="w-9 h-9 rounded-full border-2 border-primary/30" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.author}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
