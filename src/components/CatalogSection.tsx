"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CatalogSidebar from "./CatalogSidebar";
import ProductCard, { Product } from "./ProductCard";
import Pagination from "./Pagination";
import OrderModal from "./OrderModal";

// ─── Image URLs ───────────────────────────────────────────────────
const IMG = {
  amorEterno:       "/ramos/rosas-rojas.webp",
  dulcePrimavera:   "/ramos/tulipanes.webp",
  rayoDeSol:        "/ramos/girasoles.webp",
  purezaReal:       "/ramos/rosas-blancas.webp",
  jardinSecreto:    "/ramos/flores-temporada.webp",
  orquideaBlanca:   "/ramos/orquidea-blanca.webp",
  bouquetNovia:     "/ramos/ramo-nupsial.webp",
  serenidad:        "/ramos/tonos-blancos.webp",
  gratitud:         "/ramos/flores-coloridas.webp",
  girasolesFrescos: "/ramos/girasoles-frescos.webp",
  cajaPeonias:      "/ramos/peoneas.webp",
  floralDeluxe:     "/ramos/florero-vidrio.webp",
  rosasAmarillas:   "/ramos/rosas-amarillas.webp",
  lavanda:          "/ramos/lavanda-francesa.webp",
  miniOrquidea:     "/ramos/Orqu\u00EDdea.webp",
  cajaRosaPastel:   "/ramos/caja-rosas.webp",
  tulipanesFLorero: "/ramos/vidrio.webp",
  rosasEternidad:   "/ramos/caja.webp",
};

