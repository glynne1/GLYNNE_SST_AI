'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBrain, FaChartLine, FaNetworkWired, FaUserFriends, FaDatabase,
  FaRobot, FaInfinity, FaCogs, FaLock, FaGlobe, FaCloud, FaProjectDiagram,
  FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import { LoginPopup } from './LoginPopup';

const services = [
    {
      icon: <FaBrain />,
      title: 'Inteligencia Contextual',
      bg: 'https://i.pinimg.com/originals/0d/ad/b0/0dadb07f3366e86e7cb103e083b5fbbb.gif',
      bgMobile: '/ai-context-mobile.jpg',
      description:
        'GLYNNE no se limita a responder, comprende. Interpreta contexto, intención y objetivo antes de actuar.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">IA con razonamiento profundo</h3>
          <p>
            A diferencia de los modelos tradicionales, GLYNNE analiza la intención del usuario, la estructura del negocio y las
            dependencias entre procesos antes de ejecutar una acción. Esto permite resultados precisos, coherentes y
            estratégicos, no respuestas genéricas.
          </p>
        </>
      ),
    },
    {
      icon: <FaChartLine />,
      title: 'Optimización Inteligente',
      bg: 'https://i.pinimg.com/originals/38/74/ef/3874ef6c18f8b2cd061111ba4ca63a91.gif',
      bgMobile: '/optimization-bg-mobile.jpg',
      description:
        'GLYNNE aprende de cada iteración y mejora tus procesos automáticamente, sin intervención manual.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Aprendizaje continuo aplicado</h3>
          <p>
            El sistema identifica cuellos de botella, analiza la eficiencia y ajusta los flujos de trabajo sin detener la
            operación. GLYNNE no solo automatiza: **optimiza dinámicamente el rendimiento empresarial.**
          </p>
        </>
      ),
    },
    {
      icon: <FaNetworkWired />,
      title: 'Arquitectura Modular',
      bg: 'https://i.pinimg.com/originals/88/e8/64/88e8644167e29a580098ca6bb33adad5.gif',
      bgMobile: '/modular-bg-mobile.jpg',
      description:
        'GLYNNE está diseñado para integrarse con cualquier entorno: ERP, CRM, APIs, Gmail o WhatsApp.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Construido para adaptarse, no reemplazar</h3>
          <p>
            Cada módulo del Framework GLYNNE puede conectarse a tus sistemas actuales mediante APIs o webhooks.
            **No es necesario cambiar tu infraestructura**, solo potenciarla con inteligencia orquestada.
          </p>
        </>
      ),
    },
    {
      icon: <FaUserFriends />,
      title: 'Agentes Colaborativos',
      bg: 'https://i.pinimg.com/originals/b1/0c/3e/b10c3e43e836d32554bfbc55f195b9a5.gif',
      bgMobile: '/agents-bg-mobile.jpg',
      description:
        'GLYNNE utiliza agentes especializados que trabajan en equipo para resolver problemas complejos.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Colaboración entre inteligencias</h3>
          <p>
            Los agentes GLYNNE se comunican entre sí, compartiendo contexto y objetivos. Esto permite crear ecosistemas de
            IA que **razonan y coordinan acciones**, en lugar de actuar de forma aislada.
          </p>
        </>
      ),
    },
    {
      icon: <FaDatabase />,
      title: 'Gestión de Conocimiento',
      bg: 'https://i.pinimg.com/originals/fd/31/79/fd3179b29ad6260ce3e077163c17a939.gif',
      bgMobile: '/data-bg-mobile.jpg',
      description:
        'GLYNNE transforma tus datos en conocimiento útil. La información se convierte en inteligencia accionable.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Datos que piensan</h3>
          <p>
            Con GLYNNE, cada dato tiene propósito. Los modelos analizan relaciones, patrones y aprendizajes internos para
            ofrecer una **visión estratégica**, no solo métricas aisladas.
          </p>
        </>
      ),
    },
    {
      icon: <FaRobot />,
      title: 'Automatización Cognitiva',
      bg: 'https://i.pinimg.com/originals/66/24/38/662438e425236e708c7f235be4e44312.gif',
      bgMobile: '/automation-bg-mobile.jpg',
      description:
        'Más allá del “si pasa esto, haz esto”. GLYNNE comprende objetivos y ejecuta tareas con criterio empresarial.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Automatización que piensa</h3>
          <p>
            Los agentes inteligentes de GLYNNE utilizan razonamiento contextual para priorizar tareas, anticipar escenarios
            y ejecutar acciones con base en objetivos, no simples condiciones.
          </p>
        </>
      ),
    },
    {
      icon: <FaInfinity />,
      title: 'Escalabilidad Sin Fricción',
      bg: 'https://i.pinimg.com/originals/f4/7a/82/f47a82a4efc8091a7026305e31b9dc54.gif',
      bgMobile: '/scalable-bg-mobile.jpg',
      description:
        'Crecimiento sin interrupciones: GLYNNE escala horizontal y verticalmente sin afectar el rendimiento.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Arquitectura elástica</h3>
          <p>
            Diseñado con microservicios desacoplados, GLYNNE permite escalar cada módulo de manera independiente. Tu IA
            crece contigo, sin reconfigurar el sistema.
          </p>
        </>
      ),
    },
    {
      icon: <FaCogs />,
      title: 'Orquestación de Procesos',
      bg: 'https://i.pinimg.com/originals/10/7a/a3/107aa3260165364b32a9c7a5e85015ed.gif',
      bgMobile: '/orchestration-bg-mobile.jpg',
      description:
        'GLYNNE conecta procesos, APIs y agentes bajo un mismo flujo lógico de decisiones.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Un ecosistema orquestado</h3>
          <p>
            El motor de orquestación de GLYNNE sincroniza todas las automatizaciones y modelos para actuar en tiempo real,
            logrando **fluidez y coherencia total** entre las áreas del negocio.
          </p>
        </>
      ),
    },
    {
      icon: <FaLock />,
      title: 'Seguridad Corporativa',
      bg: 'https://i.pinimg.com/originals/8e/8d/15/8e8d1583393eab9b68e158e7536db144.gif',
      bgMobile: '/security-bg-mobile.jpg',
      description:
        'Tu información es tuya. GLYNNE garantiza privacidad total y despliegue en entornos seguros.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Confidencialidad por diseño</h3>
          <p>
            GLYNNE ofrece instancias privadas por cliente y control completo sobre los datos y el entrenamiento. Ninguna
            información se comparte fuera del entorno corporativo.
          </p>
        </>
      ),
    },
    {
      icon: <FaGlobe />,
      title: 'Interconectividad Global',
      bg: 'https://i.pinimg.com/originals/01/0a/14/010a14ebe782323325457d2a3fbaab20.gif',
      bgMobile: '/connectivity-bg-mobile.jpg',
      description:
        'Integraciones con más de 200 APIs empresariales, sin código y con despliegue inmediato.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Automatiza tu red empresarial</h3>
          <p>
            Desde CRMs hasta plataformas de comunicación, GLYNNE se conecta con cualquier herramienta moderna,
            eliminando fricción entre tus canales y sistemas globales.
          </p>
        </>
      ),
    },
    {
      icon: <FaCloud />,
      title: 'Infraestructura Inteligente',
      bg: 'https://i.pinimg.com/originals/8a/4a/15/8a4a159548eb63673b0815a1304cc1b0.gif',
      bgMobile: '/cloud-bg-mobile.jpg',
      description:
        'Desplegado en la nube, escalable y optimizado para IA distribuida y cargas intensivas.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Rendimiento sin límites</h3>
          <p>
            GLYNNE utiliza infraestructura híbrida (local + nube) para garantizar velocidad, resiliencia y baja latencia.
            Ideal para operaciones globales o entornos críticos.
          </p>
        </>
      ),
    },
    {
      icon: <FaProjectDiagram />,
      title: 'Ecosistema Unificado',
      bg: 'https://i.pinimg.com/originals/fd/d5/e8/fdd5e8615f7ed71e2e779b6ed3951f18.gif',
      bgMobile: '/ecosystem-bg-mobile.jpg',
      description:
        'Todos tus procesos, datos y agentes en un mismo entorno de inteligencia integrada.',
      content: (
        <>
          <h3 className="text-lg font-semibold mb-3">Un solo lenguaje para tu empresa</h3>
          <p>
            GLYNNE convierte la complejidad tecnológica en un flujo simple y armónico. Cada componente —IA, datos, APIs,
            usuarios— habla el mismo idioma: **eficiencia inteligente.**
          </p>
        </>
      ),
    },
  ];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const autoplayRef = useRef(null);
  const AUTOPLAY_MS = 5000;

  // 🔹 Detecta si el viewport es menor a 700px
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 700);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // 🔹 Observa visibilidad de la sección para mostrar header
  useEffect(() => {
    const section = document.getElementById('ecosistema');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeader(entry.intersectionRatio >= 0.85);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 🔹 Autoplay
  useEffect(() => {
    if (isHovering) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % services.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(autoplayRef.current);
  }, [isHovering]);

  const next = () => setIndex((i) => (i + 1) % services.length);
  const prev = () => setIndex((i) => (i - 1 + services.length) % services.length);

  const openModal = (service) => {
    setActiveService(service);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveService(null), 220);
  };

  const service = services[index];
  const bgImage = isMobile ? service.bgMobile || service.bg : service.bg;

  return (
    <section
      id="ecosistema"
      className="relative flex flex-col items-center justify-center w-full min-h-[100vh] bg-white overflow-hidden font-inter"
    >
      {/* 🔹 HEADER ANIMADO */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            key="ecosistema-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-2 bg-white border-b border-gray-100"
          >
            <motion.img
              src="/logo2.png"
              alt="Logo GLYNNE"
              className="h-5 sm:h-10 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => (window.location.href = 'https://www.glynneai.com/')}
            />

            <motion.button
              onClick={() => {
                localStorage.removeItem('glyiaChatClosed');
                setShowLoginModal(true);
              }}
              className="relative px-4 py-[6px] text-[12px] font-medium bg-black text-white rounded-md group overflow-hidden transition-all hover:scale-105 z-[9999]"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Iniciar sesión</span>
            </motion.button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* 🔹 Fondo y Título */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0" />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="z-20 text-center text-gray-900 font-semibold tracking-[0.15em] text-3xl md:text-4xl uppercase mb-10 mt-20"
      >
        Explora el Ecosistema GLYNNE
      </motion.h2>

      {/* 🔹 Carrusel */}
      <div
        className="relative w-full max-w-7xl h-[520px] flex items-center justify-center z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute w-[88%] md:w-[78%] h-[440px] rounded-[28px] flex flex-col justify-end p-10 bg-center bg-cover shadow-[0_10px_30px_rgba(15,23,42,0.06)] cursor-pointer overflow-hidden transition-all hover:scale-[1.01]"
            style={{ backgroundImage: `url('${bgImage}')` }}
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openModal(service)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent rounded-[28px]" />
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl text-indigo-300">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="text-sm text-gray-200 max-w-xl mt-1">{service.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white/70 backdrop-blur-md hover:scale-105 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white/70 backdrop-blur-md hover:scale-105 transition"
          >
            <FaArrowRight className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2 mt-6 z-20">
        {services.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[6px] rounded-full ${i === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            style={{ width: i === index ? 42 : 18 }}
            transition={{ layout: true, duration: 0.35 }}
          />
        ))}
      </div>

      {/* 🔹 Modal */}
      <AnimatePresence>
        {modalOpen && activeService && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[86vh] overflow-y-auto p-8 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-2xl font-light"
                >
                  ×
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="text-6xl text-indigo-600 mb-4">{activeService.icon}</div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{activeService.title}</h2>
                  <p className="text-gray-500 text-sm max-w-lg">{activeService.description}</p>
                </div>

                <div className="text-gray-700 text-base leading-relaxed space-y-4">
                  {activeService.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔹 Modal de Login */}
      <LoginPopup visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </section>
  );
}
