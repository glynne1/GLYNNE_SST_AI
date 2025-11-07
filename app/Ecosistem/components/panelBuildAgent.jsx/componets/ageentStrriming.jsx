"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentsChatStyled() {
  const [agents, setAgents] = useState([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const messagesEndRef = useRef(null);

  const apiURL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://generative-glynne-motor.onrender.com";

  // colores para cada agente
  const agentColors = ["#4ade80", "#3b82f6", "#ec4899", "#facc15", "#f97316"];

  // =============================
  // Cargar agentes desde Supabase
  // =============================
  const fetchAgents = async () => {
    try {
      setLoadingAgents(true);
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
    } catch (err) {
      console.error("Error al cargar agentes:", err);
    } finally {
      setLoadingAgents(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // =============================
  // Enviar mensaje al backend
  // =============================
  const sendMessage = () => {
    if (!input.trim() || agents.length === 0) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Crear mensajes vacíos para cada agente
    const initialBotMessages = agents.map((agent, i) => ({
      id: `agent-${i}`,
      from: "bot",
      agent: agent.agent_name || `Agente ${i + 1}`,
      text: "",
      color: agentColors[i % agentColors.length],
      done: false,
    }));

    setMessages((prev) => [...prev, ...initialBotMessages]);

    // SSE streaming
    const eventSource = new EventSource(
      `${apiURL}/dynamic/agent/chat/stream?message=${encodeURIComponent(
        input
      )}&agents=${encodeURIComponent(JSON.stringify(agents))}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { agent, content, done } = data;

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.agent === agent && msg.from === "bot") {
            return {
              ...msg,
              text: msg.text + content,
              done: done ?? false,
            };
          }
          return msg;
        })
      );
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    setInput("");
  };

  const toggleRecording = () => setIsRecording(!isRecording);

  // =============================
  // Render
  // =============================
  if (loadingAgents) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Cargando agentes...
      </div>
    );
  }

  if (!agents || agents.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Aún no tienes agentes creados. Crea uno para iniciar la conversación.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 💬 MENSAJES */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-end space-y-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[80%]">
              {msg.from === "bot" && (
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: msg.color }}
                >
                  {msg.agent}
                </div>
              )}

              <div
                className={`px-4 py-3 rounded-2xl break-words whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-black text-white"
                    : "bg-white text-black shadow-md"
                }`}
              >
                <p>{msg.text || (!msg.done && "Escribiendo...")}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ INPUT */}
      <div className="w-full px-4 py-4 flex justify-center">
        <div className="flex w-[70%] relative items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-14"
              style={{ border: "2px solid transparent", backgroundClip: "padding-box" }}
            />

            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #4ade80, #3b82f6, #facc15, #ec4899)",
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
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
            >
              <Send size={18} />
            </motion.button>

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
