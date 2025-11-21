'use client';

import { useState, useEffect } from 'react';
import ModalInicio from './components/madalInicio';
import ChatLLM from './unifique';
import SideMenu from './components/menuLateral';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Diagnostico() {
  const [datosEmpresa, setDatosEmpresa] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalInicioShown');
    if (!modalShown) {
      setShowModal(true);
      sessionStorage.setItem('modalInicioShown', 'true');
    }

    let intervalId;

    const wakeUpServers = async () => {
      try {
        await fetch('https://glynne-ecosistem.onrender.com', { method: 'GET' });
        await fetch('https://generative-glynne-motor.onrender.com', { method: 'GET' });
        console.log('⚡ Servidores despertados correctamente');
      } catch (error) {
        console.error('❌ Error al despertar servidores:', error);
      } finally {
        setLoading(false);
      }
    };

    wakeUpServers();
    intervalId = setInterval(() => wakeUpServers(), 7 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModalComplete = (datos) => {
    setShowModal(false);
    setDatosEmpresa(datos);
  };

  return (
    <div className="relative h-screen bg-white flex text-black">
      {/* Overlay Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl w-[80vw] max-w-4xl px-6 py-8 flex flex-col items-center"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-center text-black text-2xl sm:text-xl"
              >
                Iniciando servicios
              </motion.h2>

              <Image src="/logo2.png" alt="GLYNNE Logo" width={70} height={70} className="mt-2" />

              <p className="text-center text-gray-800 max-w-[70ch] mt-4 text-sm sm:text-base leading-relaxed">
  Actualmente estamos construyendo y optimizando nuestros procesos de desarrollo para brindarte la mejor experiencia. 
  Este paso inicial puede tardar un minuto mientras aseguramos que todos los servicios de <strong>inteligencia artificial</strong> y procesamiento de manera rápida y confiable.

</p>

              <p className="text-gray-600 mt-2 text-sm">Puede tardar un minuto...</p>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-14 h-14 border-4 border-black border-t-transparent rounded-full mt-6"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menú lateral */}
      <div className="relative top-[40px]">
        <SideMenu />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1">
          <div className="w-full h-full flex flex-col">
            {showModal && !datosEmpresa && <ModalInicio onComplete={handleModalComplete} />}
            {(!showModal || datosEmpresa) && <ChatLLM empresa={datosEmpresa} />}
          </div>
        </div>
      </div>
    </div>
  );
}
