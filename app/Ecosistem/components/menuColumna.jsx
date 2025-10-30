'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, X, BookOpen, UserCircle2, Brain, FileText } from 'lucide-react';
import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';
import News from './muroSocial/page';
import DocsSection from './FW_section/page';
import DocumentacionOff from '../components/DocumentacionOff';
import TransformerAnimation from '../../components/TransformerAnimation';

export default function PlusMenu({ onRefresh }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [tooltip, setTooltip] = useState(''); // <-- estado para tooltip

  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => setIsVisible(window.innerWidth >= 900);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

    if (type === 'documentacion') {
      window.open('https://deepwiki.com/glynnethec/GLYNNE-FWK', '_blank');
      return;
    }

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

  const iconData = [
    { type: 'news', icon: UserCircle2, title: 'Muro Social AI', tooltip: 'Quienes somos' },
    { type: 'docs', icon: BookOpen, title: 'Docs Framework AI', tooltip: 'instala nuestro framework GLYNNE' },
    { type: 'nn', icon: Brain, title: 'Neural Network', tooltip: 'Visualización de la red neuronal T' },
    { type: 'documentacion', icon: FileText, title: 'Documentación Completa', tooltip: 'documentación SENIOR' },
    { type: 'refresh', icon: RefreshCcw, title: 'Refrescar chat', tooltip: 'refresh' }
  ];

  return (
    <>
      {/* ✅ Barra lateral */}
      <div className="fixed left-0 top-0 h-screen w-12 flex flex-col items-center justify-center py-6 space-y-7 z-20">
        {iconData.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.type} className="relative">
              <button
                onClick={() => {
                  if(item.type === 'refresh') handleRefresh();
                  else openService(item.type);
                }}
                onMouseEnter={() => setTooltip(item.tooltip)}
                onMouseLeave={() => setTooltip('')}
                className="p-2 rounded-md hover:scale-110 transition-all"
              >
                <IconComponent className="w-4 h-4 text-gray-400 hover:text-black" strokeWidth={1.4} />
              </button>

              {/* 🔹 Tooltip */}
              <AnimatePresence>
                {tooltip === item.tooltip && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap z-50 shadow-md"
                  >
                    {item.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {popupOpen && (
          <>
            <motion.div className="fixed inset-0 z-10 hidden" onClick={handleClosePopup} />
            <motion.div
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-30 bg-white w-screen h-screen"
            >
              {/* ✅ BOTÓN CERRAR SUPERIOR */}
              <div className="absolute top-4 right-4 z-[9999]">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClosePopup}
                  className="inline-flex items-center mt-[-10px] justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
                >
                  <X className="w-5 h-5 text-gray-600" strokeWidth={1.8} />
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
                      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    >
                      <img src="/logo2.png" alt="Logo" className="w-20 h-20 opacity-90" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showContent && contentType === 'news' && (
                    <motion.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 overflow-auto">
                      <News />
                    </motion.div>
                  )}
                  {showContent && contentType === 'docs' && (
                    <motion.div key="docs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 w-screen h-screen overflow-auto">
                      <div className="absolute inset-0 bg-white" />
                      <div className="relative w-full h-full p-10">
                        <DocsSection className="w-full h-full" />
                      </div>
                    </motion.div>
                  )}
                  {showContent && contentType === 'nn' && (
                    <motion.div key="nn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-white">
                      <div className="w-full h-full flex items-center justify-center">
                        <TransformerAnimation />
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
