'use client';
import NewsPerdil from './newsPerfil'
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
  FaComments,
  FaFileAlt,
  FaUsers,
  FaCogs,
  FaMicrophone,
  FaRocket,
  FaGlobe,
} from 'react-icons/fa';

const instrucciones = [
  {
    label: 'Habla como si fuera tu colega',
    icon: <FaLightbulb className="text-[#0f172a] text-base" />,
    descripcion: `GLY-AI es tu colega digital. Háblale con naturalidad y explícale tus procesos empresariales como si estuvieras entrenando a un nuevo miembro del equipo. Cuanto más contexto le des, más precisa será su asesoría.`,
  },
  {
    label: 'Modo Talento Humano',
    icon: <FaUsers className="text-[#0f172a] text-base" />,
    descripcion: `Este modo evalúa tus conocimientos, tu rol y tus retos laborales. Con la información que compartas, genera un documento personalizado con recomendaciones de cómo adaptarte al uso de inteligencia artificial y qué herramientas integrar a tus tareas diarias.`,
  },
  {
    label: 'Modo Auditoría Empresarial',
    icon: <FaSearch className="text-[#0f172a] text-base" />,
    descripcion: `Este modo realiza una auditoría automatizada sobre tus procesos de negocio. A través de una conversación, GLY-AI identifica oportunidades de automatización y genera un informe de cómo tu empresa puede integrar soluciones de IA dentro de su operación.`,
  },
  {
    label: 'Modo Análisis de Datos',
    icon: <FaDatabase className="text-[#0f172a] text-base" />,
    descripcion: `Carga un archivo de datos (CSV, Excel, etc.) y hazle preguntas en lenguaje natural. El modelo analizará tu tabla, generará siete gráficas dinámicas, clasificará los datos en numéricos y no numéricos, y elaborará un reporte descriptivo y analítico completo.`,
  },
  {
    label: 'Modo Conversacional IA',
    icon: <FaComments className="text-[#0f172a] text-base" />,
    descripcion: `Un modo libre para conversar sobre inteligencia artificial. Puedes preguntar sobre modelos, frameworks, tendencias o ideas para aplicar IA en proyectos personales o empresariales.`,
  },
  {
    label: 'Text-to-Speech / Speech-to-Text',
    icon: <FaMicrophone className="text-[#0f172a] text-base" />,
    descripcion: `Habla directamente con GLY-AI o deja que te lea las respuestas. Este módulo convierte voz en texto y texto en voz, facilitando la interacción y permitiendo experiencias más naturales.`,
  },
  {
    label: 'Framework GLYNNE',
    icon: <FaCogs className="text-[#0f172a] text-base" />,
    descripcion: `El corazón técnico de la plataforma. El framework permite a los desarrolladores crear sus propios motores de IA modificando solo la personalidad (prompt), la temperatura, el rol y el modelo, todo conectado a un servidor FastAPI listo para producción.`,
  },
  {
    label: 'Documentación del Framework',
    icon: <FaFileAlt className="text-[#0f172a] text-base" />,
    descripcion: `Aquí encontrarás las guías completas para desplegar tu agente GLY-AI en tu propio entorno. Desde instalación de dependencias hasta la comunicación entre frontend y backend, todo documentado paso a paso.`,
  },
  {
    label: 'Comparte tus herramientas actuales',
    icon: <FaTools className="text-[#0f172a] text-base" />,
    descripcion: `Informa con qué ecosistema trabajas: CRM, ERP, Sheets, Notion, Slack, Asana, HubSpot, etc. GLY-AI puede integrar tu flujo de trabajo para mejorar productividad y eliminar redundancias.`,
  },
  {
    label: 'Define tus metas empresariales',
    icon: <FaChartLine className="text-[#0f172a] text-base" />,
    descripcion: `Sea escalar, reducir costos o implementar automatización total, GLY-AI adapta el razonamiento a tu objetivo para generar propuestas y estrategias alineadas con tu visión empresarial.`,
  },
  {
    label: 'Simulación de procesos reales',
    icon: <FaRetweet className="text-[#0f172a] text-base" />,
    descripcion: `Describe un flujo real (ejemplo: cómo llega un lead y se convierte en cliente). GLY-AI te mostrará dónde intervenir con IA para reducir tiempos y optimizar decisiones.`,
  },
  {
    label: 'Modo Desarrollador',
    icon: <FaRocket className="text-[#0f172a] text-base" />,
    descripcion: `Activa este modo si eres programador o arquitecto de software. Podrás probar prompts, analizar flujos de razonamiento y desplegar modelos directamente usando tu servidor GLYNNE-Framework.`,
  },
  {
    label: 'Modo Entrenamiento de Modelos',
    icon: <FaRobot className="text-[#0f172a] text-base" />,
    descripcion: `Permite crear y ajustar modelos personalizados para tu empresa. Puedes definir datasets, temperatura y contexto para construir un modelo de IA alineado con tu lenguaje corporativo.`,
  },
  {
    label: 'Noticias y Actualizaciones',
    icon: <FaGlobe className="text-[#0f172a] text-base" />,
    descripcion: `Consulta en tu perfil las últimas actualizaciones del framework, mejoras de los modelos y nuevas integraciones. GLYNNE evoluciona constantemente para ofrecer la mejor experiencia en IA aplicada.`,
  },
  {
    label: 'Errores, dudas y mejoras',
    icon: <FaExclamationTriangle className="text-[#0f172a] text-base" />,
    descripcion: `Si algo no funciona como esperas, puedes reportarlo directamente desde tu perfil. GLYNNE aprende de cada interacción para refinar sus agentes y optimizar el rendimiento global.`,
  },
];

export default function InstruccionesAuditoriaCompact() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleItem = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="w-full max-w-[400px] mx-auto p-4 space-y-3 bg-white shadow-lg border border-gray-200 rounded-xl">
      <NewsPerdil />
      <motion.h2
        className="text-base font-semibold text-center text-gray-800"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explora todo el poder de GLY-AI
      </motion.h2>

      <p className="text-xs text-gray-500 text-center">
        Conoce los modos de razonamiento, herramientas y capacidades del ecosistema GLYNNE. 
        Cada opción te acerca a dominar la automatización y la inteligencia artificial aplicada.
      </p>

      <div className="flex flex-col gap-2">
        {instrucciones.map((item, index) => (
          <div key={index}>
            <motion.div
              onClick={() => toggleItem(index)}
              className={`bg-white border border-gray-300 rounded-xl p-2 cursor-pointer hover:shadow-md transition ${
                activeIndex === index ? 'border-blue-500 shadow-sm' : ''
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between text-xs font-medium text-gray-700">
                <div className="flex items-center gap-1">
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
                  <div className="p-2 text-xs text-gray-600 border border-t-0 border-gray-200 rounded-b-xl bg-white">
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
