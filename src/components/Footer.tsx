import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid: stacked on mobile, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">

          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="material-icons-round text-primary text-base">local_florist</span>
              </div>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">
                Flor<span className="text-gradient">Arte</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-3 max-w-xs">
              Diseños únicos elaborados con pasión para hacer latir corazones.
            </p>
            <div className="flex gap-1.5">
              {["instagram", "facebook-f"].map((icon) => (
                <a key={icon} href="#"
                  className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                  <i className={`fab fa-${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links — 2-col sub-grid, always together */}
          <div className="sm:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Explora</h4>
              <ul className="space-y-2">
                {[
                  { href: "/",        label: "Inicio" },
                  { href: "#catalog", label: "Catálogo" },
                  { href: "#about",   label: "Nosotros" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs text-gray-400 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ayuda</h4>
              <ul className="space-y-2">
                {[
                  { href: "#",           label: "Términos" },
                  { href: "/privacidad", label: "Aviso de Privacidad" },
                  { href: "#",           label: "Contacto" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-gray-400 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="sm:col-span-1">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Contáctanos</h4>
            <div className="flex bg-rose-50 rounded-xl overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Tu correo..."
                className="bg-transparent border-none outline-none px-3 py-2 text-xs text-gray-700 placeholder-gray-400 w-full"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-3 transition-colors flex items-center justify-center cursor-pointer flex-shrink-0">
                <span className="material-icons-outlined text-sm">send</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-rose-50 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-gray-400 text-[11px] leading-relaxed">
            &copy; {new Date().getFullYear()} FlorArte. Diseñado con <span className="text-primary">♥</span>
            {" · "}
            Desarrollado por{" "}
            <a
              href="https://www.axcap.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              axcap.shop
            </a>
          </p>
          <div className="flex gap-1.5 items-center justify-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-8 h-5 bg-gray-100 rounded" />
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
