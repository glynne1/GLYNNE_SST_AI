'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ModelEx from './modelos'; // <-- Importa tu componente aquí

export default function TextSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      className="w-full min-h-[55vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal sin animaciones de scroll */}
      <div className="relative z-10 max-w-4xl text-center">
        {/* Texto explicativo */}
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Con GLYNNE Framework, incorporar modelos de inteligencia artificial avanzados es fácil y rápido. 
          Solo personaliza la personalidad, el rol y el modelo de tu agente, y estará listo para integrarse directamente en tus procesos o plataformas. 
          Nuestra herramienta hace accesible la IA para developers, simplificando el desarrollo y la implementación de soluciones inteligentes sin código complejo.
        </p>

        {/* Botón para abrir modal */}
        <motion.button
          onClick={() => setModalOpen(true)}
          className="relative px-12 py-3 text-sm md:text-base font-semibold 
                     bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
                     text-white overflow-hidden rounded-xl group transition-all duration-300 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10 font-medium">
            Abrir GLYNNE Framework
          </span>
        </motion.button>

        {/* Nota final */}
        <p className="text-gray-400 text-xs md:text-sm mt-4">
          Haz click para ver más detalles
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Componente interno */}
            <div className="h-full">
              <ModelEx />
            </div>

            {/* Botón de cierre */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 px-4 py-2 font-semibold bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
