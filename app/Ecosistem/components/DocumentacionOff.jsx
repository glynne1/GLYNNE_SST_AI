'use client';

import { motion } from 'framer-motion';

export default function VentanaIncrustada() {
  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Header con logo centrado */}
      <header className="absolute top-0 left-0 w-full z-40 px-4 md:px-6 py-3 flex items-center justify-center bg-white shadow-sm">
        <div className="absolute left-4"></div>

        <img
          src="/logo2.png"
          alt="Logo"
          className="h-6 sm:h-7 md:h-8 cursor-pointer transition-all duration-300"
          onClick={() => (window.location.href = 'https://www.glynneai.com/')}
        />

        <div className="absolute right-4"></div>
      </header>

      {/* 🔹 Iframe full-screen de DeepWiki */}
      <iframe
        src="https://deepwiki.com/glynnethec/GLYNNE-FWK"
        title="GLYNNE Framework en DeepWiki"
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ marginTop: '60px' }} // ajusta según la altura de tu header
        frameBorder="0"
        allowFullScreen
      />
    </motion.div>
  );
}