// ─── Products catalogue (18 items) ───────────────────────────────
const ALL_PRODUCTS: Product[] = [
  { id: 1,  title: "Amor Eterno",           description: "24 rosas rojas premium seleccionadas a mano, envueltas en papel francés negro de lujo.",          price: "$1,200", priceValue: 1200, image: IMG.amorEterno,       tags: ["Rosas", "Amor"],          badge: "Nuevo",   occasion: ["Amor y Romance", "Aniversario"],   format: "Ramos"    },
  { id: 2,  title: "Dulce Primavera",        description: "Arreglo fresco de 15 tulipanes holandeses en tonos pastel sobre base de cristal.",               price: "$950",   priceValue:  950, image: IMG.dulcePrimavera,   tags: ["Tulipanes", "Primavera"], badge: undefined, occasion: ["Cumpleaños", "Agradecimiento"],     format: "Ramos"    },
  { id: 3,  title: "Rayo de Sol",            description: "Combinación vibrante de girasoles, rosas y follaje silvestre para iluminar cualquier día.",       price: "$850",   priceValue:  850, image: IMG.rayoDeSol,        tags: ["Mixto", "Alegría"],       badge: undefined, occasion: ["Cumpleaños", "Agradecimiento"],     format: "Ramos"    },
  { id: 4,  title: "Pureza Real",            description: "Elegante caja redonda con 30 rosas blancas de exportación. Ideal para bodas o aniversarios.",    price: "$1,800", priceValue: 1800, image: IMG.purezaReal,       tags: ["Lujo", "Elegancia"],      badge: undefined, occasion: ["Aniversario", "Amor y Romance"],    format: "Cajas"    },
  { id: 5,  title: "Jardín Secreto",         description: "Canasta tejida a mano repleta de flores de temporada y follaje verde intenso.",                  price: "$750",   priceValue:  750, oldPrice: "$900", image: IMG.jardinSecreto, tags: ["Canasta", "Rústico"], badge: "Oferta", occasion: ["Agradecimiento", "Cumpleaños"],     format: "Canastas" },
  { id: 6,  title: "Orquídea Phalaenopsis",  description: "Orquídea blanca de doble vara en maceta de cerámica premium. Duración prolongada.",              price: "$1,100", priceValue: 1100, image: IMG.orquideaBlanca,   tags: ["Orquídeas", "Exótico"],   badge: undefined, occasion: ["Agradecimiento"],                   format: "Plantas"  },
  { id: 7,  title: "Bouquet de Novia",       description: "Ramo nupcial de rosas blancas y peonías delicadas, montado en satín crema. Diseño exclusivo.",   price: "$2,200", priceValue: 2200, image: IMG.bouquetNovia,     tags: ["Boda", "Premium"],        badge: "Nuevo",   occasion: ["Aniversario", "Amor y Romance"],    format: "Ramos"    },
  { id: 8,  title: "Serenidad",              description: "Arreglo floral calmante en tonos blancos y verdes, acompañado de una nota de condolencias.",     price: "$1,200", priceValue: 1200, image: IMG.serenidad,        tags: ["Paz", "Condolencias"],    badge: undefined, occasion: ["Condolencias"],                     format: "Cajas"    },
  { id: 9,  title: "Arreglo de Gratitud",    description: "Florero con mezcla de flores coloridas de temporada, perfecto para agradecer con elegancia.",    price: "$760",   priceValue:  760, image: IMG.gratitud,         tags: ["Mixto", "Gratitud"],      badge: undefined, occasion: ["Agradecimiento", "Cumpleaños"],     format: "Floreros" },
  { id: 10, title: "Girasoles Alegres",      description: "Ramo de 10 girasoles frescos con follaje y lazo de yute artesanal. Energía pura en flores.",    price: "$620",   priceValue:  620, image: IMG.girasolesFrescos, tags: ["Girasoles", "Festivo"],   badge: undefined, occasion: ["Cumpleaños"],                       format: "Ramos"    },
  { id: 11, title: "Caja de Peonías",        description: "Caja de lujo con 20 peonías importadas en tonos rosados y coral. Olor intenso y textura única.", price: "$1,500", priceValue: 1500, image: IMG.cajaPeonias,      tags: ["Peonías", "Premium"],     badge: undefined, occasion: ["Amor y Romance", "Aniversario"],    format: "Cajas"    },
  { id: 12, title: "Floral Deluxe",          description: "Florero de vidrio soplado con arreglo de flores exóticas de temporada, musgo y follaje natural.",price: "$980",   priceValue:  980, image: IMG.floralDeluxe,     tags: ["Mixto", "Exótico"],       badge: undefined, occasion: ["Agradecimiento"],                   format: "Floreros" },
  { id: 13, title: "Rosas Amarillas",        description: "Bouquet de 12 rosas amarillas premium que expresan amistad y gratitud con color y frescura.",   price: "$880",   priceValue:  880, image: IMG.rosasAmarillas,   tags: ["Rosas", "Amistad"],       badge: undefined, occasion: ["Agradecimiento", "Cumpleaños"],     format: "Ramos"    },
  { id: 14, title: "Lavanda Provenzal",      description: "Canasta rústica con lavanda francesa, eucalipto plateado y flores silvestres. Aroma sublime.",  price: "$720",   priceValue:  720, image: IMG.lavanda,          tags: ["Lavanda", "Aromático"],   badge: undefined, occasion: ["Agradecimiento"],                   format: "Canastas" },
  { id: 15, title: "Mini Orquídea",          description: "Orquídea Dendrobium en pequeña maceta de barro esmaltado. Perfecta para escritorios y regalos.",price: "$650",   priceValue:  650, image: IMG.miniOrquidea,     tags: ["Orquídeas", "Mini"],      badge: undefined, occasion: ["Agradecimiento", "Cumpleaños"],     format: "Plantas"  },
  { id: 16, title: "Caja Rosa Pastel",       description: "Caja kraft con 15 rosas en degradé rosado-blanco. Diseño minimalista y contemporáneo.",         price: "$1,350", priceValue: 1350, image: IMG.cajaRosaPastel,   tags: ["Rosas", "Pastel"],        badge: "Nuevo",   occasion: ["Amor y Romance", "Cumpleaños"],     format: "Cajas"    },
  { id: 17, title: "Tulipanes en Florero",   description: "Florero cilíndrico de vidrio con 20 tulipanes holandeses en colores variados de temporada.",    price: "$820",   priceValue:  820, image: IMG.tulipanesFLorero, tags: ["Tulipanes", "Colorido"],   badge: undefined, occasion: ["Aniversario", "Cumpleaños"],        format: "Floreros" },
  { id: 18, title: "Rosas Eternidad",        description: "Caja premium con 50 rosas preservadas que duran más de un año. El regalo que nunca se marchita.",price: "$3,200", priceValue: 3200, image: IMG.rosasEternidad,   tags: ["Rosas", "Eternas"],       badge: "Nuevo",   occasion: ["Amor y Romance", "Aniversario"],    format: "Cajas"    },
];

