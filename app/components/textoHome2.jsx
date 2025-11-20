"use client";

import React from "react";

export default function GlynneIntro() {
  return (
    <div className="w-full flex flex-col items-center text-center px-6 py-12">
      {/* TÍTULO */}
      <h1 className="relative overflow-hidden text-2xl lg:text-3xl mb-6 leading-snug text-gray-900 font-extrabold">
        <span className="absolute inset-0 pointer-events-none animate-shine bg-gradient-to-r from-transparent via-white to-transparent blur-lg opacity-90"></span>
        <span className="mr-1 text-gray-900">PUEDES USARLO CON:</span>
      </h1>

      {/* DESCRIPCIÓN */}
      <p className="max-w-2xl text-gray-700 text-base lg:text-lg leading-relaxed">
        GLYNNE es un ecosistema creado para conectar inteligencia artificial con cualquier tipo de tecnología. 
        No importa si tu arquitectura está construida en Python, Node, Java, Go, PHP, .NET, Ruby, servicios en la nube o sistemas heredados: 
        nuestra plataforma se acopla sin fricción.  
        Diseñamos cada integración para que tus modelos funcionen como microservicios escalables, fáciles de orquestar y listos para producción en cualquier entorno.
      </p>
    </div>
  );
}
