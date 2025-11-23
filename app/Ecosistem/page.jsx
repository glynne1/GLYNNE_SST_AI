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

  // 👉 Nuevo modal para pantallas pequeñas
  const [showMobileModal, setShowMobileModal] = useState(false);

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

        // 👉 Detecta pantalla menor a 800px SOLO cuando ya cargó todo
        if (window.innerWidth < 800) {
          setShowMobileModal(true);
        }
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

      {/* 👉 Modal bloqueo móvil */}
      <AnimatePresence>
        {showMobileModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-white p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white w-[85vw] max-w-md rounded-2xl p-6 text-center shadow-lg border border-gray-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-black">
                Esta plataforma solo está disponible para escritorio
              </h2>

              <p className="mt-3 text-gray-700">
                Estamos trabajando en nuestra app móvil.  
                ¡Gracias por ver el video!
              </p>

              <Image src="/logo2.png" alt="GLYNNE Logo" width={60} height={60} className="mx-auto mt-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
  Estamos trabajando en nuestra aplicación móvil para ofrecerte una experiencia aún más completa. 
  Por ahora, esta plataforma está disponible únicamente en versión desktop. 
  Gracias por tu paciencia — muy pronto lanzarás tus agentes de inteligencia artificial también desde tu dispositivo móvil.
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
