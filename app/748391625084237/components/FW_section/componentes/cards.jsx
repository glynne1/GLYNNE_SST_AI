'use client';

import { FaMicrochip, FaBolt, FaRocket, FaDatabase, FaCogs, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <FaBolt />,
    title: 'Automatización Inteligente',
    description: 'GLYNNE orquesta tareas, sistemas y agentes con total autonomía.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Automatización Inteligente y Escalable</h3>
        <p className="mb-3">
          El Framework GLYNNE permite construir ecosistemas donde los procesos se ejecutan solos.
          Los agentes se comunican entre sí, toman decisiones simples y ejecutan acciones sin intervención humana,
          reduciendo costos operativos y tiempos de respuesta.
        </p>
        <p className="mb-3">
          <strong>Arquitectura modular:</strong>  
          Cada automatización se compone de nodos conectables que pueden integrarse con APIs, servicios externos o sistemas internos.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Aumenta la productividad al eliminar tareas repetitivas y mejorar la trazabilidad del flujo empresarial.
        </p>
      </>
    ),
  },
  {
    icon: <FaRocket />,
    title: 'Predicción Estratégica',
    description: 'El framework anticipa patrones y sugiere acciones preventivas.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Predicción de Comportamiento y Demanda</h3>
        <p className="mb-3">
          GLYNNE incorpora modelos de IA que analizan el comportamiento histórico de clientes, ventas y procesos,
          para anticipar eventos y sugerir respuestas automáticas.
        </p>
        <p className="mb-3">
          <strong>Ejemplo:</strong>  
          Un agente de análisis detecta variaciones de demanda y ajusta automáticamente la producción o la estrategia comercial.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Decisiones proactivas basadas en datos en tiempo real, impulsando eficiencia y reducción de errores humanos.
        </p>
      </>
    ),
  },
  {
    icon: <FaMicrochip />,
    title: 'Optimización Continua',
    description: 'Cada flujo aprende y mejora de manera autónoma.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Optimización Dinámica de Flujos</h3>
        <p className="mb-3">
          GLYNNE no solo ejecuta procesos, los analiza y los mejora con el tiempo.  
          Cada módulo aprende del comportamiento del sistema y aplica ajustes automáticos para maximizar la eficiencia.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Disminuye tiempos de ejecución, costos de procesamiento y redundancias operativas.
        </p>
      </>
    ),
  },
  {
    icon: <FaCogs />,
    title: 'Auditorías Autónomas',
    description: 'Evaluaciones automáticas que mejoran la calidad del sistema.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Auditorías Inteligentes del Ecosistema</h3>
        <p className="mb-3">
          Los agentes auditores del framework revisan arquitecturas, integraciones y código en busca de ineficiencias,
          vulnerabilidades o cuellos de botella.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Garantiza estabilidad, seguridad y escalabilidad sin necesidad de monitoreo manual constante.
        </p>
      </>
    ),
  },
  {
    icon: <FaDatabase />,
    title: 'Inteligencia de Datos',
    description: 'Centraliza, limpia y transforma los datos en conocimiento accionable.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Gestión Inteligente de la Información</h3>
        <p className="mb-3">
          GLYNNE unifica fuentes de datos dispersas en un núcleo inteligente,
          capaz de limpiar, analizar y extraer patrones útiles para la toma de decisiones.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Transforma datos en decisiones estratégicas, fortaleciendo la visión global de la empresa.
        </p>
      </>
    ),
  },
  {
    icon: <FaRobot />,
    title: 'Respuestas Autónomas',
    description: 'Agentes que reaccionan al instante ante cambios o eventos del entorno.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Agentes Reactivos y Adaptativos</h3>
        <p className="mb-3">
          Los agentes del Framework GLYNNE responden a eventos en tiempo real, adaptándose a variaciones de datos,
          solicitudes externas o condiciones del entorno sin intervención humana.
        </p>
        <p className="mb-3">
          <strong>Beneficio:</strong>  
          Sistemas resilientes y adaptativos que reaccionan en segundos ante cualquier situación.
        </p>
      </>
    ),
  },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

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

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="text-5xl text-orange-500 mb-3">{activeService.icon}</div>
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
