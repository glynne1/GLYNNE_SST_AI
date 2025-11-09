"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import AgentConfigPanel from "./logicPanel2";

export default function CreateAgentPanel() {
  const [open, setOpen] = useState(true); // abierto por defecto

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex flex-col justify-between items-center h-screen min-h-screen z-50 bg-white ">
      {/* Contenedor principal */}
      <div className="relative flex flex-col w-full max-w-[100%] h-full justify-center items-center">
        {/* Botón de cerrar */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl transition-all"
        >
          <FaTimes />
        </button>

        {/* Panel de configuración */}
        <div className="flex-1 w-full m-0 p-0  flex items-center justify-center">
          <AgentConfigPanel />
        </div>
      </div>

      {/* Leyenda inferior */}
      <div className="w-full text-center py-4 text-gray-500 text-sm tracking-wide">
        © GLYNNE 2025 - Innovación impulsada por inteligencia artificial
      </div>
    </div>
  );
}
