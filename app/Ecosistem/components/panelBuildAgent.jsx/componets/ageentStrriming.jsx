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
  const [chatHistory, setChatHistory] = useState([]); // ✅ Historial del chat
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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
        loadConversation(formattedAgents[0]);
        setChatAgent(formattedAgents[0]);
      }
    } catch (err) {
      console.error("Error al cargar agentes:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cargar conversación del agente seleccionado
  const loadConversation = async (agent) => {
    const user = await getCurrentUser();
    if (!user) return;

    const { data } = await supabase
      .from("auditorias")
      .select("user_config")
      .eq("user_id", user.id)
      .eq("user_config->>agent_name", agent.agent_name)
      .single();

    if (data?.user_config?.conversation) {
      setChatHistory(data.user_config.conversation);
    } else {
      setChatHistory([]);
    }

    setChatAgent(agent);
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
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.6, repeat: isRefreshing ? Infinity : 0 }}
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </motion.div>
        </button>
      </div>

      {/* LISTA DE AGENTES */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-white overflow-x-auto">
        {loading ? (
          <p className="text-sm text-gray-400 italic">Cargando...</p>
        ) : (
          agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer ${
                chatAgent?.id === agent.id ? "bg-blue-600 text-white" : "bg-gray-50"
              }`}
              onClick={() => loadConversation(agent)}
            >
              <span>{agent.agent_name}</span>

              <Settings2
                className="w-4 h-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(agent, idx);
                }}
              />
              <Trash2
                className="w-4 h-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(agent.id);
                }}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* CHAT (con historial cargado) */}
      <div className="flex-1 overflow-hidden">
        {chatAgent ? (
          <AgentsChatStyled agent={chatAgent} initialMessages={chatHistory} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic">
            Selecciona un agente para iniciar chat.
          </div>
        )}
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <AgentForm
            agentData={selectedAgent.agent}
            onSave={handleSave}
            onCancel={() => setSelectedAgent(null)}
          />
        </div>
      )}
    </div>
  );
}