const ITEMS_PER_PAGE = 6;

type SortKey = "popular" | "price-asc" | "price-desc" | "new";

export default function CatalogSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState("Cualquier precio");
  const [sortBy, setSortBy] = useState<SortKey>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  // ── Scroll to top of catalog when page changes ──
  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Filter ──────────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      const matchOccasion = selectedOccasions.length === 0 || p.occasion.some((o) => selectedOccasions.includes(o));
      const matchFormat = !selectedFormat || p.format === selectedFormat;
      const matchPrice =
        selectedPrice === "Cualquier precio" ||
        (selectedPrice === "Menos de $500" && p.priceValue < 500) ||
        (selectedPrice === "$500 – $1,000" && p.priceValue >= 500 && p.priceValue <= 1000) ||
        (selectedPrice === "Más de $1,000" && p.priceValue > 1000);
      return matchSearch && matchOccasion && matchFormat && matchPrice;
    });
  }, [searchQuery, selectedOccasions, selectedFormat, selectedPrice]);

  // ── Sort ─────────────────────────────────────────
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-asc") arr.sort((a, b) => a.priceValue - b.priceValue);
    if (sortBy === "price-desc") arr.sort((a, b) => b.priceValue - a.priceValue);
    if (sortBy === "new") arr.sort((a, b) => b.id - a.id);
    return arr;
  }, [filtered, sortBy]);

  // ── Pagination ────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset to page 1 on filter change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedOccasions, selectedFormat, selectedPrice, sortBy]);

  // ── Handlers ──────────────────────────────────────
  const handleOccasionToggle = (o: string) =>
    setSelectedOccasions((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);

  const handleClearAll = () => {
    setSearchQuery(""); setSelectedOccasions([]); setSelectedFormat(null); setSelectedPrice("Cualquier precio");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(scrollToCatalog, 50);
  };

  // ── GSAP ──────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".catalog-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".catalog-header", start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="catalog" ref={ref} className="py-20 bg-rose-50/30 relative">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-rose-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="catalog-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-display tracking-tight mb-3">
                Colección <span className="text-gradient">Exclusiva</span>
              </h2>
              <p className="text-gray-500 text-lg font-light max-w-xl leading-relaxed">
                Diseños florales seleccionados para celebrar los momentos más importantes de tu vida.
              </p>
            </div>

            {/* Sort */}
            <div className="relative min-w-[220px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full bg-white rounded-2xl border border-rose-100 text-gray-600 text-sm font-medium px-4 py-3.5 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 cursor-pointer transition-all shadow-sm"
              >
                <option value="popular">Más Populares</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="new">Nuevos Lanzamientos</option>
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 material-icons-outlined text-lg">
                expand_more
              </span>
            </div>
          </header>

          <div ref={catalogRef} className="flex flex-col lg:flex-row gap-8 scroll-mt-24">
            <CatalogSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedOccasions={selectedOccasions}
              onOccasionToggle={handleOccasionToggle}
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
              selectedPrice={selectedPrice}
              onPriceChange={setSelectedPrice}
              onClearAll={handleClearAll}
              totalResults={sorted.length}
            />

            <div className="flex-1">
              {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOrder={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <span className="material-icons-outlined text-5xl text-rose-200 mb-4">search_off</span>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Sin resultados</h3>
                  <p className="text-gray-400 text-sm mb-6">No encontramos productos con esos filtros.</p>
                  <button
                    onClick={handleClearAll}
                    className="bg-primary text-white font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors cursor-pointer text-sm"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

        </div>
      </section>

      <OrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}