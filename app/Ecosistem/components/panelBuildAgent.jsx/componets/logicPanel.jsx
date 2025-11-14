"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaTrash, FaTimes } from "react-icons/fa";
import { saveUserAgentConfig } from "./saveSupabaseAgent";
import Tabla from "./AgentExponApi";
import Diagrama from "./DiagramaFlujoFW";
import CardsAgent from "./cardsAgents";
import Plantillas from "./AgntsCardsEjm";
import Image from "next/image";

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

  const [step, setStep] = useState(0);
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

  const steps = [
    {
      title: "Acceso a nuestros modelos IA",
      text: "Ingresa tu clave API de GROQ o GLYNNE. Es necesaria para autenticar y conectar el modelo.",
      content: (
        <div className="col-span-2 relative bg-white p-5 border border-gray-300 shadow-sm flex flex-col gap-2 rounded-lg">
          <label className="text-xs font-semibold text-gray-700 mb-1 block">API Key</label>
          <input
            name="api_key"
            type="password"
            placeholder="Enter your API key"
            value={form.api_key}
            onChange={handleChange}
            className="w-full p-3 text-xs bg-white border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg"
          />
          <p className="text-gray-500 text-xs mt-2">
            Obtén tu clave en{" "}
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GROQ Console
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "¿En qué área te gustaría que tu agente te ayude?",
      text: "Define desde qué perspectiva actuará el agente. Ejemplo: 'auditor', 'asesor financiero', 'coach de IA'.",
      content: (
        <InputField
          label="Rol del agente"
          name="rol"
          value={form.rol}
          onChange={handleChange}
          placeholder="Ej: Analista de procesos"
          helperText="Describe la función principal del agente"
        />
      ),
    },
    {
      title: "¿Cual sera el nombre del agente?",
      text: "Asigna un nombre único a tu agente para identificarlo fácilmente.",
      content: (
        <InputField
          label="Nombre del agente"
          name="agent_name"
          value={form.agent_name}
          onChange={handleChange}
          placeholder="Ej: Atlas"
          helperText="Nombre distintivo para tu agente IA"
        />
      ),
    },
    {
      title: "¿En qué tema o área especial quieres que se enfoque?",
      text: "Explica brevemente para qué es bueno el agente. Ejemplo: ventas, marketing, soporte técnico, análisis de datos.",
      content: (
        <InputField
          label="Especialidad"
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="Ej: Estrategia de marketing digital"
          helperText="Campo de especialización del agente"
        />
      ),
    },
    {
      title: "Objetivo del agente",
      text: "Define en una frase qué objetivo principal cumple. Ejemplo: 'Optimizar la atención al cliente'.",
      content: (
        <InputField
          label="Objetivo"
          name="objective"
          value={form.objective}
          onChange={handleChange}
          placeholder="Ej: Automatizar la gestión de leads"
          helperText="Propósito principal del agente"
        />
      ),
    },
    {
      title: "Información del negocio",
      text: "Describe brevemente el contexto o entorno donde operará el agente (empresa, producto, flujo, etc).",
      content: (
        <InputField
          label="Información del negocio"
          name="business_info"
          value={form.business_info}
          onChange={handleChange}
          textarea
          rows={3}
          placeholder="Ej: Empresa SaaS enfocada en gestión de proyectos..."
          helperText="Explica el entorno donde se aplicará el agente"
        />
      ),
    },
    {
      title: "Instrucciones adicionales",
      text: "Agrega reglas, tono o estilo de respuesta del agente. Ejemplo: 'Responder con empatía y precisión'.",
      content: (
        <InputField
          label="Instrucciones adicionales"
          name="additional_msg"
          value={form.additional_msg}
          onChange={handleChange}
          textarea
          rows={2}
          placeholder="Ej: Usa un lenguaje profesional y conciso"
          helperText="Indicaciones o reglas de comportamiento del agente"
        />
      ),
    },
  ];

  

  return (
    <div className="relative w-[90vw] h-[90vh] bg-white rounded-2xl p-6 shadow-md overflow-hidden">
      <div className="relative w-[90%] h-full flex flex-col items-center justify-center">

        {/* 🔹 Logo fijo, sin transición */}
        <div className="flex -mt-[35vh] justify-center">
          <Image
            src="/logo4.png"
            alt="Logo Glynne"
            width={300}
            height={150}
            className="rounded-full"
          />
        </div>

        {/* 🔹 Contenido con animaciones */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-[60%] text-center"
          >
            <motion.p
              className="text-gray-500 -mt-[10vh] text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {steps[step].text}
            </motion.p>

            {steps[step].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-6 w-[60%]">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2 text-xs bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="px-4 py-2 text-xs bg-black text-white rounded-lg"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={async () => {
                await saveUserAgentConfig(form);
                addLog("✅ Configuración guardada", "success");
                await handleSend();
                setChatModalOpen(true);
              }}
              className="px-4 py-2 text-xs bg-green-600 text-white rounded-lg"
            >
              Ejecutar agente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🔹 Subcomponente InputField (sin cambios estructurales) */
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
    <div className="bg-white p-5 border border-gray-300 shadow-sm rounded-lg">
      {label && <label className="text-xs font-semibold text-gray-700 mb-2 block">{label}</label>}
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
