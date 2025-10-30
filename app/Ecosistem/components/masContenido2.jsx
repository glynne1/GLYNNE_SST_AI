'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus } from 'react-icons/fa';
import ChatTTS from './LLM';

export default function PlusMenu() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const closeButtonRef = useRef(null);
  const bodyOverflowBackup = useRef('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🧩 Bloqueo de scroll independiente (sin afectar otros modales)
  useEffect(() => {
    if (popupOpen && !minimized) {
      // Guardar el estado previo del overflow (por si otro modal también lo bloquea)
      bodyOverflowBackup.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      // Solo restaurar si nadie más lo está bloqueando
      document.body.style.overflow = bodyOverflowBackup.current || '';
    }
  }, [popupOpen, minimized]);

  const handleOpenPopup = () => {
    setPopupContent(<ChatTTS onStop={handleClosePopup} />);
    setPopupOpen(true);
  };

  // 🔒 Cierra solo este popup, sin afectar otros
  const handleClosePopup = (e) => {
    e?.stopPropagation();
    setPopupOpen(false);
    setMinimized(false);
    setPopupContent(null);
  };

  if (windowWidth < 500) return null;

  const barVariants = {
    animate: (i) => ({
      scaleY: [1, 2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="relative flex items-center z-[60]">
      {/* 🎛️ Botón circular blanco con líneas animadas */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenPopup();
        }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-black shadow-lg hover:shadow-xl transition-all"
        aria-label="Abrir chat de voz"
      >
        <div className="flex items-end justify-center gap-[3px] h-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-black rounded-sm"
              style={{ height: '50%' }}
              variants={barVariants}
              animate="animate"
              custom={i}
            />
          ))}
        </div>
      </motion.button>

      {/* 🔹 Popup pantalla completa */}
      <AnimatePresence>
        {popupOpen && !minimized && (
          <>
            {/* Fondo semi-transparente (solo cierra este popup si se hace clic afuera) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(true);
              }}
              aria-hidden="true"
            />

            {/* Contenedor del popup */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
              className="fixed inset-0 z-[90] bg-white overflow-y-auto w-screen h-screen shadow-2xl"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-0 flex gap-3">
                {/* Minimizar */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinimized(true);
                  }}
                  aria-label="Minimizar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md bg-black text-white hover:bg-gray-900 focus:outline-none"
                >
                  <FaMinus className="w-4 h-4" />
                </motion.button>

                {/* Cerrar SOLO este popup */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  ref={closeButtonRef}
                  onClick={handleClosePopup}
                  aria-label="Cerrar chat de voz"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md bg-black text-white hover:bg-gray-900 focus:outline-none"
                >
                  <FaTimes className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="w-full h-full p-4">{popupContent}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔹 Popup minimizado */}
      <AnimatePresence>
        {popupOpen && minimized && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-[70] bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(false);
            }}
          >
            Reabrir chat de voz
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
