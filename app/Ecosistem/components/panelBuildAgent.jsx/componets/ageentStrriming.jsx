"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquareText, Settings2, Trash2, RotateCcw } from "lucide-react";
import AgentForm from "./AgentEditModal";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentsWhatsAppManager() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgentCard, setSelectedAgentCard] = useState(null); // Nueva selección de card
  const [chatAgent, setChatAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openChatPopup, setOpenChatPopup] = useState(false);

  // Chat & Meta
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMeta, setUserMeta] = useState({
    accessToken: "",
    phoneNumberId: "",
    toNumber: "",
  });
  const messagesEndRef = useRef(null);
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://generative-glynne-motor.onrender.com";

  // ================= Fetch Agentes =================
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

      const formattedAgents = data?.map((item) => ({
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
    if (!confirm("¿Seguro que deseas eliminar este agente?")) return;
    const { error } = await supabase.from("auditorias").delete().eq("id", agentId);
    if (error) return console.error(error);
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
  };

  const handleEdit = (agent, index) => setSelectedAgent({ agent, index });
  const handleSave = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a, i) => (i === selectedAgent.index ? updatedAgent : a))
    );
    setSelectedAgent(null);
  };

  // ================= Chat =================
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !chatAgent) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Backend
      const res = await fetch(`${apiURL}/dynamic/agent/chat/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input, agent_config: chatAgent }),
      });
      const data = await res.json();
      const botReply = data?.reply || "No recibí respuesta";

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);

      // WhatsApp
      if (userMeta.accessToken && userMeta.phoneNumberId && userMeta.toNumber) {
        await fetch(`https://graph.facebook.com/v22.0/${userMeta.phoneNumberId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userMeta.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: userMeta.toNumber,
            text: { body: botReply },
          }),
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { from: "bot", text: "❌ Error al enviar mensaje" }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleSelectAgent = (agent) => {
    setChatAgent(agent);
    setUserMeta({
      accessToken: agent.accessToken || "",
      phoneNumberId: agent.phoneNumberId || "",
      toNumber: agent.toNumber || "",
    });
    setMessages([]); // limpiar chat previo
    setOpenChatPopup(true);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative">

      {/* ===== Formulario Meta ===== */}
      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Access Token"
          value={userMeta.accessToken}
          onChange={(e) => setUserMeta({ ...userMeta, accessToken: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number ID"
          value={userMeta.phoneNumberId}
          onChange={(e) => setUserMeta({ ...userMeta, phoneNumberId: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Número destino (+573...)"
          value={userMeta.toNumber}
          onChange={(e) => setUserMeta({ ...userMeta, toNumber: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {/* ===== Cards Agentes ===== */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Agentes GLYNNE creados</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border hover:bg-gray-100 transition-all"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", repeat: isRefreshing ? Infinity : 0 }}
          >
            <RotateCcw className={`w-5 h-5 ${isRefreshing ? "text-blue-600" : "text-gray-600"}`} />
          </motion.div>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 italic text-center">Cargando agentes...</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-400 italic text-center">Aquí podrás visualizar tus modelos IA creados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {agents.map((agent, idx) => {
            const isSelected = selectedAgentCard?.id === agent.id;
            return (
              <div
                key={agent.id || idx}
                onClick={() => setSelectedAgentCard(agent)}
                className={`cursor-pointer bg-white shadow-lg rounded-xl p-5 border flex flex-col justify-between w-full h-[200px] transition-all
                  ${isSelected ? "border-blue-500 shadow-2xl" : "border-gray-200 hover:shadow-xl"}`}
              >
                <div className="space-y-1 overflow-hidden">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{agent.agent_name || "Agente sin nombre"}</h2>
                  <p className="text-xs text-gray-500 truncate"><strong>Rol:</strong> {agent.rol || "-"}</p>
                  <p className="text-xs text-gray-500 truncate"><strong>Objetivo:</strong> {agent.objective || "-"}</p>
                  <p className="text-xs text-gray-500 truncate"><strong>Mensaje adicional:</strong> {agent.additional_msg || "-"}</p>
                </div>
                <div className="mt-3 flex justify-end space-x-4 text-gray-400">
                  <MessageSquareText
                    className="w-5 h-5 cursor-pointer hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAgent(agent);
                    }}
                  />
                  <Settings2
                    className="w-5 h-5 cursor-pointer hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(agent, idx);
                    }}
                  />
                  <Trash2
                    className="w-5 h-5 cursor-pointer stroke-red-500 hover:stroke-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(agent.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== Botón Ejecutar Agente ===== */}
      {selectedAgentCard && (
        <div className="flex justify-end mt-4">
          <button
            onClick={async () => {
              if (!userMeta.accessToken || !userMeta.phoneNumberId || !userMeta.toNumber) {
                return alert("Completa la información de Meta antes de ejecutar el agente.");
              }
              setChatAgent(selectedAgentCard);
              setUserMeta({
                accessToken: selectedAgentCard.accessToken || userMeta.accessToken,
                phoneNumberId: selectedAgentCard.phoneNumberId || userMeta.phoneNumberId,
                toNumber: selectedAgentCard.toNumber || userMeta.toNumber,
              });
              setMessages([]);
              setOpenChatPopup(true);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Ejecutar Agente
          </button>
        </div>
      )}

      {/* ===== Modal Editar Agente ===== */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setSelectedAgent(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl p-8 w-[85vw] h-[85vh] overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={() => setSelectedAgent(null)} className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl">✖</button>
              <AgentForm agentData={selectedAgent.agent} onSave={handleSave} onCancel={() => setSelectedAgent(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Modal Chat ===== */}
      <AnimatePresence>
        {openChatPopup && chatAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setOpenChatPopup(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl w-[90vw] h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >

              <button onClick={() => setOpenChatPopup(false)} className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl z-50">✖</button>

              {/* Mensajes */}
              <div className="flex-1 px-2 py-2 flex flex-col justify-end space-y-2 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-[80%] break-words ${msg.from === "user" ? "bg-black text-white" : "bg-white text-black shadow-md"}`}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-gray-400 text-sm px-2">Escribiendo...</div>}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="w-full flex justify-center mt-2 p-4">
                <div className="flex w-[70%] relative items-center gap-2">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Escribe tu mensaje..." className="w-full px-4 py-2 rounded-full border outline-none pr-14" />
                  <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} onClick={sendMessage} disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
