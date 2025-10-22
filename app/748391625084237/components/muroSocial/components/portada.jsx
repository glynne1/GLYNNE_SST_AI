'use client';
import Nosotros from '../../../somos/componentes/cardNosotros'
import News2 from '../../news/news'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Link,
  Users,
  Briefcase,
  Folder,
  Edit2,
} from "lucide-react";

export default function PerfilSocial({ profile }) {
  const [activeSection, setActiveSection] = useState("publicaciones");
  const [openModal, setOpenModal] = useState(false);

  const data = profile || {
    coverUrl: "/por.jpeg",
    avatarUrl: "/perf.jpeg",
    name: "GlYNNE S.A.S",
    handle: "@glynneai",
    title: "Desarrollo de Procesos IA",
    location: "Bogotá, Colombia",
    email: "axglynne7@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/alexander-quiroga-a992452b4/", // tu perfil LinkedIn
    about:
      "En GLYNNE S.A.S diseñamos ecosistemas tecnológicos inteligentes capaces de automatizar, analizar y escalar operaciones empresariales. Nuestra misión es construir arquitecturas de software acoplables, impulsadas por IA, que anticipen problemas antes de que existan. Cada línea de código refleja nuestro compromiso con la eficiencia, la modularidad y la innovación constante",
    stats: {
      conexiones: 512,
      puestos: 24,
      proyectos: 12,
    },
  };

  const renderSection = () => {
    switch (activeSection) {
      case "publicaciones":
        return (
          <motion.section
            key="publicaciones"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Publicaciones
            </h3>
            <article className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <img
                  src={data.avatarUrl}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {data.name}
                  </p>
                  <p className="text-xs text-slate-500 mb-2">Hace 2 horas</p>
                  <p className="text-sm text-slate-700">
                    Lanzando una nueva arquitectura de microservicios orientada
                    a eventos — observabilidad y pruebas desde el día 0.
                  </p>
                  <div className="mt-3 flex gap-4 text-xs text-slate-500 font-medium">
                    <button className="hover:text-slate-700">👍 Me gusta</button>
                    <button className="hover:text-slate-700">💬 Comentar</button>
                    <button className="hover:text-slate-700">↗ Compartir</button>
                  </div>
                </div>
              </div>
            </article>
          </motion.section>
        );

        case "informacion":
            return (
              <motion.section
                key="informacion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl border border-slate-200"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Información
                </h3>
          
                {/* Mantener descripción */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {data.about}
                </p>
          
                {/* Insertar componente News */}
     
                <News2 />
              </motion.section>
            );

      case "quienes":
        return (
          <motion.section
            key="quienes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-xl border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Quiénes somos
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Somos un equipo multidisciplinario de ingenieros, diseñadores y
              arquitectos de software enfocados en crear tecnología acoplable.
              Nuestra filosofía: la automatización no reemplaza, amplifica el
              potencial humano. En GLYNNE trabajamos para construir sistemas que
              piensen, aprendan y colaboren.
            </p>
            <Nosotros />
          </motion.section>
        );

      case "proyectos":
        return (
          <motion.section
            key="proyectos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-slate-50 rounded-xl border border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Nuestros proyectos
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                🚀 Sistema de auditoría inteligente para procesos empresariales.
              </li>
              <li>🤖 Plataforma Client AI para automatización de ventas con IA.</li>
              <li>🌐 Integración omnicanal con WhatsApp, Gmail y CRMs.</li>
              <li>📊 Dashboard de análisis predictivo con IA embebida.</li>
            </ul>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <article className="max-w-6xl mx-auto bg-white rounded-0xl shadow-lg overflow-hidden border border-slate-200">
      {/* Portada */}
      <div className="relative h-44 md:h-56 w-full bg-slate-100">
        <img
          src={data.coverUrl}
          alt="Portada"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="px-6 md:px-10 pb-10 mt-5 relative">
        {/* Avatar y encabezado */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 border-b pb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative rounded-full ring-4 ring-white overflow-hidden w-28 h-28 md:w-36 md:h-36 bg-gray-200"
          >
            <img
              src={data.avatarUrl}
              alt={`${data.name} avatar`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{data.name}</h2>
                <p className="text-slate-500 text-sm">{data.handle}</p>
                <p className="mt-1 text-slate-700 text-base font-medium">
                  {data.title}
                </p>
              </div>

              <div className="flex gap-2">
                {/* Botón modal servicios */}
                <button
                  onClick={() => setOpenModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <Edit2 size={16} /> Conoce todos nuestros servicios
                </button>

                {/* Botón Conectar */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(data.linkedin, "_blank")}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
                >
                  Conectar
                </motion.button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {data.location}
              </span>
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-1 hover:underline"
              >
                <Mail size={16} /> {data.email}
              </a>
              <span className="flex items-center gap-1">
                <Link size={16} /> Portafolio disponible
              </span>
            </div>
          </div>
        </div>

        {/* Submenú de secciones */}
        <div className="flex justify-center mt-6 border-b border-slate-200">
          {[
            { key: "publicaciones", label: "Publicaciones" },
            { key: "informacion", label: "Información" },
            { key: "quienes", label: "Quiénes Somos" },
            { key: "proyectos", label: "Proyectos" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`px-5 py-3 text-sm font-medium transition border-b-2 ${
                activeSection === item.key
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Contenido dinámico */}
        <div className="mt-8">
          <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
        </div>
      </div>

      {/* Modal Servicios */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4"
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 rounded-2xl shadow-2xl p-6 max-w-2xl w-full overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Nuestros Servicios
              </h3>

              <p className="text-gray-700 text-sm mb-6 text-center">
                <strong>DNS S.A.S</strong> es una empresa tecnológica enfocada en
                el desarrollo, incorporación, mejora e investigación aplicada en
                inteligencia artificial.  
                Ofrecemos soluciones integrales que combinan ingeniería, datos y
                estrategia para potenciar el crecimiento digital de nuestros
                clientes.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Servicios Básicos
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
                    <li>• Asesorías tecnológicas y de IA</li>
                    <li>• Auditorías de sistemas</li>
                    <li>• Desarrollo de software a medida</li>
                    <li>• Integración de APIs y servicios cloud</li>
                    <li>• Marketing digital impulsado por IA</li>
                    <li>• Consultoría en transformación digital</li>
                    <li>• Implementación de sistemas CRM y ERP</li>
                    <li>• Soporte técnico y mantenimiento evolutivo</li>
                    <li>• Gestión y análisis de datos empresariales</li>
                    <li>• Desarrollo de dashboards interactivos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Servicios Especializados
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
                    <li>• Automatización de procesos empresariales</li>
                    <li>• Incorporación de IA en flujos de trabajo</li>
                    <li>• Arquitectura de software para IA distribuida</li>
                    <li>• Sistemas multiagente y orquestación inteligente</li>
                    <li>• Diseño de pipelines de datos y MLOps</li>
                    <li>• Implementación de modelos de IA generativa</li>
                    <li>• Optimización de rendimiento con IA predictiva</li>
                    <li>• Análisis semántico de documentos y reportes</li>
                    <li>• Desarrollo de chatbots empresariales con LLM</li>
                    <li>• Integración de IA en plataformas de ventas</li>
                    <li>• Creación de asistentes virtuales personalizados</li>
                    <li>• Implementación de modelos de recomendación</li>
                    <li>• Orquestación de agentes cognitivos</li>
                    <li>• Infraestructura escalable para IA y datos</li>
                    <li>• Consultoría en ciberseguridad y automatización</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  onClick={() => setOpenModal(false)}
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
