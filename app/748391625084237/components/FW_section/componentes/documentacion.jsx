'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DocsSidebar() {
  const sections = [
    'Introducción',
    'Descarga del Framework',
    'Instalación y Estructura de Carpetas',
    'Obtención de la API Key',
    'Selección de Modelos',
    'Ejecución Inicial',
    'Gestión de Código en /user',
    'Automatización de Procesos',
    'Modificación de Agentes',
    'Personalidad del Agente',
    'Configuración del Modelo',
    'Ajuste de Temperatura',
    'Conexión con el Frontend',
    'Pruebas desde el CLI',
    'Despliegue y Producción',
    'Activación del Framework',
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
    <aside className="w-60 h-screen sticky top-0 left-0 bg-white border-r border-gray-200 flex flex-col items-center py-8 px-4 z-20 shadow-sm">
      
      {/* 🔹 Título de sección */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-800 text-xs font-semibold mb-6 tracking-wide uppercase"
      >
        Documentación del Framework
      </motion.h2>

      {/* 🔹 Navegación */}
      <nav className="flex flex-col justify-start w-full space-y-1">
        {sections.map((section, index) => (
          <motion.a
            key={section}
            href={`#${section}`}
            whileHover={{
              x: 4,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 300 },
            }}
            className="block px-2 py-1.5 rounded-md text-[12px] text-gray-600 font-medium hover:text-blue-600 hover:bg-gray-50 transition-all leading-snug"
          >
            {index + 1}. {section}
          </motion.a>
        ))}
      </nav>

      {/* 🔹 Logo inferior */}
      <div className="mt-auto flex justify-center pt-6">
        <motion.img
          src="/logo2.png"
          alt="Logo GLYNNE"
          className="w-10 opacity-75 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </aside>
  );
}
