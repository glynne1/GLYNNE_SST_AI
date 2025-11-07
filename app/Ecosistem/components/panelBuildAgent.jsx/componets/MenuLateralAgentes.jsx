"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaRobot, FaDatabase, FaProjectDiagram, FaCubes, FaMicrochip 
} from "react-icons/fa";

import CardsAgent from "./cardsAgents";
import Tabla from "./AgentExponApi";
import Plantillas from "./AgntsCardsEjm";
import Diagrama from "./DiagramaFlujoFW";

export default function SideMenuAgent() {
  const [activeSection, setActiveSection] = useState("agents");

  // Configuración de las secciones
  const sections = [
    { id: "agents", label: "Agentes Inteligentes", icon: <FaRobot /> },
    { id: "api", label: "Gestión de API", icon: <FaDatabase /> },
    { id: "plantillas", label: "Plantillas", icon: <FaCubes /> },
    { id: "motor", label: "Motor Generativo", icon: <FaProjectDiagram /> },
    { id: "framework", label: "Framework IA", icon: <FaMicrochip /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "agents":
        return (
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold mb-3">Panel de Agentes Inteligentes</h2>
            <CardsAgent />
          </div>
        );
      case "api":
        return (
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold mb-3">Gestión de API</h2>
            <Tabla />
          </div>
        );
      case "plantillas":
        return (
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold mb-3">Plantillas de Configuración</h2>
            <Plantillas />
          </div>
        );
      case "motor":
        return (
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold mb-3">Motor Generativo</h2>
            <Diagrama />
          </div>
        );
      case "framework":
        return (
          <div className="w-full p-6 text-sm text-gray-600">
            <p>Sección dedicada a la visualización del framework de agentes GLYNNE y sus componentes base.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between"
      >
        <div>
          <h1 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
            ⚙️ Centro GLYNNE
          </h1>
          <div className="flex flex-col gap-3">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                  activeSection === sec.id
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-base">{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          GLYNNE Ecosystem © {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* Contenido dinámico */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
