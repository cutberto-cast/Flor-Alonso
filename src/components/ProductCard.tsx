import React from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  priceValue: number;
  oldPrice?: string;
  image: string;
  tags: string[];
  badge?: string;
  occasion: string[];
  format: string;
}

export default function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder?: () => void;
}) {
  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-rose-100 hover:border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(238,43,91,0.10)] hover:-translate-y-1 transition-all duration-500">

      {/* ── Imagen: toda el área es clickeable ─────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ver más sobre ${product.title}`}
        onClick={onOrder}
        onKeyDown={(e) => e.key === "Enter" && onOrder?.()}
        className="relative overflow-hidden aspect-square flex-shrink-0 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Degradado permanente (solo inferior) para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Hover overlay muy sutil */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* ── Badge "Nuevo"/"Oferta": esquina superior izquierda ──────── */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[8px] font-bold font-display px-2 py-0.5 rounded-full uppercase tracking-widest backdrop-blur-md border shadow-sm ${
                product.badge === "Nuevo"
                  ? "bg-gray-900/60 border-white/30 text-white"
                  : "bg-primary/70 border-white/30 text-white"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* ── Etiqueta de formato: esquina superior derecha ────────────── */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[8px] font-bold font-display px-2 py-0.5 rounded-full uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-sm">
            {product.format}
          </span>
        </div>

        {/* ── Nombre + precio en la parte inferior de la imagen ──────── */}
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3 pt-8 flex flex-row items-end justify-between gap-2">
          <h3 className="font-display text-sm font-semibold text-white tracking-tight leading-tight line-clamp-1 flex-1 min-w-0 drop-shadow-sm">
            {product.title}
          </h3>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-sm text-white drop-shadow-sm whitespace-nowrap">
              {product.price}
            </p>
            {product.oldPrice && (
              <p className="font-display text-[10px] text-white/60 line-through leading-none">
                {product.oldPrice}
              </p>
            )}
          </div>
        </div>

        {/* ── Botón "Ver más" centrado al hacer hover ─────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="font-display bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            Ver más
          </span>
        </div>
      </div>

      {/* ── Descripción ─────────────────────────────────────────────── */}
      <div className="px-3.5 py-2.5">
        <p className="font-display text-[12px] text-gray-500 font-normal leading-relaxed line-clamp-1">
          {product.description}
        </p>
      </div>
    </div>
  );
}
