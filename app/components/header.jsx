'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPopup } from './LoginPopup';

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight; 
      setScrolled(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLogo = scrolled ? '/logoVectorBlack.png' : '/logo.png';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 px-3 md:px-5 py-2 flex items-center justify-between h-12 ${
          scrolled ? 'bg-white/10' : 'bg-transparent'
        }`}
      >
        {/* LOGO */}
        <img
          src={currentLogo}
          alt="Logo"
          className="h-10 sm:h-10 cursor-pointer transition-all duration-500"
          onClick={() => router.push('/')}
        />

        <div className="flex items-center gap-4">

          {/* 🔥 NUEVO ENLACE → "Qué es esto" */}
          <span
            onClick={() => router.push('/appInfo')}
            className={`cursor-pointer text-xs sm:text-sm font-medium transition-all ${
              scrolled
                ? 'text-black/80 hover:text-black'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Qué es esto
          </span>

          {/* BOTÓN LOGIN */}
          <button
            onClick={() => {
              localStorage.removeItem('glyiaChatClosed');
              setShowLoginModal(true);
            }}
            className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
              scrolled
                ? 'bg-black/80 text-white hover:bg-black'
                : 'bg-white text-black border border-black/20 hover:bg-gray-100'
            }`}
          >
            Iniciar sesión
          </button>

        </div>
      </header>

      <LoginPopup
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
