"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, Send, Mic } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentsGrid() {
  const [agents, setAgents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://generative-glynne-motor.onrender.com";

  // ==========================
  // Traer agentes desde Supabase
  // ==========================
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("auditorias")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) throw error;

      setAgents(data || []);
    } catch (err) {
      console.error("Error al cargar agentes:", err);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ==========================
  // Scroll al final del chat
  // ==========================
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // ==========================
  // Enviar mensaje al backend
  // ==========================
  const sendMessage = async () => {
    if (!input.trim() || isLoading || !selectedAgent) return;

    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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
      const botMessage = { from: "bot", text: data?.reply || "No recibí respuesta" };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      setMessages(prev => [...prev, { from: "bot", text: "❌ Error al conectar con el servidor" }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") sendMessage(); };
  const toggleRecording = () => setIsRecording(!isRecording);

  // ==========================
  // Render
  // ==========================
  return (
    <div className="w-full h-screen flex flex-col bg-white">

      {/* HEADER AGENTES */}
      <div className="w-full bg-white border-b border-gray-100 px-2 py-1">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {agents.map((agent, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <motion.div
                key={agent.id || idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedIndex(idx);
                  setSelectedAgent(agent);
                  setMessages([]); // limpiar chat al seleccionar otro agente
                }}
                className={`
                  flex items-center gap-1 px-1 py-1 rounded-md cursor-pointer min-w-fit
                  transition-all duration-200 relative
                  ${isSelected 
                    ? "bg-[#fff] border border-gray-400 shadow-sm" 
                    : "bg-[#fff] border border-gray-100 hover:border-gray-300 hover:bg-gray-100/50"}
                `}
              >
                <motion.div
                  animate={{
                    scale: isSelected ? [1, 1.15, 1] : 1,
                    boxShadow: isSelected
                      ? ["0px 0px 4px rgba(0,0,0,0)", "0px 0px 10px rgba(0,0,0,0.25)", "0px 0px 4px rgba(0,0,0,0)"]
                      : "0px 0px 0px rgba(0,0,0,0)"
                  }}
                  transition={{ duration: 1.6, repeat: isSelected ? Infinity : 0, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.8 }}
                  className={`
                    w-4 h-4 rounded-full flex items-center justify-center border relative overflow-hidden
                    ${isSelected ? "bg-black border-black" : "bg-white border-gray-200"}
                  `}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.6 }}
                      className="absolute w-full h-full bg-white/30 rounded-full"
                    />
                  )}
                  <User className={`w-2.5 h-2.5 ${isSelected ? "text-white" : "text-gray-500"}`} />
                </motion.div>

                <span className={`
                  text-[10px] font-medium whitespace-nowrap transition-colors
                  ${isSelected ? "text-gray-900" : "text-gray-600"}
                `}>
                  {agent.agent_name || "Sin nombre"}
                </span>

                <motion.div
                  animate={{ scale: isSelected ? 1.2 : 1 }}
                  className={`w-1.5 h-1.5 rounded-full border ml-1 ${isSelected ? "bg-black border-black" : "border-gray-300"}`}
                />
              </motion.div>
            );
          })}
        </div>
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        {!selectedAgent ? (
          <div className="flex-1 w-full h-full flex items-center justify-center text-gray-400">
            Selecciona un agente para iniciar el chat
          </div>
        ) : (
          <>
            {/* Mensajes */}
            <div className="flex-1 px-4 py-2 flex flex-col justify-end space-y-2 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${msg.from === "user" ? "bg-black text-white" : "bg-white text-black shadow-md"}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-gray-400 text-sm px-2">Escribiendo...</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="w-full px-4 py-4 flex justify-center">
              <div className="flex w-[70%] relative items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-20"
                  style={{ border: "2px solid transparent", backgroundClip: "padding-box" }}
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
                  className={`absolute right-14 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 ${isRecording ? "bg-red-500 text-white" : "bg-black text-white"}`}
                >
                  <Mic size={18} />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
