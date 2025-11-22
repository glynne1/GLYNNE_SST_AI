"use client";

import { useEffect, useState } from "react";
import { Play, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveUserAgentConfig } from "./saveSupabaseAgent";

// Importación por defecto del primer JSON
import agentsData from "./ejm.json";

export default function AgentsGrid() {
  const [visibleCount, setVisibleCount] = useState(20);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [apiKeyModal, setApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // 🔥 Estado del modelo seleccionado
  const [modelType, setModelType] = useState("easy"); // easy | corporativos

  // 🔥 Función para limitar palabras
  function limitWords(text, maxWords = 14) {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " ...";
  }

  // 🔥 Cargar data según lo que el usuario seleccione
  useEffect(() => {
    async function loadModels() {
      try {
        if (modelType === "easy") {
          const mod = await import("./ejm2.json");
          setAgents(mod.default);
        } else {
          const mod = await import("./ejm.json");
          setAgents(mod.default);
        }
      } catch (error) {
        console.error("Error cargando JSON:", error);
      }
    }

    loadModels();
  }, [modelType]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 4);
  const openAgentModal = (agent) => setSelectedAgent(agent);
  const closeAgentModal = () => setSelectedAgent(null);

  const handlePlayClick = (agent) => {
    setSelectedAgent(agent);
    setApiKeyModal(true);
    setApiKey("");
    setStatus("");
  };

  const handleSaveToSupabase = async () => {
    const agent = selectedAgent;
    if (!agent) {
      setStatus("❌ No se ha seleccionado un agente");
      return;
    }

    if (!apiKey.trim()) {
      setStatus("❌ Debes ingresar una API key válida");
      return;
    }

    setSaving(true);
    setStatus("Guardando en Supabase...");

    try {
      const form = {
        api_key: apiKey,
        model: agent.model || "llama-3.3-70b-versatile",
        rol: agent.rol || "",
        agent_name: agent.agent_name || "",
        specialty: agent.specialty || "",
        business_info: agent.business_info || "",
        objective: agent.objective || "",
        additional_msg: agent.additional_msg || "",
      };

      await saveUserAgentConfig(form);

      setStatus("✅ Configuración guardada correctamente");
      setTimeout(() => {
        setApiKeyModal(false);
        setApiKey("");
        setStatus("");
      }, 1200);
    } catch (err) {
      console.error("Error saving agent to Supabase:", err);
      setStatus("⚠️ Error al guardar: " + (err.message || String(err)));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[90vh] p-0 bg-white rounded-2xl border border-gray-300 shadow-md relative overflow-y-auto">
      
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-white/50 px-4 py-2 border-b border-gray-200">

        <h2 className="text-lg font-bold text-gray-800 m-0">
          Agentes Predefinidos
        </h2>

        <div className="flex items-center space-x-4">

          {/* 🔥 SELECTOR DERECHO */}
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="text-xs px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700"
          >
            <option value="easy">Corporativos</option>
            <option value="corporativos">Easy Models</option>
          </select>

          <p className="text-xs text-gray-400 m-0">
            Mostrando {Math.min(visibleCount, agents.length)} de {agents.length}
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-3 p-4">
        {agents.slice(0, visibleCount).map((agent, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 text-left text-xs"
          >
            <div className="w-full flex justify-center mb-2">
              <img
                src={agent.avatar}
                alt={agent.agent_name}
                className="w-32 h-32 rounded-full border-2 border-black object-contain bg-white p-1"
              />
            </div>

            <div className="space-y-1 text-left">
              <h2 className="text-sm font-semibold text-gray-800 truncate text-center">
                {agent.agent_name || "Agente sin nombre"}
              </h2>

              {/* LIMITAMOS TODOS LOS CAMPOS A 7 PALABRAS */}
              <p className="text-[11px] text-gray-500">
                <strong>Rol:</strong> {limitWords(agent.rol, 7)}
              </p>

              <p className="text-[11px] text-gray-500">
                <strong>Objetivo:</strong> {limitWords(agent.objective, 7)}
              </p>

              {agent.specialty && (
                <p className="text-[11px] text-gray-500">
                  <strong>Especialidad:</strong> {limitWords(agent.specialty, 7)}
                </p>
              )}
              
              <p className="text-[11px] text-gray-500">
                <strong>Negocio:</strong> {limitWords(agent.business_info, 7)}
              </p>

              <p className="text-[11px] text-gray-500">
                <strong>Mensaje:</strong> {limitWords(agent.additional_msg, 7)}
              </p>
            </div>

            <div className="mt-3 flex space-x-3 justify-center">
              <Plus
                className="w-5 h-5 cursor-pointer text-green-500 hover:text-green-700 transition-all duration-200"
                onClick={() => openAgentModal(agent)}
              />
              <Play
                className="w-5 h-5 cursor-pointer text-black hover:text-green-600 transition-all duration-200"
                onClick={() => handlePlayClick(agent)}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < agents.length && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={handleShowMore}
            className="px-5 py-2 bg-black hover:bg-gray-800 text-white text-sm rounded-full shadow-md transition-all duration-200"
          >
            Ver más agentes
          </button>
        </div>
      )}

      {/* MODAL API KEY */}
      <AnimatePresence>
        {apiKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 250, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
            >
              <button
                onClick={() => setApiKeyModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-bold mb-3 text-gray-800">
                Ingresa tu API Key para ejecutar
              </h3>

              <input
                type="password"
                placeholder="Introduce tu clave API"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 mb-3"
              />

              {status && <p className="text-xs text-gray-600 mb-2">{status}</p>}

              <button
                onClick={handleSaveToSupabase}
                disabled={saving}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                  saving ? "bg-gray-400 text-white" : "bg-black hover:bg-gray-800 text-white"
                }`}
              >
                {saving ? "Guardando..." : "Guardar y ejecutar agente"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DETALLES AGENTE */}
      <AnimatePresence>
        {selectedAgent && !apiKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative text-left text-sm flex flex-col items-start"
            >
              <button
                onClick={closeAgentModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
              >
                ✕
              </button>

              <div className="w-full flex justify-center mb-6">
                <img
                  src={selectedAgent.avatar}
                  alt={selectedAgent.agent_name}
                  className="w-32 h-32 rounded-full border-2 border-black object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold mb-3">{selectedAgent.agent_name}</h2>

              <div className="space-y-2 w-full">
                <p><strong>Rol:</strong> {selectedAgent.rol || "-"}</p>
                <p><strong>Objetivo:</strong> {selectedAgent.objective || "-"}</p>
                {selectedAgent.specialty && <p><strong>Especialidad:</strong> {selectedAgent.specialty}</p>}
                <p><strong>Negocio:</strong> {selectedAgent.business_info || "-"}</p>
                <p><strong>Mensaje:</strong> {selectedAgent.additional_msg || "-"}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
