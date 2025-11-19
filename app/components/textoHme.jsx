"use client";

import React from "react";

export default function GlynneIntro() {
  return (
    <div className="w-full flex flex-col items-center text-center px-6 py-12">
      {/* TÍTULO */}
      <h1 className="relative overflow-hidden text-2xl lg:text-3xl mb-6 leading-snug text-gray-900 font-extrabold">
        <span className="absolute inset-0 pointer-events-none animate-shine bg-gradient-to-r from-transparent via-white to-transparent blur-lg opacity-90"></span>
        <span className="mr-1 text-gray-900">INTEGRA TUS MODELOS A:</span>
      </h1>

      {/* DESCRIPCIÓN */}
      <p className="max-w-2xl text-gray-700 text-base lg:text-lg leading-relaxed">
        GLYNNE es una plataforma diseñada para desarrolladores que buscan crear, escalar e integrar modelos de IA directamente en sus aplicaciones. Proporciona un ecosistema de herramientas, frameworks y arquitecturas modernas para que cada modelo funcione como un microservicio listo para producción.
      </p>

   
    </div>
  );
}
