"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import agentsData from "./ejm.json";

export default function AgentsGrid() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    setAgents(agentsData);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="w-full h-[90vh] p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 py-2 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Agentes Inteligentes (GLYNNE)
        </h2>
        <p className="text-sm text-gray-400">
          Mostrando {Math.min(visibleCount, agents.length)} de {agents.length}
        </p>
      </div>

      {/* Grid scrollable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {agents.slice(0, visibleCount).map((agent, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {agent.agent_name || "Agente sin nombre"}
              </h2>
              <p className="text-xs text-gray-500">
                <strong>Rol:</strong> {agent.rol || "-"}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Objetivo:</strong> {agent.objective || "-"}
              </p>
              {agent.specialty && (
                <p className="text-xs text-gray-500">
                  <strong>Especialidad:</strong> {agent.specialty}
                </p>
              )}
              <p className="text-xs text-gray-500">
                <strong>Negocio:</strong> {agent.business_info || "-"}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Mensaje:</strong> {agent.additional_msg || "-"}
              </p>
            </div>

            <div className="mt-3 flex justify-end text-gray-400">
              <Play
                className="w-6 h-6 cursor-pointer text-green-500 hover:text-green-700 transition-all duration-200"
                title="Ejecutar agente"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Botón “Ver más” */}
      {visibleCount < agents.length && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-black hover:bg-gray-800 text-white text-sm rounded-full shadow-md transition-all duration-200"
          >
            Ver más agentes
          </button>
        </div>
      )}
    </div>
  );
}
