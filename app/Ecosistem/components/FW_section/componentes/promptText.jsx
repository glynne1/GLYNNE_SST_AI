'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[30vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-4xl text-left">
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Definir la <strong>personalidad de un modelo</strong> mediante un <code>prompt</code> es lo que transforma a una IA genérica en un <strong>especialista funcional</strong>.
          <br /><br />
          Cuando le asignas un <em>rol</em> y un <em>contexto</em>, el modelo deja de responder como un asistente neutro y comienza a pensar, analizar y comunicar como un profesional entrenado en esa disciplina. 
          <br /><br />
          Esto no solo mejora la precisión de las respuestas, sino que también crea <strong>consistencia cognitiva</strong>: el modelo mantiene su enfoque, lenguaje técnico y prioridades de análisis a lo largo de toda la sesión.
          <br /><br />
          En nuestro framework, esta capacidad se implementa desde la carpeta <code>user</code>, donde puedes definir prompts base, comportamientos y dominios de especialización.
          Así, cada agente puede comportarse como un <strong>consultor, ingeniero, auditor o estratega</strong>, según la necesidad de tu proyecto.
        </p>
      </div>
    </section>
  );
}
