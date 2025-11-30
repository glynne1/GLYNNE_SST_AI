'use client';

import { FaBrain, FaChartLine, FaNetworkWired } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <FaBrain />,
    title: 'Crear Agentes desde 0',
    description: 'Aprende a usar el panel de desarrollo de GLYNNE IA y crear agentes inteligentes gratuitos.',
    video: "https://www.youtube.com/embed/cbLwAJ5lQjE",
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Crea y gestiona agentes IA desde el panel de desarrollo</h3>
        <p className="mb-3">
          En este tutorial aprenderás cómo funciona el panel de desarrollo IA de GLYNNE, donde podrás crear agentes desde cero,
          asignarles roles, capacidades, memoria, y preparar modelos listos para integrarse en apps reales.
        </p>
        <p className="mb-3">
          Todo el proceso es completamente gratuito y está diseñado para que desarrolladores puedan conectar sus agentes
          a cualquier producto digital sin depender de terceros.
        </p>
      </>
    ),
  },
  {
    icon: <FaNetworkWired />,
    title: 'Framework GLYNNE',
    description: 'Tutorial completo para instalar y usar el framework open source GLYNNE.',
    video: "https://www.youtube.com/embed/P7a-F1oARhs",
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Instalación y uso del Framework GLYNNE IA</h3>
        <p className="mb-3">
          En este video aprenderás a descargar e instalar el ecosistema GLYNNE IA, el framework open source diseñado
          para desarrollo de inteligencia artificial al estilo de React o Next.js, pero enfocado en agentes, modelos
          y automatización inteligente.
        </p>
        <p className="mb-3">
          Con GLYNNE Framework obtienes un entorno completo para crear proyectos IA listos para producción,
          integrando tus agentes creados en el panel con solo unas líneas de código.
        </p>
      </>
    ),
  },
  {
    icon: <FaChartLine />,
    title: 'Proyecto Pre-construido',
    description: 'Clona un proyecto listo, conectado al ecosistema IA de GLYNNE.',
    video: "https://www.youtube.com/embed/Ig15k7ctjTI",
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Proyecto listo para usar con GLYNNE IA</h3>
        <p className="mb-3">
          Este tutorial explica cómo clonar un proyecto preestablecido desarrollado en Next.js y preparado
          para conectarse directamente con tus modelos creados desde el panel de GLYNNE.
        </p>
        <p className="mb-3">
          Solo necesitas clonar el repositorio y comenzar a construir tu aplicación: el motor GLYNNE IA ya está integrado,
          permitiendo usar tus agentes, llamadas al motor y capacidades avanzadas sin configuración extra.
        </p>
      </>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServiceCards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const openModal = (service) => {
    setActiveService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveService(null);
  };

  return (
    <div className="w-full flex justify-center mt-[30px] px-2 sm:px-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[80%]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-200 p-3 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => openModal(service)}
          >
            <div className="mb-3 text-gray-400 text-3xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] bg-left animate-shine p-2 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-1">
              {service.title}
            </h3>
            <p className="text-gray-600 text-xs leading-snug">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && activeService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 backdrop-blur-sm"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative">
                
                {/* BOTÓN CERRAR */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold transition"
                >
                  ×
                </button>

                {/* HEADER */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="text-5xl text-indigo-600 mb-3">{activeService.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{activeService.title}</h2>
                  <p className="text-gray-500 text-sm max-w-lg">{activeService.description}</p>
                </div>

                {/* VIDEO */}
                <div className="w-full mb-6">
                  <iframe
                    className="w-full h-64 rounded-lg"
                    src={activeService.video}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* TEXTO */}
                <div className="text-gray-700 text-base leading-relaxed space-y-3 text-justify">
                  {activeService.content}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-shine {
          background-position: -200% 0;
          animation: shine 2s infinite linear;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
