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

  // Guardado local de conversaciones por agente
  const [chatHistories, setChatHistories] = useState({});

  // ✅ GUARDAR MENSAJE EN SUPABASE (sin borrar lo anterior)
  const saveMessageToAgentChat = async (agentId, newMessage) => {
    try {
      if (!newMessage?.content?.trim()) return; // no guardar mensajes vacíos

      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("auditorias")
        .select("user_config")
        .eq("id", agentId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) throw new Error("No se encontró el agente.");

      const currentConfig = data.user_config || {};

      const updatedConversation = [
        ...(Array.isArray(currentConfig.conversation) ? currentConfig.conversation : []),
        newMessage,
      ];

      const updatedConfig = {
        ...currentConfig,
        conversation: updatedConversation,
      };

      const { error: updateError } = await supabase
        .from("auditorias")
        .update({ user_config: updatedConfig })
        .eq("id", agentId)
        .eq("user_id", user.id)
        .select();

      if (updateError) throw updateError;

      // ✅ Actualiza UI en tiempo real también
      setChatHistories((prev) => ({
        ...prev,
        [agentId]: updatedConversation,
      }));

      console.log("✅ Mensaje guardado en Supabase");
    } catch (err) {
      console.error("❌ Error guardando mensaje:", err.message);
    }
  };

  // ✅ CARGAR AGENTES
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

  const handleDelete = async (agentId) => {
    try {
      if (!window.confirm("¿Seguro que deseas eliminar este agente?")) return;

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
    <div className="w-full h-screen flex flex-col bg-white rounded-2xl border shadow-md overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-lg font-bold">Agentes GLYNNE</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border"
        >
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.6, repeat: isRefreshing ? Infinity : 0 }}>
            <RotateCcw className="w-5 h-5" />
          </motion.div>
        </button>
      </div>

      {/* LISTA DE AGENTES */}
      <div className="flex gap-2 p-3 border-b overflow-x-auto">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer ${
                chatAgent?.id === agent.id ? "bg-blue-600 text-white" : "bg-gray-50"
              }`}
              onClick={() => {
                setChatAgent(agent);
                setChatHistories((prev) => ({
                  ...prev,
                  [agent.id]: agent.conversation || [],
                }));
              }}
            >
              <span>{agent.agent_name || "Sin nombre"}</span>

              <Settings2 className="w-4" onClick={(e) => { e.stopPropagation(); handleEdit(agent, idx); }}/>
              <Trash2 className="w-4" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }}/>
            </motion.div>
          ))
        )}
      </div>

      {/* ✅ CHAT */}
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
              const last = msgs[msgs.length - 1];
              if (last) saveMessageToAgentChat(chatAgent.id, last);
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Selecciona un agente para chatear
          </div>
        )}
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[85vw] h-[85vh]">
            <button className="absolute top-4 right-6" onClick={() => setSelectedAgent(null)}>✖</button>
            <AgentForm agentData={selectedAgent.agent} onSave={handleSave} onCancel={() => setSelectedAgent(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
