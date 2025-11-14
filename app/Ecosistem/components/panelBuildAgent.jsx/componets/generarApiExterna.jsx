"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  RotateCcw,
  KeyRound,
  Eye,
  EyeOff,
  Copy
} from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import AgentForm from "./AgentEditModal";
import AgentsChatStyled from "./AgentEstado";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

// Generador de API Keys
function generateRandomApiKey() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "pub_";
  for (let i = 0; i < 48; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [openChatPopup, setOpenChatPopup] = useState(false);
  const [chatAgent, setChatAgent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 ESTADO DEL MODAL PARA LA API KEY
  const [apiKeyModal, setApiKeyModal] = useState({
    open: false,
    key: "",
  });
  const [showKey, setShowKey] = useState(false);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("auditorias")
        .select("id, user_config")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) throw error;

      const formattedAgents =
        data?.map((item) => ({
          id: item.id,
          ...item.user_config,
        })) || [];

      setAgents(formattedAgents);
    } catch (err) {
      console.error("Error al cargar agentes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAgents();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleDelete = async (agentId) => {
    try {
      const confirmDelete = window.confirm(
        "¿Seguro que deseas eliminar este agente? Esta acción no se puede deshacer."
      );
      if (!confirmDelete) return;

      const { error } = await supabase
        .from("auditorias")
        .delete()
        .eq("id", agentId);

      if (error) throw error;

      setAgents((prev) => prev.filter((a) => a.id !== agentId));
    } catch (err) {
      console.error("❌ Error al eliminar agente:", err);
      alert("Hubo un error al eliminar el agente. Revisa la consola.");
    }
  };

  const handleEdit = (agent, index) => {
    setSelectedAgent({ index, agent });
  };

  const handleSave = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a, i) => (i === selectedAgent.index ? updatedAgent : a))
    );
    setSelectedAgent(null);
  };

  // 🔥 NUEVO → Crear y mostrar API KEY en modal
  const handleCreateApiKey = async (agent) => {
    try {
      const newKey = generateRandomApiKey();

      const { error } = await supabase
        .from("auditorias")
        .update({
          user_config: {
            ...agent,
            public_api_key: newKey,
          },
        })
        .eq("id", agent.id);

      if (error) throw error;

      setApiKeyModal({ open: true, key: newKey });
      setShowKey(false); // siempre iniciará oculta

      fetchAgents();
    } catch (err) {
      console.error("❌ Error generando API pública:", err);
      alert("Hubo un error al crear la API Key. Revisa la consola.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKeyModal.key);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative h-[90vh] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Agentes GLYNNE creados
        </h2>

        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
          title="Actualizar lista"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: isRefreshing ? Infinity : 0,
            }}
          >
            <RotateCcw
              className={`w-5 h-5 ${
                isRefreshing ? "text-blue-600" : "text-gray-600"
              }`}
            />
          </motion.div>
        </button>
      </div>

      {/* ZONA SCROLLABLE */}
      <div className="flex-1 overflow-y-auto pr-2">

        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic">Cargando agentes...</p>
          </div>
        ) : !agents || agents.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic">
              Aquí podrás visualizar tus modelos IA creados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <div
                key={agent.id || idx}
                className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col justify-between w-full h-[200px] hover:shadow-2xl transition-all"
              >
                <div className="space-y-1 overflow-hidden">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {agent.agent_name || "Agente sin nombre"}
                  </h2>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Rol:</strong> {agent.rol || "-"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Objetivo:</strong> {agent.objective || "-"}
                  </p>
                  {agent.specialty && (
                    <p className="text-xs text-gray-500 truncate">
                      <strong>Especialidad:</strong> {agent.specialty}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Información del negocio:</strong>{" "}
                    {agent.business_info || "-"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Mensaje adicional:</strong>{" "}
                    {agent.additional_msg || "-"}
                  </p>
                </div>

                {/* ICONOS */}
                <div className="mt-3 flex justify-end space-x-4 text-gray-400">

                  <KeyRound
                    className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => handleCreateApiKey(agent)}
                    title="Crear API Key pública"
                  />

                  <Trash2
                    className="w-5 h-5 cursor-pointer stroke-red-500 hover:stroke-red-700 transition-all"
                    onClick={() => handleDelete(agent.id)}
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL API KEY 🌟 */}
      <AnimatePresence>
        {apiKeyModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setApiKeyModal({ open: false, key: "" })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md flex flex-col items-center relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                API Key creada
              </h2>

              <div className="w-full bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                <span className="font-mono text-sm text-gray-700 truncate">
                  {showKey ? apiKeyModal.key : "••••••••••••••••••••••••"}
                </span>

                <div className="flex items-center space-x-3">
                  {showKey ? (
                    <EyeOff
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={() => setShowKey(false)}
                    />
                  ) : (
                    <Eye
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={() => setShowKey(true)}
                    />
                  )}

                  <Copy
                    className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={copyToClipboard}
                  />
                </div>
              </div>

              <button
                onClick={() => setApiKeyModal({ open: false, key: "" })}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition-all"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL EDITAR */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setSelectedAgent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl p-8 w-[85vw] h-[85vh] overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✖
              </button>
              <AgentForm
                agentData={selectedAgent.agent}
                onSave={handleSave}
                onCancel={() => setSelectedAgent(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CHAT (sin cambios) */}
      <AnimatePresence>
        {openChatPopup && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setOpenChatPopup(false)}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl w-[90vw] h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenChatPopup(false)}
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl z-50"
              >
                ✖
              </button>

              <div className="flex-1 w-full h-full overflow-y-auto">
                <AgentsChatStyled agent={chatAgent} />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
