'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginPopup } from './LoginPopup';
import Input from './input'

export default function Main1() {
  const [showHeader, setShowHeader] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const section = document.getElementById('main1');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeader(entry.intersectionRatio >= 0.85);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main
      id="main1"
      className="relative w-full h-screen  font-inter bg-white text-gray-900 flex items-center justify-center"
    >
      {/* 🔹 HEADER ANIMADO */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="main1-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-2 bg-white border-b border-gray-100"
          >
            {/* 🔹 LOGO — más pequeño y refinado */}
            <motion.img
              src="/logo2.png"
              alt="Logo GLYNNE"
              className="h-5 sm:h-10 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => (window.location.href = 'https://www.glynneai.com/')}
            />

            {/* 🔹 BOTÓN LOGIN — ultracompacto */}
            <motion.button
              onClick={() => {
                localStorage.removeItem('glyiaChatClosed');
                setShowLoginModal(true);
              }}
              className="relative px-4 py-[6px] text-[12px] font-medium bg-black text-white rounded-md group overflow-hidden transition-all hover:scale-105 z-[9999]"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Iniciar sesión</span>
            </motion.button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* 🔹 CONTENIDO PRINCIPAL */}

       <Input />


      {/* 🔹 MODAL DE LOGIN */}
      <LoginPopup visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </main>
  );
}
