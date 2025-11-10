"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Trash2 } from "lucide-react"; // 👈 SE AGREGÓ TRASH2
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";
import { marked } from "marked";

export default function AgentsChatStyled({ agent }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userInfo, setUserInfo] = useState({ nombre: "Usuario" });

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const apiURL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://generative-glynne-motor.onrender.com";

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getCurrentUser();
      if (user && user.email) {
        const name =
          user.user_metadata?.full_name ||
          user.email.split("@")[0] ||
          "Usuario";
        setUserInfo({ nombre: name });
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (agent) {
      setSelectedAgent(agent);
      loadConversationFromSupabase(agent.agent_name);
    }
  }, [agent]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function loadConversationFromSupabase(agentName) {
    const user = await getCurrentUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("auditorias")
      .select("user_config")
      .eq("user_id", user.id)
      .eq("user_config->>agent_name", agentName)
      .single();

    if (error || !data) {
      console.error("No se pudo cargar conversación:", error);
      return;
    }

    const conversation = data.user_config.conversation || [];
    setMessages(conversation);
  }

  async function saveMessageToSupabase(newMessage) {
    const user = await getCurrentUser();
    if (!user || !selectedAgent) return;

    const { data, error } = await supabase
      .from("auditorias")
      .select("id, user_config")
      .eq("user_id", user.id)
      .eq("user_config->>agent_name", selectedAgent.agent_name)
      .single();

    if (error || !data) return console.error("No se encontró el agente en Supabase");

    const currentConfig = data.user_config;
    const updatedConversation = [...(currentConfig.conversation || []), newMessage];

    const updatedConfig = { ...currentConfig, conversation: updatedConversation };

    const { error: updateError } = await supabase
      .from("auditorias")
      .update({ user_config: updatedConfig })
      .eq("id", data.id);

    if (updateError)
      console.error("Error guardando mensaje en Supabase:", updateError);
  }

  // ✅ FUNCIÓN PARA BORRAR SOLO EL CHAT
  async function clearConversation() {
    const user = await getCurrentUser();
    if (!user || !selectedAgent) return;

    setMessages([]); // limpiar local

    const { data, error } = await supabase
      .from("auditorias")
      .select("id, user_config")
      .eq("user_id", user.id)
      .eq("user_config->>agent_name", selectedAgent.agent_name)
      .single();

    if (error || !data) return console.error("Error limpiando conversación");

    const cleanedConfig = { ...data.user_config, conversation: [] };

    await supabase
      .from("auditorias")
      .update({ user_config: cleanedConfig })
      .eq("id", data.id);
  }

  // ✅ AVISO CADA 20 MENSAJES DEL USUARIO
  const userMessageCount = messages.filter(m => m.from === "user").length;

  useEffect(() => {
    if (userMessageCount > 0 && userMessageCount % 20 === 0) {
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: "🧹 Has enviado 20 mensajes. Podrías borrar el chat si quieres mantenerlo limpio."
        }
      ]);
    }
  }, [userMessageCount]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !selectedAgent) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    saveMessageToSupabase(userMessage);

    try {
      const res = await fetch(`${apiURL}/dynamic/agent/chat/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: input,
          agent_config: selectedAgent,
        }),
      });

      const data = await res.json();
      const botMessage = {
        from: "bot",
        text: data?.reply || "No recibí respuesta",
      };

      setMessages((prev) => [...prev, botMessage]);
      saveMessageToSupabase(botMessage);
    } catch (err) {
      const errorMsg = {
        from: "bot",
        text: "❌ Error al conectar con el servidor",
      };
      setMessages((prev) => [...prev, errorMsg]);
      saveMessageToSupabase(errorMsg);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const toggleRecording = () => setIsRecording(!isRecording);

  if (!selectedAgent)
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Selecciona un agente para iniciar la conversación.
      </div>
    );

    return (
      <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
    
        {/* 🟡 ESTADO INICIAL — input totalmente centrado */}
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
    
            <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              Hola, <span className="font-semibold">{userInfo.nombre}</span>.<br />
              Soy <span className="font-semibold">{selectedAgent.agent_name}</span>, tu{" "}
              {selectedAgent.rol?.toLowerCase() || "asistente"}.
              <br />
              ¿En qué puedo ayudarte hoy?
            </p>
    
            <div className="w-full max-w-2xl flex items-center justify-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-full text-base bg-white outline-none relative z-10"
                  style={{
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #0f172a, #312e81, #ffffff, #2563eb, #0891b2, #064e3b)",
                    backgroundSize: "300% 300%",
                    animation: "shine 2.5s linear infinite",
                    borderRadius: "9999px",
                    padding: "2px",
                    zIndex: 0,
                  }}
                />
    
                {input.trim() ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full 
                    w-9 h-9 flex items-center justify-center shadow-md z-20"
                  >
                    <Send size={16} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleRecording}
                    disabled={isLoading}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full 
                    w-9 h-9 flex items-center justify-center shadow-md z-20
                    ${isRecording ? "bg-red-600 text-white" : "bg-black text-white"}`}
                  >
                    <Mic size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
    
        ) : (
          <>
            {/* 🟣 CHAT SCROLLEABLE */}
            <div
              ref={messagesContainerRef}
              className="flex-1 flex flex-col px-4 py-2 space-y-2 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${
                      msg.from === "user"
                        ? "bg-black text-white"
                        : "bg-white text-black shadow-md"
                    }`}
                  >
                    {msg.from === "bot" ? (
                      <div
                        className="prose prose-sm"
                        dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                      />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
    
              {isLoading && (
                <div className="text-gray-400 text-sm px-2">Escribiendo.....</div>
              )}
    
              <div ref={messagesEndRef} />
            </div>
    
            {/* 🟢 INPUT FIJO ABAJO - NO SE ESCONDE */}
            <div className="w-full bg-white py-3 border-t flex justify-center fixed bottom-0 left-0">
              <div className="flex w-[70%] relative items-center gap-2">
    
                {/* BOTÓN BORRAR CONVERSACIÓN */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={clearConversation}
                  className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                  title="Borrar conversación"
                >
                  <Trash2 size={20} />
                </motion.button>
    
                {/* INPUT */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                    className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-14"
                    disabled={isLoading}
                    style={{
                      border: "2px solid transparent",
                      backgroundClip: "padding-box",
                    }}
                  />
    
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, #4ade80, #3b82f6, #facc15, #ec4899)",
                      backgroundSize: "300% 300%",
                      animation: "shine 2.5s linear infinite",
                      borderRadius: "9999px",
                      padding: "2px",
                      zIndex: 0,
                    }}
                  />
    
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                    bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
                  }
