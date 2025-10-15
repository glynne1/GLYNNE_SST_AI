'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Database, FileSignature, RefreshCcw, X, Newspaper } from 'lucide-react'; // 🧠 Iconos modernos
import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';
import News from './news/news'; // 🆕 Import del componente News

export default function PlusMenu({ onRefresh }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const closeButtonRef = useRef(null);
  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  // 👇 Control de visibilidad por tamaño
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 700);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Evita scroll cuando está abierto
  useEffect(() => {
    document.documentElement.style.overflow = popupOpen ? 'hidden' : '';
  }, [popupOpen]);

  // Limpieza de timers
  useEffect(() => {
    return () => {
      clearTimeout(logoTimerRef.current);
      clearTimeout(contentTimerRef.current);
    };
  }, []);

  const openService = (type) => {
    clearTimeout(logoTimerRef.current);
    clearTimeout(contentTimerRef.current);
    setContentType(type);
    setPopupOpen(true);
    setShowLogo(true);
    setShowContent(false);

    logoTimerRef.current = setTimeout(() => {
      setShowLogo(false);
      contentTimerRef.current = setTimeout(() => setShowContent(true), 120);
    }, 700);
  };

  const handleRefresh = () => {
    if (typeof onRefresh === 'function') onRefresh();
  };

  const handleClosePopup = () => {
    clearTimeout(logoTimerRef.current);
    clearTimeout(contentTimerRef.current);
    setPopupOpen(false);
    setContentType(null);
    setShowLogo(false);
    setShowContent(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 🔹 BARRA LATERAL */}
      <div className="fixed left-0 top-0 h-screen w-12 bg-none flex flex-col items-center justify-center py-6 space-y-7 z-20">

        {/* 🎙️ Voz */}
        <button
          onClick={() => openService('voice')}
          className="p-2 rounded-md hover:scale-110 transition-all"
          title="Conversación por voz"
        >
          <Mic
            className="w-5 h-5 text-gray-400 hover:text-black transition-colors duration-1000 ease-in-out"
            strokeWidth={1.4}
          />
        </button>

        {/* 📰 Noticias */}
        <button
          onClick={() => openService('news')}
          className="p-2 rounded-md hover:scale-110 transition-all"
          title="Noticias IA"
        >
          <Newspaper
            className="w-5 h-5 text-gray-400 hover:text-black transition-colors duration-1000 ease-in-out"
            strokeWidth={1.4}
          />
        </button>

        {/* 🔄 Refrescar */}
        <button
          onClick={handleRefresh}
          className="p-2 rounded-md hover:scale-110 transition-all"
          title="Refrescar chat"
        >
          <RefreshCcw
            className="w-5 h-5 text-gray-400 hover:text-black transition-colors duration-1000 ease-in-out"
            strokeWidth={1.4}
          />
        </button>
      </div>

      {/* 🔹 POPUP DE CONTENIDO */}
      <AnimatePresence>
        {popupOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
              className="fixed inset-0 z-10 hidden"
              onClick={handleClosePopup}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-30 bg-white w-screen h-screen"
            >
              {/* ❌ Botón de cerrar */}
              <div className="absolute top-4 right-4 z-40">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  ref={closeButtonRef}
                  onClick={handleClosePopup}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <X className="w-4 h-4 text-gray-600" strokeWidth={1.8} />
                </motion.button>
              </div>

              {/* Contenido dinámico */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence>
                  {showLogo && (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.05 }}
                      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    >
                      <img
                        src="/logo2.png"
                        alt="Logo"
                        className="w-20 h-20 object-contain opacity-90"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {/* 🎙️ Voz */}
                  {showContent && contentType === 'voice' && (
                    <motion.div
                      key="voice"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <ChatTTS onStop={handleClosePopup} />
                    </motion.div>
                  )}

                  {/* 📰 Noticias */}
                  {showContent && contentType === 'news' && (
                    <motion.div
                      key="news"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <News />
                    </motion.div>
                  )}

                  {/* 🧩 Base de datos */}
                  {showContent && contentType === 'db' && (
                    <motion.div
                      key="db"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <div className="w-full h-[100vh] overflow-y-auto">
                        <DB />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
