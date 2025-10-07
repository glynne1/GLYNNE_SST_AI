'use client';

import { useEffect, useState } from 'react';
import { LoginPopup } from './LoginPopup';

export default function Main1() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden font-inter">
      {/* Video de fondo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          src="https://res.cloudinary.com/dpdyco5po/video/upload/f_auto,q_auto/Hailuo_Video__Animación_hiperrealista_en_fo_427709358801817606_eyl9wc.mp4"
          poster="https://res.cloudinary.com/dpdyco5po/video/upload/Hailuo_Video__Animación_hiperrealista_en_fo_427709358801817606_eyl9wc.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Contenido principal */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl text-white text-center space-y-4">
          
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo GLY-IA"
            className={`w-20 sm:w-24 mx-auto transition-all duration-1000 ${
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          />

          {/* Texto principal */}
          <h2 className="text-lg sm:text-xl font-semibold mt-2">
            Tu Asesor IA Personal te espera
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Conecta con un experto que analizará tu negocio y te mostrará cómo aplicar Inteligencia Artificial de manera efectiva en tus operaciones.
          </p>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Recibe ideas claras y personalizadas para que la IA se adapte a tu flujo de trabajo y potencie tus resultados desde el primer día.
          </p>

          {/* Botón principal */}
          <button
            onClick={() => {
              localStorage.removeItem('glyiaChatClosed');
              setShowLoginModal(true);
            }}
            className="relative mt-4 px-8 py-3 text-sm sm:text-base font-semibold bg-white text-black rounded-xl shadow-xl group overflow-hidden transition-all"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Hablar con mi Asesor IA</span>
          </button>
        </div>
      </div>

      {/* Popup */}
      <LoginPopup visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </main>
  );
}
