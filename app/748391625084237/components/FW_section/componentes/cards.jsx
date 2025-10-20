'use client';

import { FaMicrochip, FaBolt, FaRocket, FaDatabase, FaCogs, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
    {
      icon: <FaBolt />,
      title: 'Automatización',
      description: 'Hacemos que las tareas repetitivas se hagan solas.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Automatización Inteligente con GLYNNE</h3>
          <p className="mb-3">
            GLYNNE permite que las empresas construyan agentes autónomos capaces de ejecutar tareas repetitivas, coordinar sistemas externos y tomar decisiones simples
            sin intervención humana. Cada agente puede integrarse con APIs, bases de datos, CRMs, ERPs o sistemas internos, creando un flujo de trabajo totalmente automatizado.
          </p>
          <p className="mb-3">
            <strong>Cómo funciona:</strong>  
            Al crear un agente, defines su rol y prompts dinámicos. GLYNNE se encarga de traducir esa configuración en un flujo autónomo capaz de ejecutar tareas y comunicarse con otros agentes.
          </p>
          <p className="mb-3">
            <strong>Ejemplo práctico:</strong>  
            Un Agente Comercial que recibe consultas de clientes, registra leads automáticamente, envía notificaciones y actualiza el CRM sin intervención humana.
          </p>
          <p className="mb-3">
            Además, GLYNNE permite programar secuencias de agentes para tareas más complejas, como un proceso que involucra validación de datos, generación de reportes y envío de alertas, todo de forma continua y autónoma.
          </p>
        </>
      )
    },
    {
      icon: <FaRocket />,
      title: 'Predicción',
      description: 'Anticipamos clientes, ventas y problemas antes de que pasen.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Predicción Proactiva con IA</h3>
          <p className="mb-3">
            Los agentes de GLYNNE analizan datos históricos, patrones de comportamiento y tendencias del mercado para generar predicciones confiables.  
            Esto permite anticiparse a oportunidades, riesgos o desviaciones en procesos críticos.
          </p>
          <p className="mb-3">
            <strong>Ejemplo de aplicación:</strong>  
            Un Agente Analista identifica clientes con riesgo de churn, predice ventas por trimestre y alerta automáticamente a los equipos comerciales para tomar acciones correctivas.
          </p>
          <p className="mb-3">
            <strong>Integración completa:</strong>  
            La predicción se conecta con dashboards, sistemas internos y agentes ejecutores para cerrar el ciclo: no solo predice, sino que activa acciones concretas.
          </p>
          <p className="mb-3">
            Con GLYNNE, la predicción deja de ser un reporte pasivo y se convierte en una capa activa de inteligencia, capaz de aprender y mejorar con cada interacción y cada dato procesado.
          </p>
        </>
      )
    },
    {
      icon: <FaMicrochip />,
      title: 'Optimización',
      description: 'Reducimos costos y errores encontrando formas más eficientes.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Optimización de Procesos y Recursos</h3>
          <p className="mb-3">
            GLYNNE analiza flujos de trabajo, asignación de recursos y tiempos de ejecución para reducir errores y aumentar eficiencia.  
            Cada agente identifica redundancias y propone mejoras automáticas.
          </p>
          <p className="mb-3">
            <strong>Ejemplo:</strong>  
            Un Agente Analista detecta procesos duplicados en la operación de ventas y genera recomendaciones automatizadas para reducir tiempos y costos.
          </p>
          <p className="mb-3">
            <strong>Beneficios:</strong>  
            Optimización de recursos humanos, reducción de errores humanos y ahorro en costos operativos. Los agentes trabajan en conjunto, ajustando dinámicamente procesos según los datos en tiempo real.
          </p>
          <p className="mb-3">
            Esta optimización no es estática: el sistema aprende continuamente, mejorando cada proceso y adaptándose al crecimiento de la empresa.
          </p>
        </>
      )
    },
    {
      icon: <FaCogs />,
      title: 'Auditorías con IA',
      description: 'Detectamos mejoras para aumentar productividad.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Auditorías Inteligentes y Predictivas</h3>
          <p className="mb-3">
            Los agentes auditores de GLYNNE revisan código, flujos de trabajo, bases de datos y procesos internos para detectar errores, vulnerabilidades y cuellos de botella.
          </p>
          <p className="mb-3">
            <strong>Cómo lo hace:</strong>  
            Cada agente compara el estado actual de los procesos con las mejores prácticas definidas en la organización, generando reportes claros y recomendaciones accionables.
          </p>
          <p className="mb-3">
            <strong>Ejemplo:</strong>  
            Un Agente Auditor revisa integraciones API, detecta endpoints obsoletos y genera automáticamente un plan de optimización para el equipo técnico.
          </p>
          <p className="mb-3">
            La auditoría se integra con otros agentes para implementar cambios de forma autónoma, reduciendo el tiempo entre diagnóstico y ejecución.
          </p>
        </>
      )
    },
    {
      icon: <FaDatabase />,
      title: 'Gestión de Datos',
      description: 'Convertimos datos en información útil.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Gestión y Análisis de Datos Inteligente</h3>
          <p className="mb-3">
            Los agentes de GLYNNE centralizan, procesan y analizan grandes volúmenes de datos, transformándolos en insights accionables.  
            Integran información de ERPs, CRMs, bases de datos internas y sistemas externos.
          </p>
          <p className="mb-3">
            <strong>Ejemplo:</strong>  
            Un Agente Analista genera dashboards en tiempo real, identifica patrones de ventas y comportamiento de clientes, y alerta sobre oportunidades o riesgos.
          </p>
          <p className="mb-3">
            GLYNNE permite a los desarrolladores crear agentes personalizados para cada tipo de dato, filtrando, normalizando y enriqueciendo la información de manera automática.
          </p>
          <p className="mb-3">
            La gestión de datos no solo es pasiva: los agentes aprenden de cada operación, afinando los análisis y mejorando predicciones futuras.
          </p>
        </>
      )
    },
    {
      icon: <FaRobot />,
      title: 'Respuestas en Tiempo Real',
      description: 'Sistemas que reaccionan al instante a cambios.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Autonomía y Respuesta Instantánea</h3>
          <p className="mb-3">
            GLYNNE permite que los agentes reaccionen en tiempo real a cambios en el sistema, datos o entorno.  
            Los agentes pueden adaptarse, redistribuir tareas y coordinarse entre sí sin intervención humana.
          </p>
          <p className="mb-3">
            <strong>Ejemplo:</strong>  
            Un Agente de Integración ajusta la asignación de tareas según la carga de trabajo, solicita asistencia de otros agentes y comunica cambios al CRM y sistemas internos.
          </p>
          <p className="mb-3">
            Esta capacidad hace que la empresa tenga un sistema vivo: los procesos se adaptan continuamente, los errores se corrigen y las oportunidades se capturan al instante.
          </p>
          <p className="mb-3">
            Además, cada interacción con clientes o sistemas se registra y se aprende de ella, lo que hace que el ecosistema sea cada vez más inteligente y autónomo.
          </p>
        </>
      )
    },
  ];
  

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function ServiceCards() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const openModal = (service) => { setActiveService(service); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setActiveService(null); };

  return (
    <div className="w-full flex justify-center mt-[30px] px-2 sm:px-4">
     <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[80%]"
  variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
>
  {services.map((service, index) => (
    <motion.div
      key={index}
      className="bg-white border border-gray-200 p-3 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center"
      variants={cardVariants} whileHover={{ scale: 1.03 }}
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
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[80vh] p-6 relative overflow-y-auto">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg font-bold transition">×</button>
                <h2 className="text-2xl font-bold mb-4 text-center">{activeService.title}</h2>
                <div className="text-gray-700 text-base space-y-4 text-justify">{activeService.content}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-shine {
          background-position: -200% 0;
          animation: shine 2s infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
