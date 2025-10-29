'use client';

import { useEffect, useState } from 'react';

export default function VideoBackground2() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000); // 1 segundo
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden mt-[60px]">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/coding.mov" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Contenido encima del video */}
      <div className="relative z-20 flex items-center justify-center h-full mt-[0px]">
        <img
          src="/logo.png"
          alt="Logo"
          className={`w-40 sm:w-22 md:w-64 lg:w-72 xl:w-30 transition-opacity transition-transform duration-700 ease-out
            ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        />
      </div>
    </div>
  );
}
