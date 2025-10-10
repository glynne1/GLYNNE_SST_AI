'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaMicrophoneAlt } from 'react-icons/fa';
import ChatTTS from './LLM';

export default function PlusMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (popupOpen && !minimized) {
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [popupOpen, minimized]);

  const handleOpenPopup = (content) => {
    setPopupContent(content);
    setPopupOpen(true);
    setMenuOpen(false);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setMinimized(false);
    setPopupContent(null);
  };

  if (windowWidth < 500) return null;

  return (
    <div ref={menuRef} className="relative flex items-center">
      {/* Botón + */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-500 hover:text-gray-700 transition-colors text-xl font-bold px-2"
      >
        +
      </button>

      {/* 🔹 Menú desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-0 w-52 bg-white shadow-md rounded-lg border border-gray-200 z-50"
          >
            <div className="flex flex-col py-2 text-sm">
              {/* 🗣️ Conversación hablada */}
              <div
                onClick={() => handleOpenPopup(<ChatTTS onStop={handleClosePopup} />)}
                className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* ✨ Efecto barrido luminoso */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <FaMicrophoneAlt className="text-gray-600 text-sm relative z-10" />
                <span className="text-gray-700 text-xs relative z-10">
                  Conversación por voz
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Popup pantalla completa (fade + scale animación) */}
      <AnimatePresence>
        {popupOpen && !minimized && (
          <>
            {/* Fondo oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setMinimized(true)}
              aria-hidden="true"
            />

            {/* Contenedor principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="fixed inset-0 z-50 bg-white overflow-y-auto w-screen h-screen flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Controles */}
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                {/* Minimizar */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMinimized(true)}
                  aria-label="Minimizar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <FaMinus className="w-4 h-4 text-gray-600" />
                </motion.button>

                {/* Cerrar */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  ref={closeButtonRef}
                  onClick={handleClosePopup}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <FaTimes className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>

              {/* Contenido dinámico */}
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
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
            onClick={() => setMinimized(false)}
          >
            Reabrir chat de voz
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
