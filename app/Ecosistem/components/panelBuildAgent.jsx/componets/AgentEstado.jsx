"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentsChatStyled() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // ===========================================================
  // 👁️ Cargar agentes desde Supabase (SOLO LECTURA)
  // ===========================================================
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return console.warn("Usuario no autenticado");

        const { data, error } = await supabase
          .from("auditorias")
          .select("id, user_config")
          .eq("user_id", user.id)
          .not("user_config", "is", null);

        if (error) throw error;

        const validAgents = data
          .filter(
            (row) =>
              row.user_config &&
              typeof row.user_config === "object" &&
              Object.keys(row.user_config).length > 0 &&
              row.user_config.agent_name &&
              row.user_config.api_key
          )
          .map((row) => ({
            id: row.id,
            ...row.user_config,
          }));

        setAgents(validAgents);
        if (validAgents.length > 0) setSelectedAgent(validAgents[0]);
      } catch (err) {
        console.error("Error al cargar agentes:", err.message);
      }
    };

    fetchAgents();
  }, []);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===========================================================
  // 🚀 Enviar mensaje al backend (Sin guardar en Supabase)
  // ===========================================================
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiURL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          agent_id: selectedAgent?.id,
          agent_config: selectedAgent,
        }),
      });

      const data = await res.json();

      const botMessage = {
        from: "bot",
        text: data?.response || "No recibí respuesta",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error al conectar con el servidor" },
      ]);
      console.error("Error enviando mensaje:", err);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  if (!selectedAgent && agents.length === 0 && !isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        No hay agentes configurados para tu usuario. Crea uno para empezar a chatear.
      </div>
    );

  if (!selectedAgent && agents.length > 0)
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Selecciona un agente para iniciar la conversación.
      </div>
    );

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      
      {/* 💬 Mensajes */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-end space-y-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${
                msg.from === "user" ? "bg-black text-white" : "bg-white text-black shadow-md"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-400 text-sm px-2">Escribiendo...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ Input activado */}
      <div className="w-full px-4 py-4 flex justify-center">
        <div className="flex w-[70%] relative items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-14"
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

            {/* Enviar */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={sendMessage}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
            >
              <Send size={18} />
            </motion.button>

            {/* Mic (opcionalmente puedes conectarlo luego) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleRecording}
              className={`absolute right-14 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 ${
                isRecording ? "bg-red-500 text-white" : "bg-black text-white"
              }`}
            >
              <Mic size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
