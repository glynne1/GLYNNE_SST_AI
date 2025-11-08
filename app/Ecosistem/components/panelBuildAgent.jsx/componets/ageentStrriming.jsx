"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, Send } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentsGrid() {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // 🔹 Cargar agentes desde Supabase
  useEffect(() => {
    const fetchAgents = async () => {
      const user = await getCurrentUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data) setAgents(data);
    };

    fetchAgents();
  }, []);

  // 🔹 Scroll automático en chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Enviar mensaje al backend
  const handleSend = async () => {
    if (!input.trim() || selected === null) return;

    const currentAgent = agents[selected];
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentConfig: currentAgent, // 🔸 Enviar toda la info del agente (rol, model, api_key, etc.)
          message: input,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "agent", text: data.reply || "Sin respuesta." }]);
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 px-2 py-1 flex flex-col">
      {/* 🔸 Lista de Agentes */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        {agents.slice(0, 5).map((agent, idx) => {
          const isSelected = selected === idx;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelected(idx);
                setMessages([]);
              }}
              className={`
                flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer min-w-fit
                transition-all duration-200 relative text-xs
                ${isSelected
                  ? "bg-white border border-gray-400 shadow-sm"
                  : "bg-white border border-gray-100 hover:border-gray-300 hover:bg-gray-100/50"}
              `}
            >
              <motion.div
                animate={{
                  scale: isSelected ? [1, 1.15, 1] : 1,
                  boxShadow: isSelected
                    ? ["0 0 4px rgba(0,0,0,0)", "0 0 10px rgba(0,0,0,0.25)", "0 0 4px rgba(0,0,0,0)"]
                    : "0 0 0 rgba(0,0,0,0)"
                }}
                transition={{
                  duration: 1.6,
                  repeat: isSelected ? Infinity : 0,
                  ease: "easeInOut"
                }}
                className={`
                  w-4 h-4 rounded-full flex items-center justify-center border
                  ${isSelected ? "bg-black border-black" : "bg-white border-gray-200"}
                `}
              >
                <User className={`w-2.5 h-2.5 ${isSelected ? "text-white" : "text-gray-500"}`} />
              </motion.div>

              <span className={`text-[10px] font-medium whitespace-nowrap ${isSelected ? "text-gray-900" : "text-gray-600"}`}>
                {agent.agent_name || "Sin nombre"}
              </span>

              <motion.div
                animate={{ scale: isSelected ? 1.2 : 1 }}
                className={`w-1.5 h-1.5 rounded-full border ${isSelected ? "bg-black border-black" : "border-gray-300"} ml-1`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 🔸 Chat */}
      {selected !== null && (
        <div className="mt-2 border border-gray-100 rounded-lg flex flex-col h-[40vh] bg-gray-50 p-2">
          <div className="flex-1 overflow-y-auto space-y-1 text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-1.5 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-black text-white self-end ml-auto"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="mt-2 flex items-center gap-1">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-1.5 bg-black text-white rounded-md hover:bg-gray-800"
            >
              <Send size={12} />
            </button>
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
