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

  // ✅ Guardamos mensajes localmente por agente
  const [chatHistories, setChatHistories] = useState({});

  // ✅ GUARDAR MENSAJE EN SUPABASE EN conversation[]
  const saveMessageToAgentChat = async (agentId, newMessage) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      // 1️⃣ Obtener config actual del agente
      const { data, error } = await supabase
        .from("auditorias")
        .select("user_config")
        .eq("id", agentId)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      const currentConfig = data.user_config;

      // 2️⃣ Agregar nuevo mensaje a conversation[]
      const updatedConversation = [
        ...(currentConfig.conversation || []),
        newMessage,
      ];

      const updatedConfig = {
        ...currentConfig,
        conversation: updatedConversation, // 👈 Solo modificamos esto
      };

      // 3️⃣ Guardamos el JSON actualizado
      const { error: updateError } = await supabase
        .from("auditorias")
        .update({ user_config: updatedConfig })
        .eq("id", agentId);

      if (updateError) throw updateError;

      console.log("✅ Mensaje guardado en Supabase");
    } catch (err) {
      console.error("❌ Error guardando mensaje:", err.message);
    }
  };

  // ✅ CARGAR AGENTES DESDE SUPABASE
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

      // Seleccionar el primero por defecto
      if (formattedAgents.length > 0 && !chatAgent) {
        setChatAgent(formattedAgents[0]);

        // Also load existing conversation into local state
        setChatHistories((prev) => ({
          ...prev,
          [formattedAgents[0].id]: formattedAgents[0].conversation || [],
        }));
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

  // ✅ ELIMINAR AGENTE
  const handleDelete = async (agentId) => {
    try {
      const confirmDelete = window.confirm(
        "¿Seguro que deseas eliminar este agente?"
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
          <p className="text-sm text-gray-400">Cargando...</p>
        ) : agents.length === 0 ? (
          <p className="text-sm text-gray-400">No hay agentes creados.</p>
        ) : (
          agents.map((agent, idx) => (
            <motion.div
              key={agent.id || idx}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer ${
                chatAgent?.id === agent.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setChatAgent(agent);
                setChatHistories((prev) => ({
                  ...prev,
                  [agent.id]: agent.conversation || [],
                }));
              }}
            >
              <span className="font-medium truncate">
                {agent.agent_name || "Agente sin nombre"}
              </span>

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

      {/* ✅ CHAT SIEMPRE VISIBLE */}
      <div className="flex-1 overflow-hidden">
        {chatAgent ? (
          <AgentsChatStyled
            agent={chatAgent}
            messages={chatHistories[chatAgent.id] || []}
            setMessages={(msgs) => {
              setChatHistories((prev) => ({
                ...prev,
                [chatAgent.id]: msgs,
              }));

              // 🔥 Guardamos el último mensaje en Supabase
              const lastMessage = msgs[msgs.length - 1];
              if (lastMessage) {
                saveMessageToAgentChat(chatAgent.id, lastMessage);
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Selecciona un agente para iniciar chat.
          </div>
        )}
      </div>

      {/* MODAL EDITAR AGENTE */}
      {selectedAgent && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center"
          onClick={() => setSelectedAgent(null)}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl p-8 w-[85vw] h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-6 text-xl"
              onClick={() => setSelectedAgent(null)}
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
