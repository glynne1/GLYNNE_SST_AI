'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLightbulb,
  FaSearch,
  FaTools,
  FaRetweet,
  FaExclamationTriangle,
  FaChartLine,
  FaRobot,
  FaDatabase,
  FaHeadset,
  FaFileAlt,
  FaMicrophone,
  FaUsersCog,
  FaCogs,
  FaChartPie,
  FaCloud,
} from 'react-icons/fa';

const instrucciones = [
  {
    label: 'Habla como si fuera tu colega',
    icon: <FaLightbulb className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI es un sistema conversacional diseñado para entender tu empresa como si fuera parte de ella. Háblale con naturalidad, como a un compañero de trabajo que estás entrenando. Explica lo que haces, los pasos de tus procesos y cómo te gustaría mejorarlos.`,
  },
  {
    label: 'Sé específico con tus procesos',
    icon: <FaSearch className="text-[#0f172a] text-lg" />,
    descripcion: `No basta con decir “tenemos problemas con ventas”. Describe el flujo completo: desde cómo llega un cliente hasta cómo cierras la venta. Por ejemplo: “El lead entra por WhatsApp, lo registro en un Excel, después genero cotización en Word y envío por Gmail”.`,
  },
  {
    label: 'Menciona las herramientas que usas',
    icon: <FaTools className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI necesita saber con qué sistemas trabajas. Puedes mencionar Notion, Gmail, HubSpot, SAP, Airtable, ERPNext, Asana, Google Sheets o cualquier otra plataforma.`,
  },
  {
    label: 'Describe un flujo real de negocio',
    icon: <FaRetweet className="text-[#0f172a] text-lg" />,
    descripcion: `Cuéntale a la IA qué pasa realmente dentro de tu empresa: desde que llega un cliente hasta que se entrega el producto o servicio.`,
  },
  {
    label: 'Menciona tus dolores y limitaciones',
    icon: <FaExclamationTriangle className="text-[#0f172a] text-lg" />,
    descripcion: `Identifica los puntos donde pierdes tiempo o se cometen errores. Por ejemplo: duplicidad de tareas, falta de seguimiento, o demoras por procesos manuales.`,
  },
  {
    label: 'Comparte tus objetivos empresariales',
    icon: <FaChartLine className="text-[#0f172a] text-lg" />,
    descripcion: `¿Buscas escalar, reducir costos, mejorar trazabilidad o aumentar productividad? GLY-AI adapta su análisis según tu meta.`,
  },
];

export default function InstruccionesAuditoriaCompact() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto p-4 space-y-4 bg-white shadow-lg border border-gray-200 rounded-xl">
      <motion.h2
        className="text-lg font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Haz más efectiva tu auditoría con GLY-AI
      </motion.h2>

      <p className="text-sm text-gray-500 text-center">
        Estas recomendaciones te ayudarán a aprovechar todo el potencial de GLY-AI y entender cómo tu empresa puede
        evolucionar hacia un ecosistema automatizado e inteligente.
      </p>

      <div className="flex flex-col gap-3">
        {instrucciones.map((item, index) => (
          <div key={index}>
            <motion.div
              onClick={() => toggleItem(index)}
              className={`bg-white border border-gray-300 rounded-xl p-3 cursor-pointer hover:shadow-md transition ${
                activeIndex === index ? 'border-blue-500 shadow-sm' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  ▼
                </motion.span>
              </div>
            </motion.div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 text-sm text-gray-600 border border-t-0 border-gray-200 rounded-b-xl bg-white">
                    {item.descripcion}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
