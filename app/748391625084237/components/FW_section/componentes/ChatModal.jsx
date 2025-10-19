'use client';

import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatFW from './ChatFW'; // <-- Importa tu componente

export default function DiscoverGlyAI() {
  const [openModal, setOpenModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationCount(prev => prev + 1);
      setShowNotification(true);

      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 10000); // 10 segundos

      return () => clearTimeout(timeout);
    }, 2 * 60 * 1000); // cada 2 minutos

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    setShowNotification(false);
  };

  return (
    <>
      <div className="w-full flex justify-center mt-3 relative">
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-1.5 px-6 py-2 bg-white text-gray-800 rounded-full text-sm md:text-base shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 ease-out backdrop-blur-sm w-[80%] max-w-[600px] justify-center relative"
        >
          <span className="relative flex items-center justify-center">
            <Star
              size={16}
              className="text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-blue-500 bg-clip-text animate-gradient"
            />
            <span className="absolute inset-0 blur-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-blue-500 opacity-70 animate-gradient rounded-full"></span>
          </span>
          <span className="font-medium">Así de fácil, ¿quieres ver?</span>

          {showNotification && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[0.65rem] font-bold flex items-center justify-center rounded-full">
              {notificationCount}
            </div>
          )}
        </button>
      </div>

      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setOpenModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed z-50 top-1/2 left-1/2 w-[90%] h-[100%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-gray-800 overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition z-10"
              >
                <X size={18} className="text-white" />
              </button>

              {/* Aquí insertamos el ChatFW */}
              <div className="w-full h-full flex items-center justify-center">
                <ChatFW />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </>
  );
}
