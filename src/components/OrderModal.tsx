"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Product } from "./ProductCard";

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [product]);

  if (!product) return null;

  const inputClass =
    "block w-full bg-rose-50/60 border border-rose-100 rounded-2xl px-4 pb-2.5 pt-5 text-base md:text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 peer transition-all placeholder-transparent";

  const labelClass =
    "absolute text-xs text-gray-400 duration-300 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 pointer-events-none";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl z-[70] max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] border border-rose-100"
      >
        {/* ── Left: image ── */}
        <div className="w-full md:w-[44%] relative flex-shrink-0 min-h-[220px] md:min-h-0">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <div className="absolute top-5 left-5 w-9 h-9 border-t-2 border-l-2 border-white/30 rounded-tl-xl" />
          <div className="absolute bottom-5 right-5 w-9 h-9 border-b-2 border-r-2 border-white/30 rounded-br-xl" />

          {/* Close button — mobile only, pinned to image top-right */}
          <button onClick={onClose}
            className="md:hidden absolute top-3 right-3 z-50 w-8 h-8 bg-black/35 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-black/55 transition-colors cursor-pointer">
            <span className="material-icons-outlined text-[18px]">close</span>
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-7 text-white z-10">
            {product.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-3">
                <span className="material-icons-outlined text-[12px]">star</span>
                {product.badge}
              </div>
            )}
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">{product.title}</h2>
            <div className="flex items-end justify-between gap-4">
              <p className="text-white/60 text-xs font-light leading-relaxed flex-1 line-clamp-2">
                {product.description}
              </p>
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-black text-white">{product.price}</span>
                {product.oldPrice && <span className="block text-xs text-white/40 line-through">{product.oldPrice}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="w-full md:w-[56%] p-6 md:p-8 md:overflow-y-auto flex flex-col relative bg-white md:flex-1">

          {/* Close desktop */}
          <button onClick={onClose}
            className="hidden md:flex absolute top-6 right-6 w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 items-center justify-center text-gray-400 hover:text-primary hover:bg-rose-100 transition-all z-10 cursor-pointer group">
            <span className="material-icons-outlined text-lg group-hover:rotate-90 transition-transform duration-300">close</span>
          </button>

          <div className="mb-4 md:mb-6 md:pr-12">
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Completa tu pedido</h3>
            <p className="text-gray-400 text-sm mt-1">Confirmación vía WhatsApp en minutos.</p>
          </div>

          <form className="space-y-3.5 flex-grow flex flex-col">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="relative">
                <input type="text" id="fn_name" placeholder=" " className={inputClass} />
                <label htmlFor="fn_name" className={labelClass}>Tu Nombre</label>
              </div>
              <div className="relative">
                <input type="tel" id="fn_phone" placeholder=" " className={inputClass} />
                <label htmlFor="fn_phone" className={labelClass}>Teléfono</label>
              </div>
            </div>

            <div className="relative">
              <input type="text" id="fn_address" placeholder=" " className={inputClass} />
              <label htmlFor="fn_address" className={labelClass}>Dirección completa de entrega</label>
            </div>

            <div className="grid grid-cols-[1fr_2fr] gap-3.5">
              <div className="relative">
                <input type="date" id="fn_date" className={`${inputClass} text-gray-500`} placeholder=" " />
                <label htmlFor="fn_date" className={`${labelClass} scale-75 -translate-y-3.5`}>Fecha</label>
              </div>
              <div className="relative">
                <input type="text" id="fn_notes" placeholder=" " className={inputClass} />
                <label htmlFor="fn_notes" className={labelClass}>Notas adicionales (Opcional)</label>
              </div>
            </div>

            <div className="relative flex-grow min-h-[90px]">
              <textarea id="fn_msg" rows={3} placeholder=" "
                className={`${inputClass} h-full resize-none`} />
              <label htmlFor="fn_msg" className={`${labelClass} scale-75 -translate-y-3`}>
                Mensaje para la tarjeta (Nosotros la escribimos)
              </label>
            </div>

            <div className="pt-2 mt-auto">
              <button type="button"
                className="group w-full h-14 bg-gray-900 hover:bg-primary text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_8px_32px_rgba(238,43,91,0.35)] flex items-center justify-center gap-3 cursor-pointer overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-white/10 transition-all duration-300" />
                <i className="fab fa-whatsapp text-2xl relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 tracking-wide">Confirmar en WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
