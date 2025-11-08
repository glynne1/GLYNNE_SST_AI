"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic } from "lucide-react";

export default function AgentsChatStyled({ agent, unifiedMessages, setUnifiedMessages }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://generative-glynne-motor.onrender.com";

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [unifiedMessages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !agent) return;

    // ✅ Guardar mensaje del usuario en chat global
    setUnifiedMessages((prev) => [
      ...prev,
      { sender: "Tú", text: input, type: "user" },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiURL}/dynamic/agent/chat/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: input,
          agent_config: agent,
        }),
      });

      const data = await res.json();

      // ✅ Guardar respuesta del bot con nombre del agente
      setUnifiedMessages((prev) => [
        ...prev,
        {
          sender: agent.agent_name || "Agente",
          text: data?.reply || "No recibí respuesta",
          type: "bot",
        },
      ]);
    } catch (err) {
      setUnifiedMessages((prev) => [
        ...prev,
        { sender: agent.agent_name || "Agente", text: "❌ Error al conectar con el servidor", type: "bot" },
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

  return (
    <div className="w-full h-screen flex flex-col bg-white">

      {/* MENSAJES */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-end space-y-2 overflow-y-auto">
        {unifiedMessages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1 ml-1">{msg.sender}</span>
            <div
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${
                  msg.type === "user" ? "bg-black text-white" : "bg-white text-black shadow-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && <div className="text-gray-400 text-sm px-2">Escribiendo...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="w-full px-4 py-4 flex justify-center">
        <div className="flex w-[70%] relative items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Hablas con ${agent?.agent_name || "Agente"}`}
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
              disabled={isLoading}
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
