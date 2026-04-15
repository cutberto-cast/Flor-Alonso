"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const zones = [
  { icon: "storefront", title: "Retiro en Tienda", tag: "Gratis", tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200", desc: "Av. de las Flores 123, Colonia Centro.\nLunes a Sábado de 9:00 AM a 7:00 PM.", price: null },
  { icon: "local_shipping", title: "Envío Estándar Urbano", tag: null, tagColor: "", desc: "Entrega el mismo día para pedidos antes de las 2:00 PM. Válido dentro del perímetro metropolitano.", price: "$150.00 MXN" },
  { icon: "flight_takeoff", title: "Envíos Periferia y Municipios", tag: null, tagColor: "", desc: "Entrega al día siguiente garantizada o mismo día con cargo extra por distancia.", price: "Tarifa según CP" },
];

export default function Delivery() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".delivery-card", {
        opacity: 0, y: 50, scale: 0.97, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".delivery-card", start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 bg-rose-50/30 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-100/60 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="delivery-card bg-white rounded-[2.5rem] overflow-hidden border border-rose-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Visual */}
            <div className="relative p-12 lg:p-16 bg-gradient-to-br from-rose-50 to-pink-50/50 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-rose-100">
              <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_8px_24px_rgba(238,43,91,0.12)]">
                <span className="material-icons-outlined text-5xl text-primary">two_wheeler</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 font-display mb-4">
                Entregas que<br /><span className="text-gradient">iluminan el día</span>
              </h3>
              <p className="text-gray-500 font-light max-w-sm mx-auto leading-relaxed mb-8">
                Cuidamos cada detalle durante el trayecto para que las flores lleguen intactas y perfectas.
              </p>

              {/* Google Maps — Veracruz */}
              <div className="w-full max-w-xs mx-auto rounded-3xl overflow-hidden shadow-md border border-rose-100" style={{ height: "200px" }}>
                <iframe
                  src="https://maps.google.com/maps?q=Veracruz,+Ver.,+Mexico&output=embed&z=12"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Veracruz"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-8 w-max">
                <span className="material-icons-outlined text-sm">schedule</span>
                Información de Envíos
              </div>

              <div className="space-y-8">
                {zones.map((zone, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(238,43,91,0.25)]">
                      <span className="material-icons-outlined text-lg">{zone.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h4 className="font-bold text-gray-800">{zone.title}</h4>
                        {zone.tag && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${zone.tagColor}`}>
                            {zone.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm font-light leading-relaxed whitespace-pre-line">{zone.desc}</p>
                      {zone.price && <p className="text-primary font-bold text-sm mt-2">{zone.price}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
