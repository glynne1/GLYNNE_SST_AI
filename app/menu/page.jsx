'use client';

import React, { useEffect, useState } from 'react';
import Menu from '../menu/components/menu';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const wakeUpServers = async () => {
      try {
        await Promise.all([
          fetch('https://gly-ai-brain.onrender.com', { method: 'GET' }),
          fetch('https://gly-tts-back.onrender.com/conversar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: 'ping' })
          }),
          fetch('https://gly-csv-service-3.onrender.com', { method: 'GET' })
        ]);
        console.log('Servicios despertados correctamente');
      } catch (error) {
        console.error('Error al despertar los servicios:', error);
      } finally {
        setLoading(false);
      }
    };

    wakeUpServers();
    intervalId = setInterval(() => wakeUpServers(), 7 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-black p-0 m-0 relative flex flex-col text-white">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://i.pinimg.com/1200x/86/e6/3b/86e63b7ecc219abdb316f02dce2af3ac.jpg')",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay negro semitransparente sobre todo el fondo para dar contraste */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Contenedor de texto semi-transparente */}
            <motion.div
              className="relative bg-black/40 rounded-3xl shadow-2xl w-[80vw] max-w-4xl px-[4vw] py-[5vh] flex flex-col items-center z-10"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-center text-white"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.3rem)',
                  lineHeight: '1.3',
                }}
              >
                Iniciando servicios
              </motion.h2>

              <Image
                src="/logo.png"
                alt="GLYNNE Logo"
                width={70}
                height={70}
                className="mt-2"
              />

              <p
                className="text-center text-gray-300 max-w-[70ch] mt-4"
                style={{
                  fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                  lineHeight: '1.6',
                }}
              >
                Estamos preparando los sistemas para que la experiencia sea rápida y estable.
                Este paso inicial conecta con nuestros servicios de <strong>inteligencia artificial</strong> 
                y procesamiento de voz antes de comenzar.
              </p>
              <br />
              <p className="text-gray-300">Puede tardar un minuto...</p>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-14 h-14 border-4 border-white border-t-transparent rounded-full mt-6"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Menu />
    </div>
  );
}
