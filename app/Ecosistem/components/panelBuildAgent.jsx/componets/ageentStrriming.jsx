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
  const [chatHistory, setChatHistory] = useState([]);
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
    <div className="w-full h-[80vh] flex flex-col bg-white overflow-hidden text-xs">

      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#E5E5E5] bg-white">
        <h2 className="text-sm font-semibold tracking-tight text-black">Agentes GLYNNE</h2>

        <button
          onClick={handleRefresh}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.6, repeat: isRefreshing ? Infinity : 0 }}
          >
            <RotateCcw className="w-3 h-3" />
          </motion.div>
        </button>
      </div>

      {/* LISTA DE AGENTES */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-[#E5E5E5] overflow-x-auto no-scrollbar">
        {loading ? (
          <p className="text-[0.65rem] text-gray-400">Cargando...</p>
        ) : (
          agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[0.65rem] cursor-pointer transition-all ${
                chatAgent?.id === agent.id
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 text-black hover:bg-gray-100"
              }`}
              onClick={() => loadConversation(agent)}
            >
              <span className="truncate max-w-[100px] font-medium">
                {agent.agent_name}
              </span>

              <Settings2
                className="w-3 h-3 hover:opacity-60"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(agent, idx);
                }}
              />

              <Trash2
                className="w-3 h-3 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(agent.id);
                }}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* CHAT CONTENEDOR */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#fff] overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col bg-white h-full max-h-[96vh] rounded-xl shadow-sm">

          {/* CHAT INTERNO SCROLLEABLE */}
          <div className="flex-1 overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-300">
            {chatAgent ? (
              <AgentsChatStyled agent={chatAgent} initialMessages={chatHistory} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-[0.65rem]">
                Selecciona un agente para iniciar chat
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL EDITAR AGENTE */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            className="
              bg-white 
              rounded-2xl 
              shadow-2xl 
              p-3 
              w-[96vw] 
              h-[96vh] 
              max-w-[1200px] 
              flex 
              flex-col 
              overflow-hidden 
              transition-all 
              duration-300 
              ease-in-out
            "
          >
            {/* Cabecera del modal */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-bold text-gray-800">
                Editar Agente
              </h2>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-500 hover:text-gray-800 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-1">
              <AgentForm
                agentData={selectedAgent.agent}
                onSave={handleSave}
                onCancel={() => setSelectedAgent(null)}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
