'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket,
  FaBrain,
  FaProjectDiagram,
  FaLock,
  FaUsers,
} from 'react-icons/fa';

import '../../components/mainlogos.css';

// Logos con alt enriquecidos para SEO
const techLogos = [
  { src: '/langchain-text.png', alt: 'LangChain framework para agentes de IA' },
  { src: '/n8n-color.png', alt: 'n8n automatización de procesos' },
  { src: '/icons8-next.js-48.png', alt: 'Next.js frontend moderno' },
  { src: '/icons8-nodejs-480.png', alt: 'Node.js backend escalable' },
  { src: '/icons8-supabase-480.png', alt: 'Supabase base de datos en tiempo real' },
  { src: '/icons8-python-480.png', alt: 'Python para machine learning' },
  { src: '/icons8-chatear-500.png', alt: 'OpenAI modelos de lenguaje' },
  { src: '/vercel.png', alt: 'Vercel infraestructura serverless' },
  { src: '/icons8-estibador-240.png', alt: 'Docker infraestructura modular' },
  { src: '/scikit-learn.png', alt: 'Scikit-learn librería de IA' },
  { src: '/TensorFlow.png', alt: 'TensorFlow deep learning' },
];

// Razones para elegirnos (adaptadas al diferencial GLYNNE en la revolución IA)
const reasons = [
  {
    key: 'innovacion',
    name: 'Innovación con Propósito',
    icon: FaRocket,
    content: `
No seguimos tendencias: las creamos. 
Cada solución que construimos está diseñada para anticipar el futuro, no solo reaccionar a él. 

Ejemplo: sistemas de IA que no solo responden a clientes, sino que **predicen sus necesidades** y automatizan la respuesta antes de que la pidan.
    `,
  },
  {
    key: 'ia-contextual',
    name: 'IA que Entiende tu Contexto',
    icon: FaBrain,
    content: `
No implementamos chatbots genéricos. Creamos **agentes inteligentes** que entienden tus procesos, tus datos y tu cultura organizacional. 
Así logramos que la IA sea parte activa de tu negocio y no un accesorio decorativo.

Ejemplo: agentes de soporte que **aprenden de tu historial de clientes** para dar respuestas precisas y proactivas.
    `,
  },
  {
    key: 'arquitectura',
    name: 'Arquitectura Escalable',
    icon: FaProjectDiagram,
    content: `
Construimos como una ciudad viva: nodos, flujos y agentes trabajando en armonía. 
Nuestra arquitectura modular permite crecer sin fricción, integrándose con CRMs, ERPs, WhatsApp, Gmail y más. 

Ejemplo: un flujo que conecta WhatsApp con el CRM y dispara correos automáticos, todo sin intervención humana.
    `,
  },
  {
    key: 'seguridad',
    name: 'Seguridad & Confianza',
    icon: FaLock,
    content: `
La IA no debe comprometer tus datos. 
Diseñamos con seguridad y gobernanza como pilares: trazabilidad, accesos por rol y auditoría en tiempo real. 

Ejemplo: un agente de finanzas que accede solo a la información que necesita, con registro de cada decisión que toma.
    `,
  },
  {
    key: 'alianza',
    name: 'Un Socio, no un Proveedor',
    icon: FaUsers,
    content: `
No entregamos proyectos, construimos **alianzas estratégicas**. 
Trabajamos contigo para transformar tu empresa en un negocio autónomo que escala con inteligencia.

Ejemplo: acompañamos a equipos internos para que aprendan a usar y evolucionar la IA junto con nosotros.
    `,
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState('innovacion');
  const current = reasons.find(tab => tab.key === activeTab);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 bg-white"
      style={{
        backgroundImage: "url('/fig.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Fondo difuminado */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[3.7px] z-0" />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center space-y-10 bg-white/70 backdrop-blur-xl p-6 sm:p-12 ring-1 ring-black/10 shadow-xl rounded-3xl">

        {/* Carrusel de logos */}
        <div className="w-full overflow-hidden" aria-label="Tecnologías que usamos en GLYNNE AI">
          <div className="flex space-x-6 min-w-max py-3 px-2 animate-slide-infinite">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 relative opacity-90 hover:opacity-100 transition duration-300 ease-in-out"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 60px, 72px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-2xl md:text-3xl font-bold text-black text-center px-4"
        >
          ¿Por qué elegir GLYNNE en la Revolución de la IA?
        </motion.h1>

        {/* Subtítulo */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-600 text-center"
        >
          Porque no seguimos la revolución: la estamos liderando
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 w-full">
          {reasons.map(phase => {
            const Icon = phase.icon;
            const isActive = activeTab === phase.key;
            return (
              <button
                key={phase.key}
                onClick={() => setActiveTab(phase.key)}
                className={`relative group overflow-hidden px-4 py-2 rounded-full border transition-all flex items-center gap-2
                  ${isActive
                    ? 'bg-orange-500 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`text-xl sm:text-2xl transition-colors ${isActive ? 'text-white' : 'text-orange-500'}`} />
                  <span className="font-medium">{phase.name}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </button>
            );
          })}
        </div>

        {/* Contenido dinámico */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 text-left"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-black text-center mb-6">{current.name}</h3>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed text-justify whitespace-pre-line">
              {current.content.trim()}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Bloque estático final */}
        <div className="mt-10 text-gray-700 max-w-4xl text-center mx-auto leading-relaxed">
          <p>
            En GLYNNE creemos que elegir un socio tecnológico no es cuestión de herramientas, 
            sino de visión. Somos pioneros en la creación de **empresas autónomas impulsadas por IA**, 
            construidas sobre arquitecturas seguras, modulares y diseñadas para evolucionar contigo.  
          </p>
        </div>
      </div>
    </section>
  );
}
