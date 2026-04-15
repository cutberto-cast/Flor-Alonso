"use client";

import React from "react";

export const OCCASIONS = ["Amor y Romance", "Cumpleaños", "Aniversario", "Condolencias", "Agradecimiento"];
export const FORMATS = ["Ramos", "Cajas", "Canastas", "Floreros", "Plantas"];
export const PRICE_RANGES = ["Cualquier precio", "Menos de $500", "$500 – $1,000", "Más de $1,000"];

interface Props {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedOccasions: string[];
  onOccasionToggle: (o: string) => void;
  selectedFormat: string | null;
  onFormatChange: (f: string | null) => void;
  selectedPrice: string;
  onPriceChange: (p: string) => void;
  onClearAll: () => void;
  totalResults: number;
}

export default function CatalogSidebar({
  searchQuery = "", onSearchChange,
  selectedOccasions = [], onOccasionToggle,
  selectedFormat = null, onFormatChange,
  selectedPrice = "Cualquier precio", onPriceChange,
  onClearAll, totalResults = 0,
}: Props) {
  const hasFilters = selectedOccasions.length > 0 || selectedFormat !== null || selectedPrice !== "Cualquier precio" || searchQuery !== "";

  return (
    <aside className="w-full lg:w-68 flex-shrink-0 space-y-3">

      {/* Search */}
      <div className="relative group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar arreglo..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-rose-100 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
        />
        <span className="material-icons-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors text-lg">
          search
        </span>
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors cursor-pointer material-icons-outlined text-base"
          >
            close
          </button>
        )}
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-2xl p-4 space-y-4 border border-rose-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="material-icons-outlined text-primary text-lg">tune</span>
            Filtros
          </h3>
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-primary/70 hover:text-primary transition-colors font-semibold cursor-pointer"
            >
              Limpiar todo
            </button>
          )}
        </div>

        {/* Ocasión + Precio: 2 columnas en mobile, apilados en desktop */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-1">

          {/* Ocasión */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ocasión</h4>
            <div className="space-y-1.5">
              {OCCASIONS.map((item) => {
                const checked = selectedOccasions.includes(item);
                return (
                  <label key={item} className="flex items-center gap-2.5 group cursor-pointer select-none">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onOccasionToggle(item)}
                        className="peer appearance-none w-4 h-4 border-2 border-rose-200 rounded-md checked:border-primary checked:bg-primary transition-all cursor-pointer"
                      />
                      <span className="material-icons-outlined absolute inset-0 flex items-center justify-center text-white text-[11px] pointer-events-none opacity-0 peer-checked:opacity-100">
                        check
                      </span>
                    </div>
                    <span className={`text-sm transition-colors ${checked ? "text-primary font-semibold" : "text-gray-500 group-hover:text-gray-800"}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Precio */}
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Rango de precio</h4>
            <div className="space-y-1.5">
              {PRICE_RANGES.map((item) => {
                const checked = selectedPrice === item;
                return (
                  <label key={item} className="flex items-center gap-2.5 group cursor-pointer select-none">
                    <input
                      type="radio"
                      name="price"
                      checked={checked}
                      onChange={() => onPriceChange(item)}
                      className="peer appearance-none w-4 h-4 border-2 border-rose-200 rounded-full checked:border-primary checked:border-[5px] transition-all cursor-pointer bg-white"
                    />
                    <span className={`text-sm transition-colors ${checked ? "text-primary font-semibold" : "text-gray-500 group-hover:text-gray-800"}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        <div className="border-t border-rose-50" />

        {/* Formato */}
        <div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Formato</h4>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((item) => {
              const active = selectedFormat === item;
              return (
                <button
                  key={item}
                  onClick={() => onFormatChange(active ? null : item)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer border ${active
                    ? "bg-primary text-white border-primary/30 shadow-[0_4px_12px_rgba(238,43,91,0.25)]"
                    : "bg-rose-50 text-gray-500 border-rose-100 hover:border-primary/20 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <div className="rounded-2xl p-4 text-center overflow-hidden cursor-pointer group bg-gradient-to-br from-primary to-primary-dark relative hover:shadow-[0_8px_32px_rgba(238,43,91,0.30)] transition-all duration-500">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/10" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <span className="material-icons-outlined text-white text-2xl">local_shipping</span>
          </div>
          <h4 className="font-bold text-white mb-1">Envíos Gratis</h4>
          <p className="text-sm text-white/85">En pedidos &gt; $1,500 dentro de la ciudad.</p>
        </div>
      </div>

    </aside>
  );
}
