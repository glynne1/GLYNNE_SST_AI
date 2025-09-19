'use client';

import { useEffect, useState } from 'react';

export default function IntroModulo4() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden font-inter">
      {/* Imagen de fondo principal */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/rojo1.jpg')" }}
      />

      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Contenido principal centrado verticalmente */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white max-w-3xl mx-auto text-center space-y-6 px-4">
        <img
          src="/logo.png"
          alt="Logo GLY-IA"
          className={`w-28 sm:w-36 transition-all duration-1000 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        />

        <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
          Hola! soy GLY-AI 
        </h2>

        <p className="text-base sm:text-lg font-medium leading-relaxed">
          Modelos diseñados para que los usuarios comprendan por qué la IA es esencial y cómo GLYNNE integra procesos de automatización.
        </p>
      </div>
    </main>
  );
}
