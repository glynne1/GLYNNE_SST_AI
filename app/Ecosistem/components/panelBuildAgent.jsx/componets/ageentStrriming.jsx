"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";

export default function AgentsChatStyled() {
  const [agentsList, setAgentsList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [waToken, setWaToken] = useState("");
  const [toNumber, setToNumber] = useState("");
  const messagesEndRef = useRef(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:8000";

  // 🔹 Cargar agentes desde Supabase (solo lectura)
  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching agents:", error);
      } else {
        setAgentsList(data || []);
      }
    };
    fetchAgents();
  }, []);

  // 🔄 Scroll al final de los mensajes
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===========================================================
  // 🚀 Enviar mensaje al backend usando WhatsApp
  // ===========================================================
  const sendMessage = async () => {
    if (!input.trim() || isLoading || !selectedAgent || !apiKey || !waToken || !toNumber)
      return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${apiURL}/dynamic/agent/chat/whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: input,
          agent_config: selectedAgent,
          whatsapp_token: waToken,
          to_number: toNumber,
        }),
      });

      const data = await res.json();

      const botMessage = {
        from: "bot",
        text: data?.reply || "No recibí respuesta",
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

  return (
    <div className="w-full h-screen flex flex-col bg-white">

      {/* 🔹 SELECCIONAR AGENTE */}
      <div className="px-4 py-2 flex flex-col gap-2">
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 outline-none"
          value={selectedAgent?.id || ""}
          onChange={(e) => {
            const agent = agentsList.find(a => a.id === e.target.value);
            setSelectedAgent(agent || null);
            setMessages([]);
          }}
        >
          <option value="">Selecciona un agente</option>
          {agentsList.map((a) => (
            <option key={a.id} value={a.id}>
              {a.agent_name} - {a.specialty || "Sin especialidad"}
            </option>
          ))}
        </select>

        {/* FORMULARIOS PARA API KEY Y WHATSAPP */}
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API Key de Evolution / GLYNNE"
          className="px-4 py-2 rounded-lg border border-gray-300 outline-none"
        />
        <input
          type="text"
          value={waToken}
          onChange={(e) => setWaToken(e.target.value)}
          placeholder="Token de WhatsApp"
          className="px-4 py-2 rounded-lg border border-gray-300 outline-none"
        />
        <input
          type="text"
          value={toNumber}
          onChange={(e) => setToNumber(e.target.value)}
          placeholder="Número destino (+57xxxx...)"
          className="px-4 py-2 rounded-lg border border-gray-300 outline-none"
        />
      </div>

      {/* 💬 MENSAJES */}
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
        {isLoading && <div className="text-gray-400 text-sm px-2">Escribiendo...</div>}
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
              onKeyDown={handleKeyDown}
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

            {/* BOTÓN ENVIAR */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={sendMessage}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
            >
              <Send size={18} />
            </motion.button>

            {/* MICRÓFONO */}
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
