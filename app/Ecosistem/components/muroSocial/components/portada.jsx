'use client';
import Nosotros from '../../../somos/componentes/cardNosotros';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Link,
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
      "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
    about:
      "En GLYNNE S.A.S diseñamos ecosistemas tecnológicos inteligentes capaces de automatizar, analizar y escalar operaciones empresariales.",
  };

  const renderSection = () => {
    return (
      <motion.section
        key="publicaciones"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <article className="p-5 bg-white transition">
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
              <Nosotros />
            </div>
          </div>
        </article>
      </motion.section>
    );
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
                <button
                  onClick={() => setOpenModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <Edit2 size={16} /> Conoce todos nuestros servicios
                </button>

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

        {/* Única sección visible: Publicaciones */}
        <div className="mt-8">
          <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
        </div>
      </div>
    </article>
  );
}
