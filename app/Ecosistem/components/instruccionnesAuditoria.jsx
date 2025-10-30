'use client';

import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscoverGlyAI() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* 🔹 Botón principal */}
      <div className="w-full flex justify-center mt-3">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-800 rounded-full text-[11px] md:text-xs shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 ease-out backdrop-blur-sm"
        >
          <span className="relative flex items-center justify-center">
            <Star
              size={12}
              className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-blue-500 bg-clip-text animate-gradient"
            />
            <span className="absolute inset-0 blur-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-blue-500 opacity-70 animate-gradient rounded-full"></span>
          </span>
          <span className="font-medium">Así de fácil, ¿quieres ver?</span>
        </button>
      </div>

      {/* 🔹 Modal con fondo blur */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* Fondo borroso */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setOpenModal(false)}
            />

            {/* Contenedor principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed z-50 top-1/2 left-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 bg-black rounded-2xl shadow-xl border border-gray-800 overflow-hidden flex flex-col md:flex-row"
            >
              {/* 🔸 Botón de cierre */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition z-10"
              >
                <X size={18} className="text-white" />
              </button>

              {/* 🔹 Sección de texto */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-left text-white">
                <h2 className="text-3xl font-semibold mb-6">
                  Auditoría de Procesos Empresariales
                </h2>

                <p className="text-base text-gray-300 leading-relaxed mb-5">
                  Esta conversación marca el inicio de tu{' '}
                  <strong className="text-white">auditoría inteligente</strong>.
                  Nuestro asesor virtual analizará tus respuestas para entender
                  cómo opera tu empresa, identificar cuellos de botella y detectar
                  oportunidades de automatización con inteligencia artificial.
                </p>

                <p className="text-base text-gray-300 leading-relaxed mb-5">
                  A medida que compartas información, la IA irá{' '}
                  <strong className="text-white">recolectando datos clave</strong> sobre tus
                  procesos, recursos, herramientas y desafíos internos.  
                  Con base en ello, construirá un{' '}
                  <strong className="text-white">análisis técnico y estratégico</strong>
                  para definir soluciones iniciales que luego serán estudiadas junto con{' '}
                  <span className="text-white font-semibold">GLYNNE</span>.
                </p>

                <p className="text-sm text-gray-400 italic mb-6">
                  Recomendación: responde de manera natural y detallada.  
                  Cuanta más información compartas, más precisa será la auditoría.
                </p>

                <div>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-6 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    Entendido
                  </button>
                </div>
              </div>

              {/* 🔹 Sección de imagen con logo centrado */}
              <div className="w-full md:w-1/2 h-[40vh] md:h-full relative flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/1200x/3b/47/6d/3b476dac38d41083a642121a6c69ebb7.jpg"
                  alt="Auditoría inteligente"
                  className="w-full h-full object-cover rounded-r-2xl"
                />
                {/* Logo centrado sobre la imagen */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.img
                    src="/logo.png" // 🔁 reemplázalo por tu logo
                    alt="Logo GLYNNE"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-28 md:w-36 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔸 Animación tornasol */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </>
  );
}
