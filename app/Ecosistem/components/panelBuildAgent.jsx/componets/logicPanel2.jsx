'use client';

import { useState, useEffect } from "react";
import { TourProvider, useTour } from "@reactour/tour";
import { motion } from "framer-motion";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  FaRobot,
  FaDatabase,
  FaProjectDiagram,
  FaCubes,
  FaMicrochip,
  FaTerminal,
  FaRocket,
  FaCode,
  FaGoogle,
  FaPuzzlePiece,
} from "react-icons/fa";

import CardsAgent from "./cardsAgents";
import Tabla from "./AgentExponApi";
import Plantillas from "./AgntsCardsEjm";
import Diagrama from "./DiagramaFlujoFW";
import LogicPanel from "./logicPanel";
import Consola from "./consola";
import AgentStreaming from "./ageentStrriming";
import Flujo from "../../../../components/TransformerAnimation";
import GroqApiInfo from "./apiGroq";
import VsCodeMockEditor from "./editorTex";
import GenerarApiExterna from "./generarApiExterna";
import AppCards from "./AppsConected";
import EcosistemaPro from "./EcosistemaComponente";

/* ===========================
   WRAPPER: TourProvider
   =========================== */
export default function SideMenuAgentWrapper() {
  const steps = [
    {
      selector: "#btn-plantillas",
      content:
        "Aquí encuentras plantillas base y modelos de ejemplo listos para usar. Te permiten entender cómo funciona la arquitectura de GLYNNE sin tener que construir un agente desde cero. Úsalas para estudiar, probar o acelerar tu flujo de trabajo."
    },
    {
      selector: "#btn-framework",
      content:
        "Este módulo es el corazón del sistema. Aquí construyes tus propios agentes de IA desde cero, eligiendo el modelo, configurando la lógica interna, añadiendo herramientas, funciones y comportamientos inteligentes. Es donde diseñas cómo piensa y actúa tu agente."
    },
    {
      selector: "#btn-agents",
      content:
        "En esta sección se muestran todos los agentes que has creado dentro de tu Workspace. Puedes administrarlos, editarlos, probarlos y realizar ajustes en su comportamiento. Es tu centro de control general de agentes."
    },
    {
      selector: "#btn-streaming",
      content:
        "Activa el modo streaming para obtener respuestas en tiempo real, palabra por palabra, igual que los modelos avanzados tipo ChatGPT. Esto mejora la experiencia de uso y permite ver cómo razona el agente al instante."
    },
    {
      selector: "#btn-generarApi",
      content:
        "Desde aquí puedes exportar cualquier agente que hayas creado como una API totalmente funcional. GLYNNE te genera una URL + documentación y te permite integrarlo en aplicaciones externas, móviles, servidores o automatizaciones."
    },
    {
      selector: "#btn-ecosistemPro",
      content:
        "Este módulo conecta tus agentes al ecosistema completo de GLYNNE. Permite que tus modelos se comuniquen entre sí, compartan herramientas, trabajen en cadena y se integren con funciones avanzadas del sistema."
    },
    {
      selector: "#btn-appCards",
      content:
        "Aquí ves todas las aplicaciones, librerías, servicios y tecnologías disponibles para conectar tus agentes. Te muestra qué herramientas puede usar cada agente, desde APIs externas hasta servicios internos de GLYNNE."
    },
    {
      selector: "#btn-api",
      content:
        "En esta sección gestionas las llaves API de los modelos que usarás (Groq, OpenAI, Gemini, etc.). Sin estas llaves no podrás usar los modelos base. Aquí puedes añadir, actualizar o eliminar claves de proveedor."
    },
    {
      selector: "#btn-consola",
      content:
        "Este panel muestra logs internos del sistema, información técnica, errores, advertencias y todo lo que el agente procesa en tiempo real. Funciona como una consola de depuración para que entiendas qué está pasando detrás de escena."
    },
    {
      selector: "#btn-codigo",
      content:
        "Aquí se muestra el código generado automáticamente por la plataforma. Este código refleja cómo está construido tu agente (funciones, herramientas, llamadas a modelos, lógica interna). Útil para aprender, exportar o integrar en proyectos externos."
    },
    {
      selector: "#btn-flujo",
      content:
        "En este apartado puedes visualizar el flujo interno del modelo Transformer: tokenización, atención, embeddings, pasos de inferencia y procesamiento. Es una vista interactiva para entender cómo piensa un modelo de IA por dentro."
    },
  ];

  return (
    <TourProvider
      steps={steps}
      scrollSmooth
      styles={{
        popover: (base) => ({
          ...base,
          background: "#ffffff",
          color: "#000000",
          borderRadius: "20px",
          padding: "20px",
          border: "1px solid #e5e5e5",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          transform: "translate(250px, 50px)",
        }),
  
      maskWrapper: (base) => ({
        ...base,
        backdropFilter: "blur(50px)",      // ⭐ Blur limpio
        backgroundColor: "rgba(0,0,0,0.1)" // ⭐ Sin sombra fuerte
      }),
  
        arrow: (base) => ({
          ...base,
          color: "#000000",
        }),
      }}
    >
      <SideMenuAgent />
    </TourProvider>
  );
    }  

