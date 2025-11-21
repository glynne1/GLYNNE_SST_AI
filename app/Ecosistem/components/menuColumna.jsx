'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, X } from 'lucide-react';

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

  const logoTimerRef = useRef(null);
  const contentTimerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/menuTono.mp3');
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
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const openService = (type) => {
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

  const handleClosePopup = () => {
    clearTimeout(logoTimerRef.current);
    clearTimeout(contentTimerRef.current);
    setPopupOpen(false);
    setContentType(null);
    setShowLogo(false);
    setShowContent(false);
  };

  if (!isVisible) return null;

  // === CARDS ===
  const iconData = [
    {
      type: 'news',
      title: 'Da click aqui y desarrolla tu IA',
      description: 'Accede al entorno donde se crean y personalizan tus modelos de inteligencia artificial.',
      icon: '/yoAvatar.png'
    },
    {
      type: 'docs',
      title: 'Explora e instala nuestro Framework aqui!',
    },
  ];

  return (
    <>
      {/* 🟦 MENÚ LATERAL */}
      <div
        className="fixed left-0 top-0 h-screen w-[22%] bg-white text-gray-900 
        flex flex-col justify-center  p-6 z-0 border-r border-gray-200"
      >

        {/* === 🔵 TÍTULO AGREGADO === */}
        <h2 className="text-lg font-bold mt-[0px] text-gray-900 mb-6 text-center">
      
        </h2>





        {/* LISTA DE CARDS */}
        <div className="space-y-6 mt-[150px] mb-6 flex flex-col items-center w-full">
        <div className="absolute mt-[12%] -top-12 flex justify-center w-full">
    <img
      src="/logo4.png"
      className="w-38 h-38 md:w-32 md:h-32 drop-shadow-2xl rounded-full object-cover"
      alt="Logo"
    />
  </div>
          {iconData.map((item, index) => (
            
            <motion.div
              key={item.type}
              onClick={() => openService(item.type)}
              whileHover={{ scale: 1.03 }}
              className={`cursor-pointer rounded-xl bg-white relative shadow-md border border-gray-200 group p-4
                w-full flex flex-col items-center justify-center
                ${index === 0 ? 'h-40' : 'h-auto py-4'}
              `}
            >

              
              {index === 0 && (
               <div className="absolute -top-10 flex justify-center w-full">
               {/* === AVATAR === */}
               <div className="relative flex justify-center">
                 <img
                   src={item.icon}
                   className="w-44 h-44 drop-shadow-2xl -mt-[100px] rounded-full object-cover"
                 />
             
                 {/* === 🟢 LUZ VERDE SIEMPRE PRENDIDA — SOLO TAILWIND === */}
                 <div className="absolute -right-1 top-6 flex items-center justify-center">
             
                   {/* AURA / PULSO SUAVE */}
                   <span
                     className="
                       absolute w-6 h-6 bg-green-400 rounded-full 
                       opacity-70 
                       animate-ping
                     "
                   ></span>
             
                   {/* PUNTO CENTRAL */}
                   <span
                     className="
                       relative w-2.5 h-2.5 bg-green-500 rounded-full 
                       shadow-[0_0_8px_rgba(34,197,94,0.8)]
                     "
                   ></span>
             
                 </div>
               </div>
             </div>
             
              )}

              <h3
                className={`text-xs font-semibold text-gray-900 text-center 
                ${index === 0 ? 'mt-10' : 'mt-2'}`}
              >
                {item.title}
              </h3>

              <p className="text-[10px] text-gray-600 text-center mt-1">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

        {/* === 🔵 QR DEBAJO DE LAS CARDS === */}
        <div className="flex flex-col items-center mt-4">
          
          {/* Texto arriba del QR */}
          <p className="text-[9px] text-gray-700 mb-1 text-center">
            Escanea para acceder rápido
          </p>

          {/* Imagen del QR */}
          <img
            src="/qrMenuH.png"   // ← CAMBIA A TU ARCHIVO REAL
            className="w-28 h-28 rounded-md shadow-md"
            alt="QR acceso"
          />

          {/* Texto abajo del QR */}
          <p className="text-[8px] text-gray-500 mt-1 text-center">
            Disponible para dispositivos móviles
          </p>

        </div>

      </div>

      {/* POPUP */}
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
                <motion.div className="absolute inset-0 overflow-auto">
                  <News />
                </motion.div>
              )}

              {showContent && contentType === 'docs' && (
                <motion.div className="absolute inset-0 overflow-auto p-10">
                  <DocsSection />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
