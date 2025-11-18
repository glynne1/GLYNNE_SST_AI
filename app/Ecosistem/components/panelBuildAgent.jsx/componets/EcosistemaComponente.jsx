"use client";

import React, { useState } from "react";
import CarouselLogos from "../componets/LogosCarrucel";
import PricingCards from "../componets/cardPricingPro"; // <--- IMPORTANTE

const EcosistemaComponente = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div
      className="relative h-[90vh] p-8 text-center flex flex-col justify-center items-center overflow-hidden bg-white"
    >
      {/* ================= POPUP ================= */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">

          {/* MODAL 90% VIEWPORT */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center 
                          w-[100vw] h-[100vh] max-w-7xl overflow-auto relative">

            {/* BOTÓN X EN LA ESQUINA */}
            <button
              onClick={() => setOpenPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ✕
            </button>


      

            {/* ======= AQUI VA EL COMPONENTE DE PRECIOS ======= */}
            <div className="mt-4">
              <PricingCards />
            </div>

          </div>
        </div>
      )}

      {/* ================= CONTENIDO ================= */}
      <div className="relative w-full max-w-5xl px-4">
        
        {/* TÍTULO */}
        <h1 className="relative overflow-hidden text-2xl lg:text-3xl mb-6 leading-snug text-gray-900 font-extrabold">
          <span className="absolute inset-0 pointer-events-none animate-shine bg-gradient-to-r from-transparent via-white to-transparent blur-lg opacity-90"></span>
          <span className="mr-1 text-gray-900">INTEGRA TUS MODELOS A:</span>
        </h1>

        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(150%); }
          }
          .animate-shine {
            animation: shine 2.5s linear infinite;
          }
        `}</style>

        {/* CARRUSEL LOGOS */}
        <div className="mb-6">
          <CarouselLogos />
        </div>

        {/* DESCRIPCIÓN */}
        <p className="text-sm max-w-2xl mx-auto mb-8 text-gray-600 leading-relaxed">
          Integra tus modelos de inteligencia artificial de forma nativa.
          Despliega, gestiona y escala tus soluciones IA en un entorno unificado
          para maximizar la eficiencia operativa y la toma de decisiones.
        </p>

        {/* BOTONES */}
        <div className="flex justify-center gap-3 text-sm mb-8">

          {/* BOTÓN AZUL — ABRE POPUP */}
          <button
            onClick={() => setOpenPopup(true)}
            className="px-4 py-2 font-bold rounded-lg cursor-pointer bg-blue-600 text-white transition duration-300 hover:bg-blue-700"
          >
            Empezar Ahora
          </button>

          {/* BOTÓN GRIS */}
          <button
            className="px-4 py-2 font-bold rounded-lg cursor-pointer border-2 border-gray-400 text-gray-700 transition duration-300 hover:bg-gray-200"
          >
            Ver Demo
          </button>

        </div>
      </div>
    </div>
  );
};

export default EcosistemaComponente;
