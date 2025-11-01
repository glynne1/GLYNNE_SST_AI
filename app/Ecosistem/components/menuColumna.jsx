'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, X, CircuitBoard } from 'lucide-react';

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
  const [hoverMenu, setHoverMenu] = useState(false);

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
   
    { 
      type: 'docs', 
      title: 'Crea tu propio Agente de IA', 
      description: `Con GLYNNE FRAMEWORK contaras con una arquitectura completa que sera el motor de cada agentes de IA, ajustando solo su 
      personalidad, integralos fácil y rápido en  cualquier stack tecnologico o experiencia digital, 
     `,
      bg: '/GFWIMGCARD.jpg' 
    },
    { 
      type: 'nn', 
      title: 'Mira cómo funciona una IA desde cero', 
      description: `Explora cómo funciona un GPT (Large Language Model). 
      La IA no es magia: es matemática y arquitectura moderna visualizada para entenderla desde dentro.`,
      bg: '/redIMG.jpg' 
    },
    { 
      type: 'documentacion', 
      title: 'Documentación Completa GLYNNE Framework', 
      description: `Accede a la guía completa del ecosistema GLYNNE: 
      arquitectura, agentes, automatización y nodos inteligentes para construir sistemas autónomos.`,
      bg: '/documentacionIMG.jpg' 
    },
    { 
      type: 'news', 
      title: 'Conoce quiénes son GLYNNE', 
      description: `Explora nuestra identidad como empresa, nuestros principios 
      y la visión que impulsa GLYNNE hacia un futuro donde la IA y la arquitectura 
      tecnológica transforman industrias.`,
      bg: '/perfilCardF.jpg' 
    }
  ];
  
  
  return (
    <>
      {/* Left floating menu */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 w-15 flex flex-col items-center justify-center space-y-6 
        ${popupOpen ? 'pointer-events-none opacity-40' : ''} z-30`}
      >
        {/* CircuitBoard Icon */}
        <motion.div
          onMouseEnter={() => !popupOpen && setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          whileHover={{ scale: 1.15, rotate: 8 }}
          className="cursor-pointer"
        >
          <CircuitBoard className="w-6 h-6 text-gray-700 hover:text-black transition-all" />
        </motion.div>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="p-2 rounded-md hover:scale-110 transition-all"
        >
          <RefreshCcw className="w-5 h-5 text-gray-500 hover:text-black" />
        </button>
      </div>

     {/* Hover Sidebar */}
<AnimatePresence>
  {hoverMenu && !popupOpen && (
    <motion.div
      initial={{ x: "-20%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-20%", opacity: 0 }}
      className="fixed left-0 top-0 h-screen w-[40vw] bg-white/90 backdrop-blur-xl shadow-xl border-r border-gray-200 
                 z-20 flex flex-row items-center justify-between p-12"
      onMouseEnter={() => setHoverMenu(true)}
      onMouseLeave={() => setHoverMenu(false)}
    >

      {/* Cards Column (90% width) */}
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

   {/* Info Column (actualizado) */}
<div className="flex flex-col  ml-[30px] justify-center items-center h-[70vh] w-[200px] p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg text-gray-800">

{/* Logo Superior */}
<img 
  src="/logo2.png" 
  alt="GLYNNE Logo" 
  className="w-20 h-auto mb-2"
/>

<p className="text-[10px] text-center opacity-80 tracking-wide leading-snug mb-6">
  Aprende y adáptate a la era IA
</p>

{/* --- NUEVA SECCIÓN EN EL CENTRO --- */}
<div className="flex flex-col items-center justify-center flex-grow">
  {/* 🔹 Título sobre el QR */}
  <h2 className="text-sm font-semibold mb-2 text-gray-900 tracking-wide">
    QR GLY MV
  </h2>

  <img 
    src="/qrMenuH.png"
    alt="GLYNNE Mobile"
    className="w-24 h-auto mb-2"
  />

  <p className="text-[10px] text-center font-medium opacity-90">
    visita GLYNNE mobile
  </p>
</div>
{/* --- FIN NUEVA SECCIÓN --- */}

{/* Footer */}
<div className="text-[9px] font-medium text-gray-600 opacity-70 tracking-wider text-center mt-4">
  © GLYNNE 2025 - IA MCP
</div>
</div>


    </motion.div>
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
                  <img src="/logo2.png" alt="Logo" className="w-20 h-20 opacity-90" />
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
                  <TransformerAnimation />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
