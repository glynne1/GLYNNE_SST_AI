'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPopup } from '../../components/LoginPopup';

export default function Header() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header
        className="
          fixed top-0 left-0 w-full z-50 
          backdrop-blur-md bg-white/40 
          border-b border-white/50
          transition-all duration-500 
          px-3 md:px-5 py-2 
          flex items-center justify-between 
          h-12
        "
      >
        {/* LOGO siempre oscuro */}
        <img
          src="/logoVectorBlack.png"
          alt="Logo"
          className="h-10 sm:h-10 cursor-pointer transition-all"
          onClick={() => router.push('/')}
        />

        <div className="flex items-center gap-4">

          {/* ENLACE "Qué es esto" oscuro */}
          <span
            onClick={() => router.push('/')}
            className="
              cursor-pointer text-xs sm:text-sm 
              font-medium 
              text-black/80 hover:text-black
              transition-all
            "
          >
            Home
          </span>

          {/* BOTÓN LOGIN oscuro */}
          <button
            onClick={() => {
              localStorage.removeItem('glyiaChatClosed');
              setShowLoginModal(true);
            }}
            className="
              px-3 py-1 text-xs sm:text-sm 
              font-semibold rounded-lg 
              bg-black/80 text-white 
              hover:bg-black 
              transition-all duration-300
            "
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
