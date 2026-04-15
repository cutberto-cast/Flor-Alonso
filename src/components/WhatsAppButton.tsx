"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WhatsAppButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.fromTo(btnRef.current,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)", delay: 1.8 }
    );
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 glass text-gray-700 text-xs font-semibold py-2 px-3 rounded-xl whitespace-nowrap pointer-events-none shadow-md">
        ¡Hablemos!
      </span>

      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full bg-[#25D366]/25 scale-100 group-hover:scale-125 transition-transform duration-500 blur-md" />
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.35)] group-hover:shadow-[0_8px_36px_rgba(37,211,102,0.5)] group-hover:-translate-y-1 transition-all duration-300">
          <i className="fab fa-whatsapp text-white text-2xl" />
        </div>
      </div>
    </a>
  );
}
