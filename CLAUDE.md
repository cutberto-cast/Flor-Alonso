# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no test commands configured in this project.

## Stack

- **Next.js 16** with App Router (React 19)
- **TypeScript 5** — strict mode, `@/*` maps to `./src/*`
- **Tailwind CSS v4** via PostCSS — uses `@theme` in `globals.css` (not `tailwind.config.js`)
- **GSAP 3** for animations

## Architecture

Single-page marketing/e-commerce site for a florist boutique ("FlorArte"). The home page (`src/app/page.tsx`) composes section components in order: Navbar → Hero → About → Process → CatalogSection → Testimonials → Delivery → Cta → Footer + WhatsAppButton (floating).

**Component boundaries:**
- Server components by default (Hero, About, Process, Testimonials, Delivery, Cta, Footer)
- `"use client"` only where needed for interactivity: `CatalogSection`, `OrderModal`, `Navbar` (mobile menu)

**Product data** is hardcoded in `CatalogSection.tsx` using the `Product` interface. `ProductCard` renders individual items; `OrderModal` shows a detail view on click; `CatalogSidebar` + `Pagination` handle filtering/navigation.

## Styling Conventions

Custom theme tokens live in `src/app/globals.css` under `@theme`. Key values:
- Primary: `#ee2b5b` (rose/pink)
- Dark background: `#221015`
- Font: Plus Jakarta Sans (loaded via `next/font/google`)

Custom utilities defined in globals.css: `pattern-bg`, `text-gradient`, `blob` (decorative blurs). All components support dark mode via `dark:` variants.

## Next.js Version Note

This project uses Next.js 16, which has breaking changes from earlier versions. Before modifying routing, layouts, metadata, or image handling, read `node_modules/next/dist/docs/` for the current API. Do not assume Next.js 13/14/15 conventions apply.
