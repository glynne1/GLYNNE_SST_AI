'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function DocsSidebar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const closeButtonRef = useRef(null);

  const sections = [
    'Arquitectura',
    'Integración API',
    'Agentes Inteligentes',
    'Automatizaciones',
    'UI y Componentes',
    'Seguridad',
    'Base de Datos',
    'Servicios Externos',
    'Flujos de Trabajo',
    'Logs y Monitoreo',
    'Escalabilidad',
    'DevOps',
  ];

  const openSection = (type) => {
    setContentType(type);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setContentType(null);
  };

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const checkScreen = () => setIsVisible(window.innerWidth >= 700);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 🔹 Barra lateral */}
      <div className="left-0 top-0 h-screen w-48 bg-white flex flex-col items-start justify-start py-6 px-4 space-y-4 z-20 border-r border-gray-100">
        {sections.map((section) => (
          <motion.button
            key={section}
            onClick={() => openSection(section)}
            className="relative w-full text-left px-3 py-2 rounded-md font-medium overflow-hidden group text-sm" // <-- texto más pequeño
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Reflejo de barrido de luz */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 text-gray-700">{section}</span>
          </motion.button>
        ))}

        {/* 🔹 Logo al final */}
        <div className="mt-auto w-full flex justify-start pt-4">
          <img
            src="/logo2.png"
            alt="Logo GLYNNE"
            className="w-10 md:w-10"
          />
        </div>
      </div>

      {/* 🔹 Modal a pantalla completa */}
      <AnimatePresence>
        {popupOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-30"
              onClick={closePopup}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-white w-screen h-screen overflow-auto"
            >
              {/* Botón de cerrar */}
              <div className="absolute top-4 right-4 z-50">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  ref={closeButtonRef}
                  onClick={closePopup}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <X className="w-5 h-5 text-gray-600" strokeWidth={1.8} />
                </motion.button>
              </div>

              {/* Contenido del modal */}
              <div className="w-full h-full flex items-center justify-center px-6">
                <p className="text-gray-400 text-sm italic text-center">
                  Contenido de la sección <strong>{contentType}</strong> pendiente de importar.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
