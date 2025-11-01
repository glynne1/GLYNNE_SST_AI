'use client';
import Nosotros from '../../../somos/componentes/cardNosotros';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Link, Edit2, Server, Brain, Workflow, Shield } from "lucide-react";

export default function PerfilSocial({ profile }) {
  const [openModal, setOpenModal] = useState(false);

  const data = profile || {
    coverUrl: "/por.jpeg",
    avatarUrl: "/perf.jpeg",
    name: "GLYNNE S.A.S",
    handle: "@glynneai",
    title: "Arquitectura de Software & Inteligencia Artificial",
    location: "Bogotá, Colombia",
    email: "axglynne7@gmail.com",
    linkedin: "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
    about: `Construimos infraestructuras cognitivas para empresas que desean operar con autonomía, precisión
    y escalabilidad. Nuestra misión es diseñar sistemas capaces de aprender, decidir y ejecutar sin fricción.`,
  };

  const capabilities = [
    { icon: <Brain size={14} />, label: "Agentes Cognitivos" },
    { icon: <Workflow size={14} />, label: "Automatización Empresarial" },
    { icon: <Server size={14} />, label: "Arquitectura en Nodos" },
    { icon: <Shield size={14} />, label: "Seguridad & Compliance" },
  ];

  return (
    <>
     

      {/* 🔹 Perfil */}
      <article className="max-w-6xl mx-auto rounded-0xl overflow-hidden border border-white/10 bg-white backdrop-blur-xl">
        
        {/* Header / Portada */}
        <div className="relative h-48 md:h-60 overflow-hidden">
          <img src={data.coverUrl} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>

        {/* Main Content */}
        <div className="px-8 pb-10 mt-10 relative">
          
          {/* Avatar + Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end border-b pb-8">
            
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl"
            >
              <img src={data.avatarUrl} className="object-cover w-full h-full" />
            </motion.div>

            <div className="flex-1 space-y-1">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {data.name}
              </h2>
              <p className="text-slate-500 text-sm">{data.handle}</p>

              <p className="mt-2 text-slate-700 text-base font-medium">
                {data.title}
              </p>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-2 mt-3">
                {capabilities.map((c, i) => (
                  <span 
                    key={i}
                    className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 text-xs rounded-full shadow-sm"
                  >
                    {c.icon} {c.label}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setOpenModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <Edit2 size={14} /> Servicios Corporativos
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(data.linkedin, "_blank")}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
                >
                  Conectar
                </motion.button>
              </div>
            </div>
          </div>

          {/* About / Misión */}
          <section className="mt-8 space-y-6">
            
            {/* Narrative Block */}
            <p className="text-sm text-slate-700 leading-relaxed border-l-4 border-slate-900 pl-4 italic">
              {data.about}
            </p>

            {/* Info Icons */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2"><MapPin size={16}/> {data.location}</span>
              <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:underline">
                <Mail size={16}/> {data.email}
              </a>
              <span className="flex items-center gap-2"><Link size={16}/> Infraestructura & Flujos Inteligentes</span>
            </div>


            {/* Posts Feed */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .4 }}
              >
                <Nosotros />
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </article>
    </>
  );
}
