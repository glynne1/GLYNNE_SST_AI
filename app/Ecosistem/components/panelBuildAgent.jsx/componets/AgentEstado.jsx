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
  const [isLoading] = useState(false);
  const [isRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // ===========================================================
  // 🧠 Cargar agentes guardados (SOLO LECTURA)
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

  // 🚫 Deshabilitamos enviar mensaje
  const sendMessage = () => {};
  const toggleRecording = () => {};

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
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${
                msg.from === "user"
                  ? "bg-black text-white"
                  : "bg-white text-black shadow-md"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ Input (DESHABILITADO) */}
      <div className="w-full px-4 py-4 flex justify-center">
        <div className="flex w-[70%] relative items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={() => {}}
              placeholder="Modo solo lectura"
              className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-14 opacity-50 cursor-not-allowed"
              style={{
                border: "2px solid transparent",
                backgroundClip: "padding-box",
              }}
              disabled={true}
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
            {/* Botón enviar deshabilitado */}
            <motion.button
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1 }}
              disabled={true}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 cursor-not-allowed"
            >
              <Send size={18} />
            </motion.button>

            {/* Mic deshabilitado */}
            <motion.button
              whileTap={{ scale: 1 }}
              whileHover={{ scale: 1 }}
              disabled={true}
              className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 cursor-not-allowed"
            >
              <Mic size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
