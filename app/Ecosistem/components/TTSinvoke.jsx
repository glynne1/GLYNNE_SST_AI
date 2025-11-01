'use client';

import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscoverGlyAI() {
  const [openModal, setOpenModal] = useState(false);

  const servicios = [
    "Automatización empresarial con IA",
    "Arquitectura de software escalable",
    "Agentes inteligentes & LLM Orchestration",
    "Microservicios y pipelines de datos",
    "Integración con APIs (WhatsApp, Gmail, ERP, CRM)",
    "RPA + IA para procesos repetitivos",
    "Dashboards empresariales en tiempo real",
    "Modelos de NLP & asistentes corporativos",
    "Sistemas de autoservicio B2B",
    "Estrategia tecnológica y escalamiento",

    "Gemelos digitales para simulación y optimización de procesos",
    "Plataformas no-code para automatización con agentes inteligentes",
    "MLOps y despliegue continuo de modelos en producción",
    "Monitoreo, auditoría y observabilidad impulsada por IA",
    "Sistemas conversacionales multimodales (voz, texto, video, documentos)",
    "Optimización operativa con análisis predictivo",
    "Ciberseguridad adaptativa y detección de anomalías con IA",
    "Consultoría AI-First y modernización tecnológica empresarial"
  ];

  return (
    <>
      {/* botón */}
      <div className="w-full flex justify-center mt-3">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-800 rounded-full text-[11px] md:text-xs shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 ease-out backdrop-blur-sm"
        >
          <Star size={12} className="text-yellow-500" />
          <span className="font-medium">Así de fácil, ¿quieres ver?</span>
        </button>
      </div>

      <AnimatePresence>
        {openModal && (
          <>
            {/* fondo blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0  backdrop-blur-md z-40"
              onClick={() => setOpenModal(false)}
            />

            {/* modal cinematográfico */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed z-50 top-1/2 left-1/2 w-[92%] md:w-[420px] h-[88vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
            >
              {/* imagen fondo */}
              <div className="absolute inset-0">
                <img
                  src="https://i.pinimg.com/736x/1b/df/93/1bdf936e38d4cc676e424ef09be89fe0.jpg"
                  className="w-full h-full object-cover opacity-[0.6]"
                  alt="GLYNNE cinematic background"
                />
              </div>

           

              {/* contenido */}
              <div className="relative z-50 flex flex-col items-center h-full px-6 pt-8">

                {/* Logo */}
                <motion.img
                  src="/logo2.png"
                  alt="GLYNNE"
                  className="w-20 opacity-100 mb-3"
                />

                {/* Título */}
                <h2 className="text-sm text-black font-medium tracking-wide mb-2 opacity-90">
                  Servicios GLYNNE
                </h2>

                <div className="w-full h-[1px] bg-white/20 mb-4" />

                {/* Lista */}
                <div className="text-[10px] text-gray-800 leading-relaxed font-light tracking-wider max-h-[60vh] overflow-y-auto w-full text-left space-y-2">
                  {servicios.map((item, idx) => (
                    <p key={idx} className="whitespace-normal">• {item}</p>
                  ))}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
