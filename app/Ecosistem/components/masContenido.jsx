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
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const closeButtonRef = useRef(null);
  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  const logos = {
    voice: '/logoSTT.png',
    db: '/logoDBs.png',
    audit: '/logoAUD.png',
    talento: 'logoTAL.png',
    default: '/logo2.png',
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const openService = (type) => {
    clearTimeouts();
    setContentType(type);
    setPopupOpen(true);

    if (type === 'voice' || type === 'db') {
      setShowLogo(true);
      setShowContent(false);
      logoTimerRef.current = setTimeout(() => {
        setShowLogo(false);
        contentTimerRef.current = setTimeout(() => setShowContent(true), 180);
      }, 700);
    } else {
      setShowLogo(false);
      setShowContent(true);
    }
  };

  const handleRefresh = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.25 } }),
  };

  const items = [
    { icon: <FaMicrophoneAlt />, type: 'voice', label: 'Voz' },
    { icon: <FaDatabase />, type: 'db', label: 'DB' },
    { icon: <FaFileSignature />, type: 'audit', label: 'Auditoría' },
    { icon: <FaSyncAlt />, type: 'refresh', label: 'Refrescar' },
  ];

  return (
    <div className="flex items-center gap-3">
      {items.map((item, i) => (
        <motion.button
          key={i}
          custom={i}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            item.type === 'refresh' ? handleRefresh() : openService(item.type)
          }
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm text-gray-700"
          title={item.label}
        >
          {item.icon}
        </motion.button>
      ))}

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