/* ===========================
   COMPONENTE PRINCIPAL
   =========================== */
function SideMenuAgent() {
  const { setIsOpen } = useTour();
  const [activeSection, setActiveSection] = useState("plantillas");
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimeout(() => setIsOpen(true), 300);
  };

  const sections = [
    { id: "plantillas", label: "Modelos predefinidos", icon: <FaCubes />, tourId: "btn-plantillas" },
    { id: "framework", label: "Crea tus agentes IA", icon: <FaMicrochip />, tourId: "btn-framework" },
    { id: "agents", label: "Tus modelos creados", icon: <FaRobot />, tourId: "btn-agents" },
    { id: "streaming", label: "Streaming con tus agentes", icon: <FaRocket />, tourId: "btn-streaming" },
    { id: "generarApi", label: "Exporta tus agentes", icon: <IoCloudDownloadOutline />, tourId: "btn-generarApi" },
    { id: "ecosistemPro", label: "Integra a tu ecosistema", icon: <FaGoogle />, tourId: "btn-ecosistemPro" },
    { id: "appCards", label: "Tecnologías compatibles", icon: <FaPuzzlePiece />, tourId: "btn-appCards" },
    { id: "api", label: "Llaves de modelos", icon: <FaDatabase />, tourId: "btn-api" },
    { id: "consola", label: "Consola de info", icon: <FaTerminal />, tourId: "btn-consola" },
    { id: "codigo", label: "Código IA", icon: <FaCode />, tourId: "btn-codigo" },
    { id: "flujo", label: "Mapa red Transformer", icon: <FaProjectDiagram />, tourId: "btn-flujo" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "agents": return <CardsAgent />;
      case "api": return <Tabla />;
      case "plantillas": return <Plantillas />;
      case "framework": return <LogicPanel />;
      case "motor": return <Diagrama />;
      case "consola": return <Consola />;
      case "streaming": return <AgentStreaming />;
      case "flujo": return <Flujo />;
      case "getKey": return <GroqApiInfo />;
      case "codigo": return <VsCodeMockEditor />;
      case "generarApi": return <GenerarApiExterna />;
      case "ecosistemPro": return <EcosistemaPro />;
      case "appCards": return <AppCards />;
      default: return null;
    }
  };

  return (
    <div className="relative">

     {/* =======================
      POPUP DE API KEY
======================= */}
{showPopup && (
  <div
    className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-[9999] p-4"
    onClick={handleClosePopup}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                 p-8 rounded-3xl w-full max-w-md relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Cerrar */}
      <button
        onClick={handleClosePopup}
        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-xl font-bold"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Título principal */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center leading-tight">
        Antes de continuar
      </h2>

      {/* Texto descripción */}
      <p className="text-base text-gray-700 text-center mb-4 leading-relaxed">
        Necesitas crear tu <span className="font-semibold">API Key de GROQ</span> en nuestra capa gratuita antes de seguir.
      </p>
   


      {/* Enlace */}
      <a
        href="https://console.groq.com/keys"
        target="_blank"
        className="block text-center text-blue-700 font-medium underline mb-6 text-base hover:text-blue-900"
      >
        Ir a GROQ Console
      </a>

      {/* Label */}
      <label className="text-sm font-semibold text-gray-800 mb-2 block text-center">
        Si ya tienes tu API Key puedes continuar
      </label>

      {/* Botón */}
      <div className="mt-5 flex justify-center">
        <button
          onClick={handleClosePopup}
          className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Continuar
        </button>
      </div>
    </motion.div>
  </div>
)}

      {/* =======================
           CONTENIDO PRINCIPAL
      ======================= */}
      <div className="flex h-full w-full bg-white">

        {/* SIDEBAR */}
        <aside className="w-56 bg-white border-r border-gray-200 shadow-sm p-4 flex flex-col">

          <h1 className="text-center text-sm font-semibold text-gray-800 mb-2">
            CENTRO DE DESARROLLO
          </h1>

          <img src="/logo2.png" className="w-14 h-14 mx-auto mb-4 opacity-80" />

          <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
            {sections.map((sec) => (
              <motion.button
                id={sec.tourId}
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-all ${
                  activeSection === sec.id
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                    : "bg-white text-gray-700 hover:text-gray-900 border border-gray-100"
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="text-center text-[10px] text-gray-400 mt-4">
            GLYNNE Ecosystem © {new Date().getFullYear()}
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4 bg-white">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}
