"use client";

import { useEffect, useState } from "react";
import { Settings2, Trash2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import AgentForm from "./AgentEditModal";
import AgentsChatStyled from "./AgentEstado";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatAgent, setChatAgent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Guardamos historial por agente localmente
  const [chatHistories, setChatHistories] = useState({});

  // 🔥 NUEVO: guarda en Supabase solo la conversación del agente
  const saveChatToSupabase = async (agentId, messages) => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      // 1. Obtener el JSON actual del agente
      const { data, error: fetchError } = await supabase
        .from("auditorias")
        .select("user_config")
        .eq("id", agentId)
        .single();

      if (fetchError || !data) throw fetchError;

      // 2. Actualizar SOLO el campo conversation
      const updatedConfig = {
        ...data.user_config,
        conversation: messages,
      };

      // 3. Guardarlo nuevamente sin cambiar el resto
      await supabase
        .from("auditorias")
        .update({ user_config: updatedConfig })
        .eq("id", agentId);

    } catch (err) {
      console.error("❌ Error guardando conversación:", err);
    }
  };

  // 🔥 NUEVO: cada vez que cambie el chat del agente activo, lo guardamos
  useEffect(() => {
    if (chatAgent?.id && chatHistories[chatAgent.id]) {
      saveChatToSupabase(chatAgent.id, chatHistories[chatAgent.id]);
    }
  }, [chatHistories, chatAgent]);

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
      if (formattedAgents.length > 0 && !chatAgent) {
        setChatAgent(formattedAgents[0]);
      }
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
      if (chatAgent?.id === agentId) setChatAgent(null);
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

  return (
    <div className="w-full h-screen flex flex-col bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Agentes GLYNNE</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
          title="Actualizar lista"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", repeat: isRefreshing ? Infinity : 0 }}
          >
            <RotateCcw
              className={`w-5 h-5 ${isRefreshing ? "text-blue-600" : "text-gray-600"}`}
            />
          </motion.div>
        </button>
      </div>

      {/* LISTA DE AGENTES */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-white overflow-x-auto">
        {loading ? (
          <p className="text-sm text-gray-400 italic">Cargando agentes...</p>
        ) : agents.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No hay agentes creados.</p>
        ) : (
          agents.map((agent, idx) => (
            <motion.div
              key={agent.id || idx}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer transition-all ${
                chatAgent?.id === agent.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.03 }}
              onClick={() => setChatAgent(agent)}
            >
              <span className="font-medium truncate max-w-[160px]">
                {agent.agent_name || "Agente sin nombre"}
              </span>

              <div className="flex gap-2 text-sm">
                <Settings2
                  className="w-4 h-4 hover:text-yellow-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(agent, idx);
                  }}
                />
                <Trash2
                  className="w-4 h-4 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(agent.id);
                  }}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ✅ CHAT CON MEMORIA + GUARDADO EN SUPABASE */}
      <div className="flex-1 overflow-hidden">
        {chatAgent ? (
          <AgentsChatStyled
            agent={chatAgent}
            messages={chatHistories[chatAgent.id] || []}
            setMessages={(msgs) =>
              setChatHistories((prev) => ({
                ...prev,
                [chatAgent.id]: msgs,
              }))
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            Selecciona un agente para iniciar chat.
          </div>
        )}
      </div>

      {/* MODAL EDITAR AGENTE */}
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
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
    </div>
  );
}
