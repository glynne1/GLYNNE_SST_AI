'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, X, ChevronRight } from 'lucide-react';

import ChatTTS from './LLM';
import ChatLLM from './ChatAuditoria';
import DB from '../../CSVanaliza/components/panel';
import News from '../components/panelBuildAgent.jsx/page';
import DocsSection from './FW_section/page';
import DocumentacionOff from '../components/DocumentacionOff';
import MercadoPagoButton from '../components/MercadoPagoButton';

export default function PlusMenu({ onRefresh }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoverMenu, setHoverMenu] = useState(false);

  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);
  const audioRef = useRef(null); // 🎵 referencia del audio

  // Cargar el audio cuando se monta el componente
  useEffect(() => {
    audioRef.current = new Audio('/menuTono.mp3'); // asegúrate de tener /public/menuTono.mp3
  }, []);

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

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia desde el inicio
      audioRef.current.play().catch(() => {}); // Ignora error si el navegador bloquea autoplay
    }
  };

  const openService = (type) => {
    // 🔊 Solo suena si el tipo es 'news'
    if (type === 'news') playSound();

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
    {
      type: 'news',
      title: 'Explora el Panel de Desarrollo IA',
      description:
        'Accede al entorno donde se configuran y prueban los modelos de inteligencia artificial de GLYNNE. Diseña roles, ajusta parámetros y observa cómo evoluciona tu agente dentro del framework.',
      bg: 'https://i.pinimg.com/originals/a3/e9/d6/a3e9d61815b6ed53d26f17861f1f6e34.gif',
    },
    {
      type: 'docs',
      title: 'Crea tu propio Agente de IA',
      description:
        'Framework listo para crear agentes inteligentes personalizables e integrarlos en cualquier sistema.',
      bg: 'https://i.pinimg.com/736x/2a/f4/ad/2af4ad1da3e8caaf60577c2fcfa190b9.jpg',
    },
    {
      type: 'documentacion',
      title: 'Documentación Completa GLYNNE Framework',
      description:
        'Guía completa para construir sistemas inteligentes: arquitectura, nodos y automatización avanzada.',
      bg: 'https://i.pinimg.com/1200x/95/4f/cb/954fcb1857901306dc74d09908569765.jpg',
    },
    {
      type: 'nn',
      title: 'Mira cómo funciona una IA desde cero',
      description:
        'Aprende cómo opera un modelo tipo GPT: arquitectura, razonamiento y entrenamiento visualizado.',
      bg: 'https://i.pinimg.com/736x/15/97/21/15972177e2c07a646e0f5fa5d7591654.jpg',
    },
  ];

  return (
    <>
      {/* Left floating menu */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 w-15 flex flex-col items-center justify-center space-y-6 
        ${popupOpen ? 'pointer-events-none opacity-40' : ''} z-30`}
      >
        <motion.div
          onMouseEnter={() => !popupOpen && setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          whileHover={{ scale: 1.15, rotate: 8 }}
          className="cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 hover:text-black transition-all" />
        </motion.div>

        <button
          onClick={() => {
            handleRefresh();
          }}
          className="p-2 rounded-md hover:scale-110 transition-all"
        >
          <RefreshCcw className="w-4 h-4 text-gray-500 hover:text-black" />
        </button>
      </div>

      {/* Hover Sidebar */}
      <AnimatePresence>
        {hoverMenu && !popupOpen && (
          <motion.div
            initial={{ x: '-20%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-20%', opacity: 0 }}
            className="fixed left-0 top-0 h-screen w-[60vw] bg-black backdrop-blur-xl shadow-xl border-r border-gray-200 
                       z-40 flex flex-row items-center justify-between p-12"
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
          >
            {/* Cards */}
            <div className="flex flex-col justify-center space-y-8 h-[100vh] w-[70%]">
              {iconData.map((item) => (
                <motion.div
                  key={item.type}
                  onClick={() => openService(item.type)}
                  className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group h-32 flex items-end w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.bg})` }}
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/25 transition-all" />
                  <div className="relative z-10 p-4">
                    <span className="text-white text-[14px] font-semibold text-base drop-shadow-xl tracking-wide">
                      {item.title}
                    </span>
                    {item.description && (
                      <p className="text-white text-[10px] opacity-80 mt-1 leading-tight drop-shadow-lg">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Card */}
            <div className="flex flex-col ml-[30px] justify-center items-center h-[70vh] w-[200px] p-6 bg-black backdrop-blur-lg rounded-2xl shadow-lg text-gray-200">
              <img src="/logo.png" className="w-20 h-auto mb-2" />
              <p className="text-[10px] text-center opacity-80 tracking-wide leading-snug mb-6">
                Aprende y adáptate a la era IA
              </p>

              <div className="flex flex-col items-center justify-center flex-grow">
                <h2 className="text-sm font-semibold mb-2 text-gray-100 tracking-wide">QR GLY MV</h2>
                <img src="/qrMenuH.png" className="w-24 h-auto mb-2" />
                <p className="text-[10px] text-center font-medium opacity-90">visita GLYNNE mobile</p>
              </div>

              <div className="text-[9px] font-medium text-gray-400 opacity-70 tracking-wider text-center mt-4">
                © GLYNNE 2025 - IA MCP
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ BLUR DE 60% RESTANTE DEL VIEWPORT */}
      <AnimatePresence>
        {hoverMenu && !popupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed right-0 top-0 w-[60vw] h-screen bg-black/20 backdrop-blur-md pointer-events-none z-30"
          />
        )}
      </AnimatePresence>

      {/* Popups */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 bg-white w-screen h-screen"
          >
            <div className="absolute top-4 right-4 z-[100]">
              <motion.button
                whileHover={{ rotate: 90, scale: 1.05 }}
                onClick={handleClosePopup}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            <div className="relative w-full h-full overflow-hidden">
              {showLogo && (
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  <img src="/logo2.png" className="w-20 h-20 opacity-90" />
                </motion.div>
              )}

              {showContent && contentType === 'news' && (
                <motion.div className="absolute inset-0 overflow-auto"><News /></motion.div>
              )}

              {showContent && contentType === 'docs' && (
                <motion.div className="absolute inset-0 overflow-auto p-10"><DocsSection /></motion.div>
              )}

              {showContent && contentType === 'nn' && (
                <motion.div className="absolute inset-0 flex items-center justify-center bg-white">
                  <MercadoPagoButton title="Plan Pro" price={30000} email="cliente@test.com" />
   
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
