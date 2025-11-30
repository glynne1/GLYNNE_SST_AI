'use client';

import { FaBrain, FaChartLine, FaNetworkWired, FaUserFriends, FaDatabase, FaRobot, FaInfinity } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: <FaBrain />,
    title: 'Quiénes Somos',
    description: 'GLYNNE redefine cómo las empresas entienden y aplican la inteligencia artificial.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Un nuevo estándar en inteligencia artificial aplicada</h3>
        <p className="mb-3">
          En GLYNNE desarrollamos un ecosistema de inteligencia artificial diseñado para adaptarse a las empresas, 
          no al revés. Nuestro propósito es crear una IA que no solo responda, sino que razone, se adapte y 
          evolucione junto a quienes la usan.
        </p>
        <p className="mb-3">
          No somos un proveedor de herramientas; somos una arquitectura viva de automatización, 
          impulsada por agentes inteligentes, razonamiento contextual y datos accionables.
        </p>
      </>
    ),
  },
  {
    icon: <FaNetworkWired />,
    title: 'Nuestro Framework',
    description: 'El corazón que conecta inteligencia, datos y automatización en un mismo flujo.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Framework de Orquestación Inteligente</h3>
        <p className="mb-3">
          El <strong>Framework GLYNNE</strong> permite construir sistemas que piensan y se comunican entre sí.  
          Cada agente tiene un rol, una memoria y una función dentro de una arquitectura modular capaz de auditar, 
          automatizar y mejorar cualquier proceso empresarial.
        </p>
        <p className="mb-3">
          Los agentes analizan información, detectan ineficiencias y proponen soluciones sin necesidad de intervención humana, 
          aprendiendo de cada interacción para evolucionar continuamente.
        </p>
      </>
    ),
  },
  {
    icon: <FaChartLine />,
    title: 'Auditoría Inteligente',
    description: 'El razonamiento de GLYNNE permite entender los procesos empresariales desde dentro.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Auditorías Basadas en Razonamiento Contextual</h3>
        <p className="mb-3">
          Nuestra IA no audita desde fuera: se integra en los flujos de trabajo y los analiza desde la raíz.
          GLYNNE interpreta datos operativos, estratégicos y humanos para comprender los puntos críticos y 
          optimizar procesos en tiempo real.
        </p>
        <p className="mb-3">
          <strong>Modo de razonamiento:</strong>  
          El sistema cruza contexto, intención y patrones históricos para emitir diagnósticos precisos, 
          no sugerencias genéricas.
        </p>
      </>
    ),
  },
  {
    icon: <FaUserFriends />,
    title: 'Razonamiento Humano + IA',
    description: 'Nuestro modelo combina empatía y datos para entender a las personas detrás de cada empresa.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Comprendemos a las personas antes que los procesos</h3>
        <p className="mb-3">
          GLYNNE implementa un <strong>modo de razonamiento humano</strong> que analiza los perfiles, decisiones y 
          comportamientos de los equipos para adaptar las recomendaciones de IA a la cultura de cada organización.
        </p>
        <p className="mb-3">
          La IA no solo automatiza, sino que <strong>personaliza</strong>: entiende el estilo de trabajo, las metas y 
          los desafíos reales de cada usuario, creando una experiencia de mejora continua que siente natural.
        </p>
      </>
    ),
  },
  {
    icon: <FaDatabase />,
    title: 'Inteligencia de Datos',
    description: 'Organizamos la información y la convertimos en decisiones accionables.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Análisis Multidimensional y Visualización</h3>
        <p className="mb-3">
          GLYNNE analiza bases de datos empresariales y genera 7 tipos de gráficas dinámicas que representan 
          comportamiento operativo, eficiencia, costos, proyecciones y correlaciones entre variables clave.
        </p>
        <p className="mb-3">
          Cada insight visual está conectado con agentes que pueden <strong>responder cualquier pregunta</strong> 
          basada en los datos: desde "¿qué área tiene más ineficiencias?" hasta "¿qué pasará si duplicamos la demanda?".
        </p>
      </>
    ),
  },
  {
    icon: <FaRobot />,
    title: 'Respuestas Autónomas',
    description: 'Agentes que analizan, razonan y actúan sin intervención humana.',
    content: (
      <>
        <h3 className="text-lg font-semibold mb-3">Agentes Inteligentes Adaptativos</h3>
        <p className="mb-3">
          Los agentes del Framework GLYNNE son autónomos, con capacidades de razonamiento local y global.
          Detectan cambios en los datos, recalculan estrategias y ejecutan acciones sin necesidad de supervisión.
        </p>
        <p className="mb-3">
          Cada agente está conectado al núcleo cognitivo de GLYNNE, lo que le permite aprender de otros agentes y 
          evolucionar a medida que el sistema crece.
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

                {/* ÍCONO EN GRIS — AQUÍ ESTÁ EL CAMBIO */}
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
