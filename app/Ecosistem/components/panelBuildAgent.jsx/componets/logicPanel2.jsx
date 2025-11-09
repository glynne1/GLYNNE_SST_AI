"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaDatabase,
  FaProjectDiagram,
  FaCubes,
  FaMicrochip,
  FaTerminal,
  FaRocket,
} from "react-icons/fa";

import CardsAgent from "./cardsAgents";
import Tabla from "./AgentExponApi";
import Plantillas from "./AgntsCardsEjm";
import Diagrama from "./DiagramaFlujoFW";
import LogicPanel from "./logicPanel";
import Consola from "./consola";
import AgentStreaming from "./ageentStrriming";
import Flujo from "../../../../components/TransformerAnimation"; // 🧠 Nueva importación

export default function SideMenuAgent() {
  const [activeSection, setActiveSection] = useState("agents");

  const sections = [
    { id: "agents", label: "Tus modelos creados", icon: <FaRobot /> },
    { id: "plantillas", label: "Modelos predefinidos", icon: <FaCubes /> },
    { id: "streaming", label: "Agente Streaming", icon: <FaRocket /> },
    { id: "framework", label: "Crea tus agentes", icon: <FaMicrochip /> },
    { id: "api", label: "Gestión de API", icon: <FaDatabase /> },
    { id: "consola", label: "Consola de Control", icon: <FaTerminal /> },
    { id: "motor", label: "Motor Generativo", icon: <FaProjectDiagram /> },
    { id: "flujo", label: "Estructura de una red neuronal T", icon: <FaProjectDiagram /> }, // 🧠 Nueva sección
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "agents":
        return (
          <motion.div
            className="w-full h-full p-4 overflow-hidden flex flex-col "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
  
            </motion.h2>
            <div className="flex-1 overflow-hidden">
              <CardsAgent />
            </div>
          </motion.div>
        );

      case "api":
        return (
          <motion.div
            className="w-full h-full p-4 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-1 overflow-y-auto">
              <Tabla />
            </div>
          </motion.div>
        );

      case "plantillas":
        return (
          <motion.div
            className="w-full h-full p-4 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-1 overflow-y-auto">
              <Plantillas />
            </div>
          </motion.div>
        );

      case "framework":
        return (
          <motion.div
            className="w-full h-full p-0 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LogicPanel />
          </motion.div>
        );

      case "motor":
        return (
          <motion.div
            className="w-full h-full p-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Diagrama />
          </motion.div>
        );

      case "consola":
        return (
          <motion.div
            className="w-full h-full p-4 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-neutral-800 overflow-hidden text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
    
            </motion.h2>
            <div className="flex-1 overflow-y-auto">
              <Consola />
            </div>
          </motion.div>
        );

      case "streaming":
        return (
          <motion.div
            className="w-full h-full p-4 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-1 overflow-hidden">
              <AgentStreaming />
            </div>
          </motion.div>
        );

      case "flujo":
        return (
          <motion.div
            className="w-full h-full p-4 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight"
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >

            </motion.h2>
            <div className="flex-1 overflow-y-auto">
              <Flujo />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full bg-white overflow-hidden m-0 p-0">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-56 bg-white border-r border-gray-200 shadow-sm p-4 flex flex-col justify-between"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-4 gap-2"
        >
          <h1 className="text-center text-sm font-semibold text-gray-800 tracking-tight leading-tight">
            CENTRO DE DESARROLLO <span className="text-gray-400">GLYNNE</span>
          </h1>
          <img
            src="/logo2.png"
            alt="Logo GLYNNE"
            className="w-14 h-14 object-contain opacity-90"
          />
        </motion.div>

        {/* Botones del menú */}
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
          {sections.map((sec, index) => (
            <motion.button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-all duration-300 ${
                activeSection === sec.id
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md"
                  : "bg-white text-gray-700 hover:text-gray-900 border border-gray-100 shadow-inner"
              }`}
              transition={{ delay: 0.04 * index }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.04 * index }}
                className="text-sm"
              >
                {sec.icon}
              </motion.span>
              {sec.label}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-[10px] text-gray-400"
        >
          GLYNNE Ecosystem © {new Date().getFullYear()}
        </motion.div>
      </motion.aside>

      {/* Contenido principal */}
      <motion.main
        key={activeSection}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="flex-1 h-full overflow-hidden bg-white"
      >
        {renderContent()}
      </motion.main>
    </div>
  );
}
