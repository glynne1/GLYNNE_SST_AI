'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaMicrophoneAlt,
  FaDatabase,
  FaFileSignature,
  FaSyncAlt,
  FaUserTie,
} from 'react-icons/fa';
import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';
import ChatTalento from './agentTalentoH/chatTalento';

export default function PlusMenu({ onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);
  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  // 🖼️ LOGOS SEGÚN SECCIÓN
  const logos = {
    voice: '/logoSTT.png',
    db: '/logoDBs.png',
    audit: '/logoAUD.png',
    talento: 'logoTAL.png',
    default: '/logo2.png',
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (popupOpen) {
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [popupOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(logoTimerRef.current);
      clearTimeout(contentTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    requestAnimationFrame(() => {
      const modal = document.getElementById('auditoria-modal');
      if (!modal) return;
      const focusable = modal.querySelector(
        'input, textarea, [contenteditable="true"], button[type="submit"]'
      );
      if (focusable && typeof focusable.focus === 'function') {
        focusable.focus();
      }
    });
  }, [showContent]);

  // 🚀 Se abre directamente sin logo en "audit" y "talento"
  const openService = (type) => {
    clearTimeouts();
    setContentType(type);
    setPopupOpen(true);

    if (type === 'voice' || type === 'db') {
      // Mantiene animación de logo
      setShowLogo(true);
      setShowContent(false);
      logoTimerRef.current = setTimeout(() => {
        setShowLogo(false);
        contentTimerRef.current = setTimeout(() => {
          setShowContent(true);
        }, 180);
      }, 700);
    } else {
      // Auditoría y Talento se abren de inmediato
      setShowLogo(false);
      setShowContent(true);
    }
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

  const menuVariants = {
    hidden: { opacity: 0, y: 10, x: 10, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: 10, x: 10, scale: 0.98, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 5 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.25 },
    }),
  };

  return (
    <div ref={menuRef} className="relative flex items-center">
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        className="text-gray-500 hover:text-gray-700 transition-all text-lg font-semibold px-2"
        aria-label="Abrir menú"
      >
        +
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute bottom-full mb-2 w-56 bg-white shadow-lg rounded-xl border border-gray-200 z-50 backdrop-blur-sm ${
              isSmallScreen ? 'left-0' : 'right-0'
            }`}
          >
            <motion.div
              className="flex flex-col py-2 text-[0.75rem] font-light"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[
                // { icon: <FaMicrophoneAlt />, text: 'Conversación por voz', type: 'voice' }, // 👈 Opción comentada
                { icon: <FaDatabase />, text: 'Analiza tu base', type: 'db' },
                { icon: <FaFileSignature />, text: 'Auditoría empresarial', type: 'audit' },
                { icon: <FaUserTie />, text: 'Asistente de Talento', type: 'talento' },
                { icon: <FaSyncAlt />, text: 'Refrescar chat', type: 'refresh' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  className="relative group flex items-center gap-2 px-3 py-2 cursor-pointer overflow-hidden hover:bg-gray-100 transition-all"
                  onClick={() =>
                    item.type === 'refresh' ? handleRefresh() : openService(item.type)
                  }
                  whileHover={{ x: -3, scale: 1.02 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="text-gray-600 text-xs relative z-10"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-gray-700 text-[0.7rem] tracking-wide relative z-10">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={handleClosePopup}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-white w-screen h-screen shadow-xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="absolute top-5 right-5 z-60">
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

              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence>
                  {/* 🔹 SOLO DB y VOICE mantienen logo */}
                  {showLogo && (contentType === 'voice' || contentType === 'db') && (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0 z-50 flex items-center justify-center"
                    >
                      <motion.img
                        src={logos[contentType] || logos.default}
                        alt="Logo sección"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 object-contain mb-4"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showContent && contentType === 'audit' && (
                    <motion.div
                      key="audit-content"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0 overflow-auto"
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
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
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
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <div id="db-modal" className="w-full h-full overflow-y-auto">
                        <DB />
                      </div>
                    </motion.div>
                  )}

                  {showContent && contentType === 'talento' && (
                    <motion.div
                      key="talento-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-auto"
                    >
                      <div id="talento-modal" className="w-full h-full">
                        <ChatTalento />
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