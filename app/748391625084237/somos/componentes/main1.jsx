'use client';

import { useEffect, useState } from 'react';

export default function ResponsiveImageBackground() {
  const [showContent, setShowContent] = useState(false);
  const [bgImage, setBgImage] = useState('/main1.jpg'); // Imagen por defecto

  // Animación del contenido
  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  // Cambiar imagen según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setBgImage('https://i.pinimg.com/736x/ba/6b/d2/ba6bd2849d269a6d06526354fca98e5b.jpg'); // Imagen móvil
      } else {
        setBgImage('/main-6.jpg'); // Imagen escritorio
      }
    };

    handleResize(); // Revisar al montar
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden mt-[60px]">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Texto Banner */}
        <h1
          className={`text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold tracking-wide transition-all duration-1000 ease-out
            ${showContent ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-sm'}`}
        >
          QUIENES SOMOS?
        </h1>

        {/* Logo pequeño */}
        <img
          src="/logo.png"
          alt="Logo"
          className={`mt-4 w-16 sm:w-20 md:w-24 lg:w-28 transition-all duration-1000 ease-out
            ${showContent ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-sm'}`}
        />
      </div>
    </div>
  );
}
