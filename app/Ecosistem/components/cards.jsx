'use client';

import { FaBrain, FaChartLine, FaNetworkWired } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <FaBrain />,
    title: 'Automatización Real, Sin Código',
    description: 'Tu equipo pierde horas en tareas repetitivas. Conviértelas en agentes IA que sincronizan datos, responden clientes y actualizan sistemas 24/7, sin escribir una línea de código.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">De la idea a la automatización en 7 días</h3>
        <p className="mb-3">
          Conectamos directamente a tus herramientas (WhatsApp Business, Gmail, ERP, base de datos). 
          Nuestro motor mapea el proceso, crea el agente y lo pone a trabajar. No necesitas documentación técnica ni un equipo de desarrollo.
        </p>
        <p className="mb-3">
          Resultado: procesos que antes demoraban 3 horas diarias ahora se ejecutan en 3 minutos, sin errores humanos.
        </p>
      </>
    ),
  },
  {
    icon: <FaNetworkWired />,
    title: 'Cómo Funciona: De Tu Proceso a Tu Agente',
    description: 'En 3 pasos: 1) Nuestro auditor IA entrevista a tu equipo (2h), 2) Genera un plan técnico automatizado, 3) Desplegamos agentes listos para producción.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">No empezamos desde cero, empezamos desde tu operación</h3>
        <p className="mb-3">
          El auditor GLY-IA se conecta a tus sistemas, revisa logs, entrevista a clave en lenguaje natural y 
          produce un JSON que nuestro despliegue automatiza en minutos.
        </p>
        <p className="mb-3">
          Cada agente es un microservicio: escalable, con trazabilidad completa y validación de seguridad automática.
          Si algo falla, el sistema te avisa con contexto para que decidas, sin sorpresas.
        </p>
      </>
    ),
  },
  {
    icon: <FaChartLine />,
    title: 'Resultados Medibles en 30 Días',
    description: 'Reduce tiempos de respuesta 70%, elimina errores de sincronización y libera a tu equipo para tareas de valor. Monitorea todo en un dashboard con métricas de negocio, no técnicas.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">De la auditoría al ROI en un mes</h3>
        <p className="mb-3">
          Nuestro sistema no solo audita: implementa, ejecuta y mide. Ves cuánto tiempo se ahorra, cuántos errores se eliminan 
          y cuánto dinero ahorras, por proceso automatizado.
        </p>
        <p className="mb-3">
          Clientes miden: -40% en costos operativos, -80% en tiempo de onboarding de procesos, +99% de precisión en sincronización de datos.
          La auditoría es solo el inicio; la métrica de negocio es el resultado final.
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[120%]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-300 p-3 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => openModal(service)}
          >
            <div className="mb-3 text-gray-500 text-3xl p-2 rounded-full">
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
              className="fixed inset-0 z-40 bg-gray-200/40 backdrop-blur-sm"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-50 rounded-2xl shadow-md w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold transition"
                >
                  ×
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="text-5xl text-gray-500 mb-3">{activeService.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">{activeService.title}</h2>
                  <p className="text-gray-600 text-sm max-w-lg">{activeService.description}</p>
                </div>

                <div className="text-gray-700 text-base leading-relaxed space-y-3 text-justify">
                  {activeService.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
