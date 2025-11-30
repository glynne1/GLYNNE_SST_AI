'use client';

import { FaBrain, FaChartLine, FaNetworkWired, FaUserFriends, FaDatabase, FaRobot, FaInfinity } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <FaBrain />,
    title: 'Quiénes Somos',
    description: 'GLYNNE crea arquitecturas de software B2B adaptadas a cada empresa.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Gestión integral de sistemas empresariales</h3>
        <p className="mb-3">
          En GLYNNE diseñamos, implementamos y gestionamos arquitecturas de software que integran Inteligencia Artificial en todos los niveles de la empresa. No entregamos herramientas genéricas: construimos sistemas que se ajustan a la infraestructura existente, conectando procesos y equipos en una solución completa.
        </p>
        <p className="mb-3">
          Cada proyecto es personalizado, modular y escalable, asegurando que la IA pueda supervisar, optimizar y automatizar flujos sin necesidad de modificar toda la plataforma ni depender de terceros.
        </p>
      </>
    ),
  },
  {
    icon: <FaNetworkWired />,
    title: 'Arquitectura Integrada',
    description: 'Creamos estructuras de software adaptables, que interconectan todos los procesos de tu empresa.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Sistemas modulares gestionados con IA</h3>
        <p className="mb-3">
          GLYNNE desarrolla arquitecturas de software que actúan como un motor central de gestión, capaz de supervisar todos los procesos de la empresa. Cada módulo se integra, se comunica y se adapta a los sistemas existentes, permitiendo automatización y análisis sin interferir con la operación actual.
        </p>
        <p className="mb-3">
          Nuestra aproximación asegura soluciones transversales: se pueden crear distintos niveles de gestión según la complejidad de los procesos que la empresa quiera supervisar, optimizar o automatizar con IA.
        </p>
      </>
    ),
  },
  {
    icon: <FaChartLine />,
    title: 'Auditoría Inteligente',
    description: 'Analizamos cada flujo y proceso para construir sistemas de software efectivos y adaptados.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Auditoría y diagnóstico integral de procesos</h3>
        <p className="mb-3">
          Antes de diseñar cualquier arquitectura, GLYNNE realiza auditorías profundas de los procesos empresariales, entendiendo cómo interactúan equipos, sistemas y datos. Esta evaluación permite crear soluciones de software que encajan perfectamente en la operación actual.
        </p>
        <p className="mb-3">
          Con la IA, cada diagnóstico se convierte en un plan de acción automatizado y adaptativo que optimiza flujos, detecta ineficiencias y genera una estructura de software capaz de evolucionar con la empresa.
        </p>
      </>
    ),
  },
  {
    icon: <FaUserFriends />,
    title: 'Procesos y Adaptación',
    description: 'Personalizamos la arquitectura de software según los niveles, áreas y metas de tu empresa.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Adaptación inteligente a tu operación</h3>
        <p className="mb-3">
          GLYNNE entiende que cada empresa tiene sus particularidades. Por eso, diseñamos sistemas que se adaptan a distintos niveles de gestión, departamentos y objetivos, integrando la Inteligencia Artificial para supervisar y mejorar procesos específicos sin alterar la infraestructura existente.
        </p>
        <p className="mb-3">
          La solución no es genérica: se personaliza según la cultura, las necesidades y los flujos de trabajo, creando un sistema de gestión transversal y escalable.
        </p>
      </>
    ),
  },
  {
    icon: <FaDatabase />,
    title: 'Inteligencia de Datos',
    description: 'Transformamos la información de tu empresa en decisiones automáticas y accionables.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Conexión de datos y automatización estratégica</h3>
        <p className="mb-3">
          GLYNNE organiza y analiza los datos operativos, estratégicos y humanos para integrarlos en la arquitectura de software. La Inteligencia Artificial genera insights y recomendaciones que permiten tomar decisiones rápidas y precisas sin depender de herramientas externas.
        </p>
        <p className="mb-3">
          Cada análisis se vincula con los agentes del sistema, que ejecutan acciones automáticas, optimizan procesos y mantienen la coherencia del flujo empresarial en tiempo real.
        </p>
      </>
    ),
  },
  {
    icon: <FaRobot />,
    title: 'Automatización Total',
    description: 'Agentes que supervisan, gestionan y optimizan todos los procesos sin intervención externa.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Motor de gestión autónomo con IA</h3>
        <p className="mb-3">
          Los agentes de GLYNNE ejecutan tareas de supervisión, análisis y optimización en todos los niveles de la empresa. La arquitectura se encarga de que cada acción sea consistente, coherente y ajustada a la operación existente.
        </p>
        <p className="mb-3">
          Esta integración permite que la empresa tenga un sistema completo, modular y escalable, capaz de evolucionar sin depender de proveedores externos ni herramientas genéricas.
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
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-1">{service.title}</h3>
            <p className="text-gray-600 text-xs leading-snug">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

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
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold transition"
                >
                  ×
                </button>

                {/* ÍCONO EN GRIS */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="text-5xl text-gray-600 mb-3">{activeService.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{activeService.title}</h2>
                  <p className="text-gray-500 text-sm max-w-lg">{activeService.description}</p>
                </div>

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
