'use client';

import { useEffect, useState } from 'react';
import { LoginPopup } from './LoginPopup';

export default function Main1() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [bgImage, setBgImage] = useState('/main-2.jpg'); // Imagen por defecto (pantallas grandes)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setBgImage('https://i.pinimg.com/1200x/13/02/bf/1302bf9f5ff2a41e5f1bd7d4de5373f4.jpg'); // Imagen alternativa para móviles
      } else {
        setBgImage('/main-2.jpg');
      }
    };

    handleResize(); // Ejecutar una vez al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLogo(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden font-inter">
      {/* Imagen de fondo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={bgImage}
          alt="Fondo GLYNNE"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
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
            alt="Logo GLYNNE Framework"
            className={`w-20 sm:w-24 mx-auto transition-all duration-1000 ${
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          />

          {/* Texto principal */}
          <h2 className="text-lg sm:text-xl font-semibold mt-2">
  Bienvenido a GLYNNE 
</h2>

<p className="text-sm sm:text-base text-white/80 leading-relaxed">
  La plataforma ideal para descubrir cómo integrar la Inteligencia Artificial en tus proyectos, tu empresa y tu vida.
</p>

<p className="text-sm sm:text-base text-white/80 leading-relaxed">
  Aprende, crea y experimenta con herramientas que hacen que la IA sea accesible, potente y parte de tu desarrollo.
</p>

<p className="text-sm sm:text-base text-white/90 leading-relaxed mt-2">
  <strong>Audita, Indaga, Construye y Crea.</strong>
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
            <span className="relative z-10">Explorar GLYNNE Framework</span>
          </button>
        </div>
      </div>

      {/* Popup */}
      <LoginPopup visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </main>
  );
}
