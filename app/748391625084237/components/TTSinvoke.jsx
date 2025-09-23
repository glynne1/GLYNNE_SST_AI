'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus } from 'react-icons/fa';
import ChatTTS from '../../GLY_SALES_AGENTS/components/ChatLLM';

export default function DiscoverGlyAI() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // 🔹 Bloqueo de scroll cuando está abierto
  useEffect(() => {
    if (open && !minimized) {
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [open, minimized]);

  // 🔹 Cerrar con tecla ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) handleClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // 🔹 Acción cerrar (cancela todo)
  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
    // 👉 Aquí mandamos señal a ChatTTS para detener todo
  };

  return (
    <>
      {/* Botón que abre el popup */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="text-xs md:text-sm underline underline-offset-2 hover:opacity-90 transition-opacity duration-150 focus:outline-none"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        descubre ideas con GLYai
      </button>

      {/* Popup tipo panel deslizante */}
      <AnimatePresence>
        {open && !minimized && (
          <>
            {/* Fondo oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setMinimized(true)} // 👈 click afuera minimiza
              aria-hidden="true"
            />

            {/* Panel que ocupa toda la pantalla */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
              className="fixed top-0 right-0 z-50 w-screen h-screen bg-white dark:bg-gray-900 shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              {/* Botones */}
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                {/* Minimizar */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMinimized(true)}
                  aria-label="Minimizar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md focus:outline-none"
                >
                  <FaMinus className="w-5 h-5" />
                </motion.button>

                {/* Cerrar */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  ref={closeButtonRef}
                  onClick={handleClose}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md focus:outline-none"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Contenido */}
              <ChatTTS onStop={handleClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔹 Popup minimizado (botón flotante) */}
      {open && minimized && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
          onClick={() => setMinimized(false)} // restaurar
        >
          Reabrir GLYai
        </motion.div>
      )}
    </>
  );
}
