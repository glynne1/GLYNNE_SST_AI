"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AgentConfigPanel from "./logicPanel2";

export default function CreateAgentPanel() {
  const [open, setOpen] = useState(true); // abierto por defecto

  if (!open) return null; // 🔹 Si se cierra, no renderiza nada

  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center overflow-y-auto z-50">
      {/* Contenedor principal */}
      <div className="relative w-full max-w-[100%] mt-0 rounded-2xl ">
        {/* Botón de cerrar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl transition-all"
        >
          <FaTimes />
        </button>
        
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
