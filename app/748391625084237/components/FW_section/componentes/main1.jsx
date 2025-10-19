'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 ">
      {/* Texto centrado */}
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* Título grande con espaciado entre letras */}
        <motion.h2
          className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          GLYNNE <span className="text-blue-400">FRAMEWORK</span>
        </motion.h2>

        {/* Texto explicativo más pequeño */}
        <motion.p
          className="text-gray-200 text-sm md:text-base lg:text-base leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          GLYNNE Framework te da el control total: conecta modelos LLM conversacionales a tus proyectos,
          personalízalos a nivel de comportamiento y estilo, y despliega automatizaciones directamente en tu plataforma.
          Sin reinventar la rueda, sin escribir código complejo: solo configura y potencia tus agentes inteligentes.
        </motion.p>

        {/* Botón principal con degradado elegante */}
        <motion.a
          href="/GLYNNE_FW.zip"
          download
          className="relative px-12 py-3 text-sm md:text-base font-semibold 
                     bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800
                     text-white shadow-xl overflow-hidden rounded-xl group transition-all duration-300 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Reflejo de barrido de luz */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10 font-medium">
            Descargar GLYNNE Framework - versión para MacOS
          </span>
        </motion.a>

        {/* Texto debajo del botón */}
        <motion.p
          className="text-gray-400 text-xs md:text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          abre con click derecho / open
        </motion.p>
      </motion.div>
    </section>
  );
}
