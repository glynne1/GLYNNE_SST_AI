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
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsVisible(window.innerWidth >= 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="w-56 h-screen -mt-30 sticky top-0 left-0 bg-white border-r border-gray-200 shadow-sm flex flex-col items-start py-8 px-4 z-20">

      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center w-full mb-4"
      >
        <img
          src="/logo2.png"
          alt="Logo GLYNNE"
          className="w-12 opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        />
      </motion.div>

      {/* TITULO */}
      <motion.h2
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-gray-700 text-xs font-semibold mb-4 tracking-wide uppercase text-center w-full"
      >
        Documentación del Framework
      </motion.h2>

      {/* NAV */}
      <nav className="flex flex-col justify-start w-full space-y-2 overflow-y-auto pr-1 scrollbar-hide">

        {sections.map((section, index) => (
          <motion.a
            key={section}
            href={`#${section}`}
            onClick={() => setActive(section)}
            transition={{ duration: 0.25, delay: index * 0.03 }}

            /* ❌ SIN whileHover, SIN whileTap (NO SCALE) */
            className={`
              relative flex items-center px-3 py-2 
              text-xs rounded-xl font-medium  
              transition-all duration-300 overflow-hidden group
              border

              ${
                active === section
                  ? `
                    bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 
                    text-white border-gray-800 shadow-lg
                  `
                  : `
                    bg-white text-gray-700 
                    border-gray-100 shadow-sm 
                    hover:text-gray-900
                  `
              }
            `}
          >
            {/* ⭐ Barrido solo en seleccionado */}
            {active === section && (
              <span
                className="
                  absolute top-0 left-0 w-full h-full
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transform -translate-x-full 
                  group-hover:translate-x-full
                  transition-transform duration-700 ease-in-out
                "
              />
            )}

            <span className="relative z-10">{section}</span>
          </motion.a>
        ))}

      </nav>

      {/* FOOTER */}
      <div className="mt-50 pt-8 text-[10px] text-gray-400 text-center w-full select-none">
        © {new Date().getFullYear()} GLYNNE Framework
      </div>
    </aside>
  );
}
