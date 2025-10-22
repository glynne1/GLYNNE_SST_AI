'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseMenu = () => setIsMenuOpen(false);

  // Función para despertar servicios de backend de forma silenciosa
  const wakeUpServers = async () => {
    try {
      await Promise.all([
        fetch('https://gly-chat-v1-2.onrender.com', { method: 'GET' }),
        fetch('https://gly-tts-back.onrender.com/conversar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texto: 'ping' }),
        }),
        fetch('https://gly-csv-service-3.onrender.com', { method: 'GET' }),
      ]);
    } catch (error) {
      console.error('Error al despertar los servicios:', error);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
  
    { label: 'Contact', path: '/contact' },
    { label: 'Nostros', path: '/somos' },
    { label: 'Nuestros servicios IA', path: '/servicesAI' },
    { label: 'Estudia IA con GLYNNE', path: '/glynneColege' },
    { label: 'GLY-IA', path: 'https://glynne-sst-ai-hsiy.vercel.app/' },
  ];

  // Función de navegación con wakeUpServers
  const handleNavClick = async (path) => {
    wakeUpServers(); // Llamada silenciosa
    if (path.startsWith('http')) {
      window.open(path, '_blank'); // abrir links externos
    } else {
      router.push(path); // navegación interna
    }
    handleCloseMenu(); // cerrar menu mobile si estaba abierto
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-2 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      {/* Logo */}
      <img
        src="/logo2.png"
        alt="Logo"
        className="h-6 sm:h-7 md:h-8 cursor-pointer"
        onClick={() => handleNavClick('/')}
      />

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-3 xl:gap-5 items-center">
        {navItems.map((item, index) => {
          const isHighlighted = index >= navItems.length - 4; // últimos 4
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`transition text-xs sm:text-sm font-normal text-black ${
                isHighlighted
                  ? 'underline' // subrayado permanente
                  : 'hover:text-neutral-600 hover:underline' // normal con hover
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-white shadow-md lg:hidden transform transition-all duration-300 origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col divide-y divide-black/10">
          {navItems.map((item, index) => {
            const isHighlighted = index >= navItems.length - 4;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`px-6 py-3 text-left text-sm transition font-normal text-black ${
                  isHighlighted
                    ? 'underline'
                    : 'hover:text-neutral-600 hover:underline'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
