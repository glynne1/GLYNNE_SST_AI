"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AgentConfigPanel from "./logicPanel";
import Tabla from './AgentExponApi'

import CardsAgent from './cardsAgents'
export default function CreateAgentPanel() {
  const [open, setOpen] = useState(true); // abierto por defecto

  if (!open) return null; // 🔹 Si se cierra, no renderiza nada

  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center overflow-y-auto z-50">
      {/* Contenedor principal */}
      <div className="relative w-full max-w-[90%] mt-0 rounded-2xl ">
        {/* Botón de cerrar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl transition-all"
        >
          <FaTimes />
        </button>
      
{/* Contenedor principal */}
<h2 className="text-neutral-800 text-3xl md:text-4xl font-extrabold mb-2 tracking-widest">
                  PANEL DE <span className="text-gray-500">DESARROLLO IA</span>
                </h2>
            
<div className="w-full h-[60vh] p-8 bg-white rounded-2xl overflow-y-hidden">

    {/* Contenedor principal */}
    <CardsAgent />
  </div>


  <div className="w-full h-[90vh] p-8 bg-white rounded-2xl overflow-y-hidden">

{/* Contenedor principal */}
<Tabla />
</div>
        {/* Componente principal */}
        <AgentConfigPanel />
      </div>

      {/* Leyenda inferior */}
      <div className="w-full text-center mt-12 mb-6 text-gray-500 text-sm tracking-wide">
        © GLYNNE 2025 - Innovación impulsada por inteligencia artificial
      </div>
    </div>
  );
}
