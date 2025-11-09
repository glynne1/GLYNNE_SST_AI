"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaTrash, FaTimes } from "react-icons/fa";
import { saveUserAgentConfig } from "./saveSupabaseAgent";
import Tabla from "./AgentExponApi";
import Diagrama from "./DiagramaFlujoFW";
import CardsAgent from "./cardsAgents";
import Plantillas from "./AgntsCardsEjm";

export default function AgentConfigPanel() {
  const [form, setForm] = useState({
    api_key: "",
    model: "llama-3.3-70b-versatile",
    rol: "",
    agent_name: "",
    specialty: "",
    business_info: "",
    objective: "",
    additional_msg: "",
  });

  const [response, setResponse] = useState("");
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const endRef = useRef(null);
  const [showExamples, setShowExamples] = useState({
    business_info: false,
    additional_msg: false,
  });

  const apiURL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://generative-glynne-motor.onrender.com";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addLog = (msg, type = "info", progress = null) => {
    const text = typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg;
    const newLog = {
      id: Date.now() + Math.random(),
      time: new Date().toISOString(),
      msg: text,
      type,
      progress,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(form.api_key);
    addLog("📋 API Key copied to clipboard", "success");
  };

  const buildPrompt = () => {
    return `
[META]
Actúa como un ${form.rol || "auditor"} y responde en menos de 100 palabras.

[AGENTE]
Nombre del agente: ${form.agent_name}
Especialidad: ${form.specialty}
Objetivo principal: ${form.objective}
Información del negocio/proyecto: ${form.business_info}
Instrucciones adicionales: ${form.additional_msg}

[ENTRADA]
{mensaje}

[RESPUESTA]
Entrega recomendaciones concretas, claras y accionables.
`;
  };

  const handleSend = async () => {
    if (!form.api_key) {
      addLog("❌ Debes ingresar tu API key antes de enviar la solicitud", "error");
      return;
    }

    const prompt = buildPrompt();
    addLog("➡ Sending request to backend...", "info");

    try {
      const res = await fetch(`${apiURL}/dynamic/agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: form.api_key,
          model: form.model,
          rol: form.rol,
          prompt: prompt,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
      setChatMessages([
        { role: "system", content: "IA lista para chat con tu agente configurado" },
      ]);
      setChatModalOpen(true);
      addLog("✅ Respuesta recibida del backend", "success");
    } catch (err) {
      setResponse("❌ Error: " + err.message);
      addLog("❌ " + err.message, "error");
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    try {
      const res = await fetch(`${apiURL}/dynamic/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: form.api_key,
          model: form.model,
          rol: form.rol,
          mensaje: chatInput,
          prompt: buildPrompt(),
        }),
      });

      const data = await res.json();
      const iaMessageContent =
        data?.response?.respuesta || "❌ No se recibió respuesta del agente";
      const iaMessage = { role: "assistant", content: iaMessageContent };
      setChatMessages((prev) => [...prev, iaMessage]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error: " + err.message },
      ]);
    }
  };

  useEffect(() => {
    const events = new EventSource(`${apiURL}/logs/stream`);
    events.onopen = () => {
      setConnected(true);
      addLog("🔌 Connected to GLYNNE Runtime", "success");
    };
    events.onerror = () => {
      setConnected(false);
      addLog("⚠️ Lost connection — retrying...", "warn");
    };
    events.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data);
        addLog(log.msg, log.type || "info");
      } catch {
        addLog(event.data, "info");
      }
    };
    return () => events.close();
  }, [apiURL]);

  const toggleExamples = (field) =>
    setShowExamples((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
<div className="relative w-[92vw] h-[92vh] bg-white rounded-2xl p-6 shadow-md overflow-hidden">
      {/* 🔹 CONTENEDOR GLOBAL */}
      <div className="relative w-[90%] h-[100%] bg-white rounded-2xl p-0 shadow-md overflow-y-auto">
        {/* 🔹 PANEL PRINCIPAL */}
        <div className="grid ml-[70px] w-[87%] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* API Key */}
          <div className="col-span-2 relative bg-white p-5 border border-gray-300 shadow-sm flex items-center gap-2 rounded-lg">
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-semibold text-gray-700 mb-1 block">
                API Key
              </label>
              <input
                name="api_key"
                type="password"
                placeholder="Enter your API key"
                value={form.api_key}
                onChange={handleChange}
                className="w-full p-3 text-xs bg-white border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg"
              />
              <p className="text-gray-500 text-xs mt-2">
                Para conseguir tu clave API, visita{" "}
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  API MODEL GROQ/GLYNNE
                </a>
                . Copia la clave y pégala aquí.
              </p>
            </div>
            <FaCopy
              onClick={handleCopyAPIKey}
              className="text-gray-600 hover:text-gray-800 cursor-pointer text-sm"
              title="Copy API Key"
            />
            <FaTrash
              onClick={() => setForm({ ...form, api_key: "" })}
              className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
              title="Delete API Key"
            />
          </div>

          <InputField
            label="Rol del agente"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            placeholder="¿Desde qué visión verá tu proceso?"
            helperText="Define el rol principal que tendrá tu agente, por ejemplo: auditor o gestor de ventas"
          />

          <InputField
            label="Nombre"
            name="agent_name"
            value={form.agent_name}
            onChange={handleChange}
            placeholder="Nombre del agente"
            helperText="Introduce un nombre distintivo para identificar tu agente en el sistema"
          />

          <InputField
            label="Especialidad"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            placeholder="¿Para qué es bueno tu agente?"
            helperText="Indica la especialidad principal del agente, como 'Automatización de ventas' o 'Soporte técnico'"
          />

          <InputField
            label="Objetivo"
            name="objective"
            value={form.objective}
            onChange={handleChange}
            placeholder="¿Qué funciones debe tener este agente?"
            helperText="Describe el objetivo principal que debe cumplir el agente"
          />

          <InputField
            label="Información del proyecto"
            name="business_info"
            value={form.business_info}
            onChange={handleChange}
            placeholder="Este agente funciona como un nuevo miembro del equipo..."
            rows={3}
            textarea
            colSpan={3}
            helperText="Proporciona información breve sobre la empresa o proyecto donde se desplegará el agente"
          >
            <button
              onClick={() => toggleExamples("business_info")}
              className="mt-2 text-xs text-blue-500 hover:underline"
            >
              Mostrar ejemplos
            </button>
            <AnimatePresence>
              {showExamples.business_info && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-600 space-y-1"
                >
                  <div>Ejemplo 1: Empresa SaaS que ofrece soluciones de automatización.</div>
                  <div>Ejemplo 2: Proyecto interno de IA para soporte y ventas.</div>
                </motion.div>
              )}
            </AnimatePresence>
          </InputField>

          <InputField
            label="Instrucciones adicionales"
            name="additional_msg"
            value={form.additional_msg}
            onChange={handleChange}
            placeholder="Instrucciones adicionales"
            rows={2}
            textarea
            colSpan={3}
            helperText="Añade instrucciones o reglas especiales que tu agente debe seguir"
          />

<div className="col-span-3 flex justify-center items-center w-full min-h-[15vh]">
  <div className="w-[50vw] m-5 flex justify-center items-center">
    <button
      onClick={async () => {
        // 🔊 Reproducir tono
        try {
          const audio = new Audio("/tonoCrearModelo.mp3"); // cambia a tu archivo: /sonido.mp3, /alert.wav, etc.
          await audio.play();
        } catch (err) {
          console.warn("No se pudo reproducir el sonido:", err);
        }

        // 🧠 Ejecutar acciones
        try {
          await saveUserAgentConfig(form);
          addLog("✅ Configuración guardada en Supabase", "success");
        } catch (err) {
          addLog("⚠️ No se pudo guardar configuración: " + err.message, "error");
        }

        await handleSend();
        setChatModalOpen(true);
      }}
      className="bg-black text-white px-6 py-3 text-base font-semibold rounded-xl shadow-md hover:bg-gray-900 hover:shadow-lg transition-all duration-300"
    >
       Ejecutar Agente
    </button>
  </div>
</div>

        </div>

        {/* 🔹 MODAL DE CHAT DENTRO DEL CONTENEDOR */}
        <AnimatePresence>
          {chatModalOpen && (
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl w-full max-w-lg p-5 flex flex-col max-h-[90vh] shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Chat con IA</h3>
                  <FaTimes
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => setChatModalOpen(false)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                  {chatMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-xs ${
                        m.role === "user"
                          ? "bg-gray-100 text-gray-800 self-end"
                          : "bg-blue-100 text-blue-800 self-start"
                      }`}
                    >
                      {typeof m.content === "object"
                        ? JSON.stringify(m.content, null, 2)
                        : m.content}
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <button
                    onClick={sendChatMessage}
                    className="px-3 py-2 bg-black text-white rounded-lg text-xs hover:bg-gray-800 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 🔹 SUBCOMPONENTE DE INPUT UNIFICADO */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  colSpan = 1,
  rows = 1,
  textarea = false,
  helperText,
  children,
}) {
  return (
    <div
      className={`bg-white p-5 border border-gray-300 shadow-sm rounded-lg ${
        colSpan > 1 ? `col-span-${colSpan}` : ""
      }`}
    >
      {label && (
        <label className="text-xs font-semibold text-gray-700 mb-2 block">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          name={name}
          rows={rows}
          className="w-full p-3 text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          type="text"
          className="w-full p-3 text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {helperText && <p className="text-[10px] text-gray-500 mt-1">{helperText}</p>}
      {children && <div>{children}</div>}
    </div>
  );
}
