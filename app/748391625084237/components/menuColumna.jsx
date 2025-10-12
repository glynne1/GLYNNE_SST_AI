'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Database,
  FileSignature,
  RefreshCcw,
  X,
} from 'lucide-react'; // 🧠 Iconos modernos
import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';

export default function PlusMenu({ onRefresh }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const closeButtonRef = useRef(null);
  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.overflow = popupOpen ? 'hidden' : '';
  }, [popupOpen]);

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

  if (typeof window !== 'undefined' && window.innerWidth < 500) return null;

  return (
    <>
      {/* 🔹 BARRA LATERAL */}
      <div className="fixed left-0 top-0 h-screen w-12 bg-none flex flex-col items-center justify-center py-6 space-y-7 z-20">
        {/* 🎙️ Voz */}
        <button
          onClick={() => openService('voice')}
          className="p-2 rounded-md transition-all hover:scale-110"
          title="Conversación por voz"
        >
          <Mic className="text-gray-300 hover:text-gray-500 w-5 h-5 transition-all duration-200" strokeWidth={1.4} />
        </button>

        {/* 🧩 Base de datos */}
        <button
          onClick={() => openService('db')}
          className="p-2 rounded-md transition-all hover:scale-110"
          title="Analiza tu base"
        >
          <Database className="text-gray-300 hover:text-gray-500 w-5 h-5 transition-all duration-200" strokeWidth={1.4} />
        </button>

        {/* 🧠 Auditoría */}
        <button
          onClick={() => openService('audit')}
          className="p-2 rounded-md transition-all hover:scale-110"
          title="Auditoría empresarial"
        >
          <FileSignature className="text-gray-300 hover:text-gray-500 w-5 h-5 transition-all duration-200" strokeWidth={1.4} />
        </button>

        {/* 🔄 Refrescar */}
        <button
          onClick={handleRefresh}
          className="p-2 rounded-md transition-all hover:scale-110"
          title="Refrescar chat"
        >
          <RefreshCcw className="text-gray-300 hover:text-gray-500 w-5 h-5 transition-all duration-200" strokeWidth={1.4} />
        </button>
      </div>

      {/* 🔹 POPUP DE CONTENIDO */}
      <AnimatePresence>
        {popupOpen && (
          <>
            {/* Fondo invisible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
              className="fixed inset-0 z-10 hidden"
              onClick={handleClosePopup}
            />

            {/* Contenedor principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-30 bg-white w-screen h-screen"
            >
              {/* Botón de cerrar */}
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
                  {showContent && contentType === 'audit' && (
                    <motion.div
                      key="audit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <ChatLLM />
                    </motion.div>
                  )}

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
