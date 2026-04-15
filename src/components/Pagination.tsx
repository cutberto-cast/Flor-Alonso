import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("…");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="mt-14 flex justify-center">
      <nav className="flex items-center gap-2" aria-label="Paginación">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-rose-100 text-gray-400 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-sm"
        >
          <span className="material-icons-outlined text-lg">chevron_left</span>
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`dots-${i}`} className="w-11 h-11 flex items-center justify-center text-gray-300 font-bold select-none">
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-11 h-11 flex items-center justify-center rounded-full font-bold transition-all duration-300 cursor-pointer text-sm ${
                currentPage === p
                  ? "bg-primary text-white shadow-[0_4px_16px_rgba(238,43,91,0.35)] border border-primary/30"
                  : "bg-white border border-rose-100 text-gray-500 hover:text-primary hover:border-primary/30 shadow-sm"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-rose-100 text-gray-400 hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer shadow-sm"
        >
          <span className="material-icons-outlined text-lg">chevron_right</span>
        </button>
      </nav>
    </div>
  );
}
