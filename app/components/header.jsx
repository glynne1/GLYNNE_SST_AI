'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPopup } from './LoginPopup';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentLogo = scrolled ? '/logoVectorBlack.png' : '/logo.png';

  const navLinks = (
    <>
      <span
        onClick={() => { setMenuOpen(false); router.push('/appInfo'); }}
        className={`cursor-pointer text-sm font-medium transition-all 
          ${scrolled ? 'text-black/80 hover:text-black' : 'text-white hover:text-gray-200'}`
        }
      >
        Plataforma GLYNNE
      </span>

      <span
        onClick={() => { setMenuOpen(false); router.push('/politicas'); }}
        className={`cursor-pointer text-sm font-medium transition-all 
          ${scrolled ? 'text-black/80 hover:text-black' : 'text-white hover:text-gray-200'}`
        }
      >
        Políticas
      </span>

      <button
        onClick={() => { setMenuOpen(false); localStorage.removeItem('glyiaChatClosed'); setShowLoginModal(true); }}
        className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300
          ${scrolled
            ? 'bg-black/80 text-white hover:bg-black'
            : 'bg-white text-black border border-black/20 hover:bg-gray-100'
          }`
        }
      >
        Iniciar sesión
      </button>
    </>
  );

  return (
    <>
      {/* === HEADER === */}
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 px-4 md:px-6 py-2 flex items-center justify-between h-14
          ${scrolled ? 'bg-white/10 shadow-sm' : 'bg-transparent'}`}
      >
        {/* LOGO */}
        <img
          src={currentLogo}
          alt="Logo"
          className="h-10 cursor-pointer transition-all duration-500"
          onClick={() => router.push('/')}
        />

        {/* NAV LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks}
        </div>

        {/* HAMBURGUESA MOBILE */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-2xl ${scrolled ? 'text-black' : 'text-white'}`}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        )}
      </header>

      {/* === MENÚ HAMBURGUESA DESPLEGABLE MOBILE === */}
      {menuOpen && isMobile && (
  <div
    className={`fixed top-14 left-0 w-full z-10000 flex flex-col items-center gap-4 backdrop-blur-md rounded-b-2xl transition-all duration-500
      ${scrolled ? 'bg-white/10 shadow-sm' : 'bg-transparent'}`}
  >
    {navLinks}
  </div>
)}

      {/* === MODAL LOGIN === */}
      <LoginPopup
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
