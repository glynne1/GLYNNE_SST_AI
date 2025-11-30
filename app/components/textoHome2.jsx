"use client";

import React from "react";

export default function GlynneIntro() {
  return (
    <div className="w-full flex flex-col items-center text-center px-6 py-12">
      {/* TÍTULO */}
      <h1 className="relative overflow-hidden text-2xl lg:text-3xl mb-6 leading-snug text-gray-900 font-extrabold">
        <span className="absolute inset-0 pointer-events-none animate-shine bg-gradient-to-r from-transparent via-white to-transparent blur-lg opacity-90"></span>
        <span className="mr-1 text-gray-900">COMPATIBLE CON TU INFRAESTRUCTURA:</span>
      </h1>

      {/* DESCRIPCIÓN */}
      <p className="max-w-2xl text-gray-700 text-sm lg:text-base leading-relaxed">
        GLYNNE gobierna, automatiza y optimiza tus procesos empresariales creando una capa de 
        inteligencia que se acopla directamente a tu ecosistema actual. No importa la tecnología 
        que uses: integramos nuestros modelos, nodos y microservicios sin fricciones, 
        manteniendo tu infraestructura tal como está y evitando depender de plataformas externas.
        <br /><br />
        GLYNNE IA, ESTA PLATAFORMA de desarrollo practico de agentes ia, es el mejor ejemplo: un sistema capaz de auditar, 
        diseñar flujos, crear automatizaciones, ejecutar procesos y adaptar su comportamiento a 
        las necesidades de cada empresa. Esa misma lógica es la que construimos para ti: 
        arquitecturas vivas, ajustables, capaces de gestionar tareas, analizar datos, coordinar 
        departamentos y operar como un centro de control inteligente que evoluciona junto a tu 
        organización.
      </p>
    </div>
  );
}
