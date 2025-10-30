'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DocsSidebar() {
  const sections = [
    'Introducción',
    'Descarga del Framework',
    'Estructura de Carpetas',
    'Obtención de la API Key',
    'Selección de Modelos',
    'Gestión de Código en /user',
    'Automatización de Procesos',
    'Modificación de Agentes',
    'Personalidad del Agente',

    'Conexión con el Frontend',

  ];

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsVisible(window.innerWidth >= 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="w-47 h-screen sticky top-0 left-0 bg-white border-r border-gray-200 flex flex-col items-start py-8 px-4 z-20">

      {/* 🔹 Logo superior */}
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex justify-center w-full mb-4"
      >
        <img
          src="/logo2.png"
          alt="Logo GLYNNE"
          className="w-12 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        />
      </motion.div>

      {/* 🔹 Título de sección */}
      <motion.h2
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-800 text-xs font-semibold mb-6 tracking-wide uppercase text-center w-full"
      >
        Documentación del Framework
      </motion.h2>

      {/* 🔹 Navegación */}
      <nav className="flex flex-col justify-start w-full space-y-1">
        {sections.map((section) => (
          <motion.a
            key={section}
            href={`#${section}`}
            whileHover={{
              x: 4,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 300 },
            }}
            className="block px-2 py-1.5 rounded-md text-[12px] text-gray-600 font-medium hover:text-blue-600 hover:bg-gray-50 transition-all leading-snug text-left"
          >
            {section}
          </motion.a>
        ))}
      </nav>

      {/* 🔹 Espaciador final opcional */}
      <div className="mt-auto pt-8 text-[10px] text-gray-400 text-center w-full select-none">
        © {new Date().getFullYear()} GLYNNE Framework
      </div>
    </aside>
  );
}
