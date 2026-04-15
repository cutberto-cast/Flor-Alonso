import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Aviso de Privacidad | FlorArte',
  description: 'Aviso de privacidad del sitio de demostración FlorArte.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      <div className="max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-rose-100 w-full relative">
        <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-rose-50" aria-label="Regresar al inicio">
          <span className="material-icons-outlined">arrow_back</span>
        </Link>
        
        <div className="mt-8 text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-round text-primary text-3xl">policy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-display">Aviso de <span className="text-gradient">Privacidad</span></h1>
        </div>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed font-light">
          <p>
            <strong className="font-semibold text-gray-900">1. Naturaleza del Sitio Web</strong><br />
            Este sitio web, "FlorArte", es única y exclusivamente un <strong>proyecto de demostración y práctica (portafolio)</strong> desarrollado por <a href="https://www.axcap.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.axcap.shop</a>. No representa a una empresa real ni realiza ventas, transacciones o envíos verdaderos. Todos los productos, precios y servicios mostrados son completamente ficticios.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">2. Uso de Imágenes y Recursos</strong><br />
            Las imágenes, fotografías de arreglos florales, íconos y otros recursos visuales utilizados en esta página <strong>no nos pertenecen</strong>. Son propiedad de sus respectivos autores y han sido recabadas de fuentes públicas de internet o inteligencias artificiales para fines estrictamente ilustrativos y demostrativos. Si eres propietario de alguna y deseas que sea retirada, comunícate con nosotros.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">3. Datos Personales</strong><br />
            Dado que esta no es una tienda funcional ni un servicio activo, cualquier dato introducido en simuladores de compra o campos de contacto <strong>no es almacenado en bases de datos de producción, procesado, ni utilizado para fines comerciales reales</strong>.
          </p>

          <p>
            <strong className="font-semibold text-gray-900">4. Finalidad</strong><br />
            La única finalidad de este sitio es demostrar capacidades técnicas de desarrollo frontend moderno y diseño de UI/UX. Para cotizar proyectos reales de desarrollo o diseño web, por favor dirígete a la página oficial de la agencia de desarrollo web Axcap.
          </p>
        </div>

        <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-[0_8px_24px_rgba(238,43,91,0.25)] hover:-translate-y-0.5 flex items-center gap-2">
            Entendido, volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
