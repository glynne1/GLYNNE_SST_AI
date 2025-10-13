'use client';

import { motion } from 'framer-motion';

export default function GlynneNewsHeader() {
  return (
    <section className="w-full h-[45vh] bg-white flex flex-col items-center justify-center text-center">
      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-7xl font-extralight tracking-[0.35em] text-gray-900 uppercase"
      >
        GLYNNE NEWS
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        className="mt-4 text-base font-light text-gray-500 tracking-wide"
      >
        Entérate de las tendencias y avances de la inteligencia artificial
      </motion.p>
    </section>
  );
}
