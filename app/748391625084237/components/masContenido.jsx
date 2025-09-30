'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus } from 'react-icons/fa';
import ChatTTS from './LLM'; // ejemplo de componente importado
import DB from '../../CSVanaliza/components/panel';

export default function PlusMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  // 🔹 Detectar tamaño de ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔹 Cerrar menú si clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔹 Bloquear scroll cuando popup está abierto
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

  // 🔹 Si la ventana es menor a 500px, no renderizamos nada
  if (windowWidth < 500) return null;

  return (
    <div ref={menuRef} className="relative flex items-center">
      {/* Botón + */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold px-2"
      >
        +
      </button>

      {/* Menú desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-0 w-56 bg-white shadow-lg rounded-xl border border-gray-200 z-50
                       max-h-[60vh] overflow-y-auto"
          >
            <button
              onClick={() => handleOpenPopup(<ChatTTS onStop={handleClosePopup} />)}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
            >
              Charla conmigo y descubre ideas 
            </button>
            <button
              onClick={() =>
                handleOpenPopup(
                  <div className="w-full h-[100vh] overflow-y-auto">
                    <DB />
                  </div>
                )
              }
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl"
            >
              Analiza tu base de datos
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Popup pantalla completa centrado */}
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

            {/* Panel deslizante fullscreen */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
              className="fixed inset-0 z-50 bg-white overflow-y-auto w-screen h-screen"
              role="dialog"
              aria-modal="true"
            >
              {/* Botones de control */}
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMinimized(true)}
                  aria-label="Minimizar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md focus:outline-none"
                >
                  <FaMinus className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  ref={closeButtonRef}
                  onClick={handleClosePopup}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md focus:outline-none"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Contenido */}
              <div className="w-full h-full p-4">
                {popupContent}
              </div>
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
            className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer"
            onClick={() => setMinimized(false)}
          >
            Reabrir menú
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
