"use client";

import { useEffect, useState } from "react";
import { Settings2, Trash2, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import AgentForm from "./AgentEditModal";
import AgentsChatStyled from "./AgentEstado";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";
import { updateUserAgentConfig } from "./updateAgentConfig"; // ✅ import del módulo nuevo

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [chatAgent, setChatAgent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [chatHistories, setChatHistories] = useState({});

  // ✅ GUARDA 1 MENSAJE NUEVO SOLO EN "conversation" DEL JSON
  const pushMessage = async (agentId, message) => {
    try {
      if (!message?.content?.trim()) return;
      const user = await getCurrentUser();
      if (!user) return;

      // Obtener conversación actual del agente
      const { data } = await supabase
        .from("auditorias")
        .select("user_config")
        .eq("id", agentId)
        .eq("user_id", user.id)
        .single();

      const current = data?.user_config?.conversation || [];

      // Evitar duplicados
      const lastMsg = current[current.length - 1];
      if (lastMsg?.content === message.content && lastMsg?.role === message.role) {
        return;
      }

      // Agregar mensaje al array
      const updated = [...current, message];

      // ✅ Actualiza solo la parte de conversation en Supabase
      await updateUserAgentConfig(agentId, { conversation: updated });

      // ✅ Actualiza también el estado local
      setChatHistories(prev => ({
        ...prev,
        [agentId]: updated
      }));

    } catch (err) {
      console.error("Error guardando mensaje:", err);
    }
  };

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) return;

      const { data } = await supabase
        .from("auditorias")
        .select("id, user_config")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      const formatted = data?.map(item => ({
        id: item.id,
        ...item.user_config,
      })) || [];

      setAgents(formatted);

      if (formatted.length > 0 && !chatAgent) {
        setChatAgent(formatted[0]);
        setChatHistories(prev => ({
          ...prev,
          [formatted[0].id]: formatted[0].conversation || []
        }));
      }
    } catch (err) {
      console.error(err);
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
    if (!confirm("¿Eliminar agente?")) return;
    await supabase.from("auditorias").delete().eq("id", agentId);
    setAgents(a => a.filter(x => x.id !== agentId));
    if (chatAgent?.id === agentId) setChatAgent(null);
  };

  const handleEdit = (agent, index) => {
    setSelectedAgent({ index, agent });
  };

  const handleSave = (updatedAgent) => {
    setAgents(prev =>
      prev.map((a, i) => i === selectedAgent.index ? updatedAgent : a)
    );
    setSelectedAgent(null);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white rounded-2xl border shadow-md overflow-hidden">

      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-lg font-bold">Agentes GLYNNE</h2>
        <button onClick={handleRefresh} className="w-9 h-9 rounded-full border flex items-center justify-center">
          <motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.6, repeat: isRefreshing ? Infinity : 0 }}>
            <RotateCcw className="w-5 h-5" />
          </motion.div>
        </button>
      </div>

      <div className="flex gap-2 p-3 border-b overflow-x-auto">
        {loading ? "Cargando..." : agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            className={`flex items-center gap-3 px-4 py-2 border rounded-xl cursor-pointer ${chatAgent?.id === agent.id ? "bg-blue-600 text-white" : "bg-gray-50"}`}
            onClick={() => {
              setChatAgent(agent);
              setChatHistories(prev => ({
                ...prev,
                [agent.id]: agent.conversation || []
              }));
            }}
          >
            {agent.agent_name || "Sin nombre"}
            <Settings2 className="w-4" onClick={(e) => { e.stopPropagation(); handleEdit(agent, i); }} />
            <Trash2 className="w-4" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }} />
          </motion.div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {chatAgent ? (
          <AgentsChatStyled
            agent={chatAgent}
            messages={chatHistories[chatAgent.id] || []}
            onNewMessage={(msg) => {
              // msg = { role: "user"|"assistant", content: "texto" }
              pushMessage(chatAgent.id, msg);
            }}
            setMessages={(msgs) => {
              setChatHistories(prev => ({ ...prev, [chatAgent.id]: msgs }));
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
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
