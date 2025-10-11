'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaMicrophoneAlt,
  FaDatabase,
  FaFileSignature,
  FaSyncAlt,
} from 'react-icons/fa';
import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';

export default function PlusMenu({ onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null); // 'voice' | 'db' | 'audit' | null
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);
  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  // --- resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        // re-render if needed
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- block scroll when popup open
  useEffect(() => {
    if (popupOpen) {
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [popupOpen]);

  // --- cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(logoTimerRef.current);
      clearTimeout(contentTimerRef.current);
    };
  }, []);

  // Focus automático cuando aparece el contenido
  useEffect(() => {
    if (!showContent) return;
    requestAnimationFrame(() => {
      const modal = document.getElementById('auditoria-modal');
      if (!modal) return;
      const focusable = modal.querySelector('input, textarea, [contenteditable="true"], button[type="submit"]');
      if (focusable && typeof focusable.focus === 'function') {
        focusable.focus();
      }
    });
  }, [showContent]);

  const openService = (type) => {
    clearTimeouts();
    setContentType(type);
    setPopupOpen(true);
    setShowLogo(true);
    setShowContent(false);

    logoTimerRef.current = setTimeout(() => {
      setShowLogo(false);
      contentTimerRef.current = setTimeout(() => {
        setShowContent(true);
      }, 120);
    }, 700);
  };

  const handleRefresh = () => {
    setMenuOpen(false);
    if (typeof onRefresh === 'function') onRefresh();
  };

  const clearTimeouts = () => {
    clearTimeout(logoTimerRef.current);
    clearTimeout(contentTimerRef.current);
    logoTimerRef.current = null;
    contentTimerRef.current = null;
  };

  const handleClosePopup = () => {
    clearTimeouts();
    setPopupOpen(false);
    setContentType(null);
    setShowLogo(false);
    setShowContent(false);
  };

  if (typeof window !== 'undefined' && window.innerWidth < 500) return null;

  return (
    <div ref={menuRef} className="relative flex items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-500 hover:text-gray-700 transition-colors text-xl font-bold px-2"
        aria-label="Abrir menú"
      >
        +
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full mb-2 left-0 w-52 bg-white shadow-md rounded-lg border border-gray-200 z-50"
          >
            <div className="flex flex-col py-2 text-sm">
              <div
                onClick={() => openService('voice')}
                className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden rounded-t-lg hover:bg-gray-100 transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <FaMicrophoneAlt className="text-gray-600 text-sm relative z-10" />
                <span className="text-gray-700 text-xs relative z-10">
                  Conversación por voz
                </span>
              </div>

              <div
                onClick={() => openService('db')}
                className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <FaDatabase className="text-gray-600 text-sm relative z-10" />
                <span className="text-gray-700 text-xs relative z-10">
                  Analiza tu base
                </span>
              </div>

              <div
                onClick={() => openService('audit')}
                className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <FaFileSignature className="text-gray-600 text-sm relative z-10" />
                <span className="text-gray-700 text-xs relative z-10">
                  Auditoría empresarial
                </span>
              </div>

              <div
                onClick={handleRefresh}
                className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden rounded-b-lg hover:bg-gray-100 transition-colors"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <FaSyncAlt className="text-gray-600 text-sm relative z-10" />
                <span className="text-gray-700 text-xs relative z-10">
                  Refrescar chat
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popupOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={handleClosePopup}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-50 bg-white w-screen h-screen shadow-xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="absolute top-4 right-4 z-60">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  ref={closeButtonRef}
                  onClick={handleClosePopup}
                  aria-label="Cerrar"
                  className="inline-flex items-center justify-center p-3 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  <FaTimes className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>

              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence>
                  {showLogo && (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.05 }}
                      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="/logo2.png"
                          alt="Logo"
                          className="w-26 h-=26 object-contain mb-4"
                        />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="text-gray-700 text-sm font-medium tracking-wide"
                        ></motion.span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showContent && contentType === 'audit' && (
                    <motion.div
                      key="audit-content"
                      initial={{ opacity: 0, scale: 0.998 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.998 }}
                      transition={{ duration: 0.32 }}
                      className="absolute inset-0 z-40 overflow-auto"
                    >
                      <div id="auditoria-modal" className="w-full h-full">
                        <ChatLLM />
                      </div>
                    </motion.div>
                  )}
                  {showContent && contentType === 'voice' && (
                    <motion.div
                      key="voice-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 z-40 overflow-auto"
                    >
                      <div id="voice-modal" className="w-full h-full">
                        <ChatTTS onStop={handleClosePopup} />
                      </div>
                    </motion.div>
                  )}
                  {showContent && contentType === 'db' && (
                    <motion.div
                      key="db-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 z-40 overflow-auto"
                    >
                      <div id="db-modal" className="w-full h-full">
                        <div className="w-full h-[100vh] overflow-y-auto">
                          <DB />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
