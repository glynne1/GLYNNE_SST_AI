'use client';

import { motion } from 'framer-motion';
import AlertRotator from '../Ecosistem/components/alert'; // <-- Importamos el componente de alerts

export default function VentanaIncrustada() {
  return (
    <motion.div
      className="relative w-full -mt-16 h-screen overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Header con logo centrado */}
      <header className="absolute top-0 left-0 w-full z-40 px-4 md:px-6 py-3 flex items-center justify-center bg-white shadow-sm">

        {/* 💠 Botones opcionales a la izquierda (vacío por ahora) */}
        <div className="absolute left-4"></div>

        {/* 💎 Logo perfectamente centrado */}
        <img
          src="/logo2.png"
          alt="Logo"
          className="h-6 sm:h-7 md:h-8 cursor-pointer transition-all duration-300"
          onClick={() => (window.location.href = 'https://www.glynneai.com/')}
        />

        {/* 💠 Botones opcionales a la derecha (vacío por ahora) */}
        <div className="absolute right-4"></div>
      </header>

      {/* 🔹 Contenedor de la página incrustada */}
      <iframe
        src="https://bbycroft.net/llm?lang=es&utm_source=glynne"
        title="Demostración de Modelo de Lenguaje"
        className="w-full border-0"
        style={{ height: '95%', marginTop: '20px' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* 🔹 Alertas flotantes */}
      <AlertRotator />
    </motion.div>
  );
}
