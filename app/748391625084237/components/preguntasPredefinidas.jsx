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
    descripcion: `GLY-AI es un sistema conversacional diseñado para entender tu empresa como si fuera parte de ella. Háblale con naturalidad, como a un compañero de trabajo que estás entrenando. Explica lo que haces, los pasos de tus procesos y cómo te gustaría mejorarlos. Cuanto más contexto compartas, más precisa será la auditoría de automatización.`,
  },
  {
    label: 'Sé específico con tus procesos',
    icon: <FaSearch className="text-[#0f172a] text-lg" />,
    descripcion: `No basta con decir “tenemos problemas con ventas”. Describe el flujo completo: desde cómo llega un cliente hasta cómo cierras la venta. Por ejemplo: “El lead entra por WhatsApp, lo registro en un Excel, después genero cotización en Word y envío por Gmail”. Esa secuencia permite que GLY-AI detecte patrones de cuello de botella y recomiende automatizaciones inteligentes.`,
  },
  {
    label: 'Menciona las herramientas que usas',
    icon: <FaTools className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI necesita saber con qué sistemas trabajas. Puedes mencionar Notion, Gmail, HubSpot, SAP, Airtable, ERPNext, Asana, Google Sheets o cualquier otra plataforma. Esto permite que el sistema proponga integraciones reales con IA, usando conectores nativos o APIs.`,
  },
  {
    label: 'Describe un flujo real de negocio',
    icon: <FaRetweet className="text-[#0f172a] text-lg" />,
    descripcion: `Cuéntale a la IA qué pasa realmente dentro de tu empresa: desde que llega un cliente hasta que se entrega el producto o servicio. Indica quién interviene, qué herramientas usan y qué información se genera en el proceso. GLY-AI transformará esos datos en nodos de automatización.`,
  },
  {
    label: 'Menciona tus dolores y limitaciones',
    icon: <FaExclamationTriangle className="text-[#0f172a] text-lg" />,
    descripcion: `Identifica los puntos donde pierdes tiempo o se cometen errores. Por ejemplo: duplicidad de tareas, falta de seguimiento, o demoras por procesos manuales. GLY-AI analizará estos cuellos de botella y propondrá automatizaciones personalizadas.`,
  },
  {
    label: 'Comparte tus objetivos empresariales',
    icon: <FaChartLine className="text-[#0f172a] text-lg" />,
    descripcion: `¿Buscas escalar, reducir costos, mejorar trazabilidad o aumentar productividad? GLY-AI adapta su análisis según tu meta. Las auditorías no solo muestran problemas, sino también oportunidades de optimización estratégica.`,
  },
  {
    label: 'Comprende cómo funciona la auditoría con IA',
    icon: <FaRobot className="text-[#0f172a] text-lg" />,
    descripcion: `El chat de GLY-AI recolecta datos de forma conversacional. Cada mensaje que envías se convierte en un nodo de conocimiento dentro del modelo. Una vez completa la interacción, se genera automáticamente un documento que consolida la auditoría empresarial, mostrando áreas de mejora y posibles automatizaciones.`,
  },
  {
    label: 'Analiza datos mediante archivos CSV',
    icon: <FaDatabase className="text-[#0f172a] text-lg" />,
    descripcion: `Puedes subir tus bases de datos en formato CSV. GLY-AI procesará los datos, los clasificará en secciones numéricas y no numéricas, generará un análisis completo y visualizará al menos 7 gráficas de tendencias, correlaciones y oportunidades de optimización. Este proceso te muestra cómo los datos respaldan las decisiones de automatización.`,
  },
  {
    label: 'Usa el agente de voz inteligente',
    icon: <FaMicrophone className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI incluye un agente de voz que puede conversar contigo directamente. Puedes hacerle preguntas, pedirle explicaciones o guías de integración en tiempo real. Este asistente no solo habla, sino que entiende la intención detrás de cada consulta, adaptando su tono y respuesta según tu perfil.`,
  },
  {
    label: 'Revisa el documento de auditoría generado',
    icon: <FaFileAlt className="text-[#0f172a] text-lg" />,
    descripcion: `Una vez completada la conversación, GLY-AI genera un documento con los resultados de la auditoría. Este informe incluye una descripción detallada de los procesos, los cuellos de botella identificados, las recomendaciones de automatización y la estructura legal (NIT, razón social y contexto empresarial).`,
  },
  {
    label: 'Explora ideas de integración',
    icon: <FaCogs className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI no se limita a analizar. También propone ideas concretas: cómo conectar herramientas, cómo usar modelos de lenguaje, qué procesos pueden beneficiarse de agentes automáticos o cómo implementar flujos de orquestación entre departamentos.`,
  },
  {
    label: 'Involucra a tu equipo',
    icon: <FaUsersCog className="text-[#0f172a] text-lg" />,
    descripcion: `Puedes permitir que distintos miembros de tu empresa interactúen con GLY-AI. Así el sistema recopila perspectivas diversas y puede detectar conflictos de procesos entre áreas. Cuanto más plural sea el input, más robusto será el diseño de automatización.`,
  },
  {
    label: 'Analiza resultados con visualizaciones',
    icon: <FaChartPie className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI genera dashboards interactivos con métricas clave: tiempos de proceso, incidencias, eficiencia por etapa y oportunidades de reducción de costos. Estas gráficas ayudan a visualizar el impacto que tendría la automatización antes de implementarla.`,
  },
  {
    label: 'Integra todos tus servicios en una sola plataforma',
    icon: <FaCloud className="text-[#0f172a] text-lg" />,
    descripcion: `GLY-AI centraliza todos los servicios: auditoría conversacional, análisis de datos, generación de documentos, comunicación por voz y reportes visuales. Todo ocurre dentro de una única interfaz, permitiendo una experiencia fluida y profesional sin depender de múltiples herramientas externas.`,
  },
  {
    label: 'Transforma la información en acción',
    icon: <FaRetweet className="text-[#0f172a] text-lg" />,
    descripcion: `Cada respuesta que das, cada archivo que subes y cada interacción que tienes con GLY-AI se convierte en conocimiento estructurado. Este conocimiento se traduce en acciones automáticas, integraciones y estrategias que tu empresa puede implementar para evolucionar hacia una organización inteligente.`,
  },
];

export default function InstruccionesAuditoriaCompact() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full max-w-[400px] mx-auto p-4 space-y-4 bg-white shadow-lg border border-gray-200">
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
          <motion.div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="bg-white border border-gray-300 rounded-xl p-3 cursor-pointer hover:shadow-md transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start gap-2 text-sm font-semibold text-gray-700">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POPUP CON BLUR */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-white/40 z-50 flex items-center justify-center px-4"
            onClick={() => setActiveIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white max-w-sm w-full rounded-xl p-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-md font-bold mb-2 text-gray-800">
                {instrucciones[activeIndex].label}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {instrucciones[activeIndex].descripcion}
              </p>
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-2 right-3 text-lg font-bold text-gray-400 hover:text-black"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
