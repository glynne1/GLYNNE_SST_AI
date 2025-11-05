"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaTrash, FaTimes } from "react-icons/fa";
import { saveUserAgentConfig } from "./saveSupabaseAgent"; 

export default function AgentConfigPanel() {
  const [form, setForm] = useState({
    api_key: "",
    model: "llama-3.3-70b-versatile",
    rol: "",
    agent_name: "",
    specialty: "",
    business_info: "",
    objective: "",
    additional_msg: ""
  });

  const [response, setResponse] = useState("");
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const endRef = useRef(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showExamples, setShowExamples] = useState({
    business_info: false,
    additional_msg: false
  });

  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addLog = (msg, type = "info", progress = null) => {
    const text = typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg;
    const newLog = { id: Date.now() + Math.random(), time: new Date().toISOString(), msg: text, type, progress };
    setLogs(prev => [...prev, newLog]);
  };

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(form.api_key);
    addLog("📋 API Key copied to clipboard", "success");
  };

  // Construye el prompt completo basado en los campos del formulario
  const buildPrompt = () => {
    return `
[META]
Actúa como un ${form.rol || "aware"} no respondas con mas de 100 palabras .

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

  const handleSaveAndExecute = async () => {
    try {
      // Guardar configuración del agente en Supabase
      await saveUserAgentConfig(form);
      addLog("✅ Configuración guardada en Supabase", "success");
    } catch (err) {
      addLog("⚠️ No se pudo guardar configuración: " + err.message, "error");
    }
  
    // Ahora sí dispara el flujo original
    handleSend();
  };
  

  const handleSend = async () => {
    if (!form.api_key) {
      addLog("❌ Debes ingresar tu API key antes de enviar la solicitud", "error");
      return;
    }

    const prompt = buildPrompt();

    addLog("➡ Sending request to backend...", "info", 0);
    addLog(`📝 Prompt: ${prompt}`, "info");
    addLog(`🎭 Rol: ${form.rol}`, "info");

    try {
      const res = await fetch(`${apiURL}/dynamic/agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: form.api_key,
          model: form.model,
          rol: form.rol,
          prompt: prompt
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error desconocido en el servidor");
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      setChatMessages([{ role: "system", content: "IA lista para chat con tu agente configurado" }]);
      setChatModalOpen(true); // Abrir popup directamente

      addLog("✅ Response received", "success", 1);
      if (data.tokens) addLog(`🧮 Tokens used: ${data.tokens}`, "info");
      if (data.details) addLog(`📄 Flow details: ${JSON.stringify(data.details, null, 2)}`, "info");
    } catch (err) {
      const errorMsg = err.message || "Error desconocido";
      setResponse("❌ Error: " + errorMsg);
      addLog("❌ " + errorMsg, "error");
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
  
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
  
    const mensaje = chatInput;
    setChatInput("");
  
    try {
      const res = await fetch(`${apiURL}/dynamic/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: form.api_key,
          model: form.model,
          rol: form.rol,
          mensaje: mensaje,
          prompt: buildPrompt()
        })
      });
  
      const data = await res.json();
  
      // Extraemos SOLO la respuesta del LLM
      const iaMessageContent = data?.response?.respuesta || "❌ No se recibió respuesta del agente";
      const iaMessage = { role: "assistant", content: iaMessageContent };
      setChatMessages(prev => [...prev, iaMessage]);
    } catch (err) {
      const errorText = err.message || "Error desconocido";
      setChatMessages(prev => [...prev, { role: "assistant", content: "❌ Error: " + errorText }]);
    }
  };
  

  useEffect(() => {
    const events = new EventSource(`${apiURL}/logs/stream`);
    events.onopen = () => { setConnected(true); addLog("🔌 Connected to GLYNNE Runtime", "success", 1); };
    events.onerror = () => { setConnected(false); addLog("⚠️ Lost connection — retrying...", "warn"); };
    events.onmessage = (event) => {
      try { const log = JSON.parse(event.data); addLog(log.msg, log.type || "info", log.progress || null); }
      catch { addLog(event.data, "info"); }
    };
    return () => events.close();
  }, [apiURL]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  const typeStyles = { info: "text-blue-600", success: "text-green-600", warn: "text-yellow-600", error: "text-red-600" };
  const toggleExamples = (field) => setShowExamples(prev => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="flex w-full mt-[0px]   h-screen">

        

      {/* PANEL PRINCIPAL */}
<div className="w-full p-8  bg-white rounded-2xl">

{/* Contenedor principal */}

  




<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* API Key */}
  <div className="col-span-2 relative bg-white  p-5 border border-gray-300 shadow-sm flex items-center gap-2">
    <div className="flex-1 flex flex-col">
      <label className="text-xs font-semibold text-gray-700 mb-1 block">API Key</label>
      <input
        name="api_key"
        type="password"
        placeholder="Enter your API key"
        value={form.api_key}
        onChange={handleChange}
        className="w-full p-3 text-xs bg-white border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    {/* Texto informativo para obtener API */}
<p className="text-gray-500 text-xs mt-2">
  Para conseguir tu clave API, visita{' '}
  <a 
    href="https://console.groq.com/keys" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
     API MODEL GROQ/GLYNNE
  </a>
  . Copia la clave y pégala en aqui.
</p>

    </div>
    <FaCopy onClick={handleCopyAPIKey} className="text-gray-600 hover:text-gray-800 cursor-pointer text-sm" title="Copy API Key" />
    <FaTrash onClick={() => setForm({ ...form, api_key: "" })} className="text-red-500 hover:text-red-700 cursor-pointer text-sm" title="Delete API Key" />
  </div>

  {/* Rol del agente */}
  <InputField
    label="rol del agente"
    name="rol"
    value={form.rol}
    onChange={handleChange}
    placeholder="desde que vision vera tu proceso?"
    helperText="Define el rol principal que tendrá tu agente, por ejemplo: auditor o gestor de ventas"
  />

  {/* Nombre del agente */}
  <InputField
    label="Nombre"
    name="agent_name"
    value={form.agent_name}
    onChange={handleChange}
    placeholder="Nombre del agente"
    helperText="Introduce un nombre distintivo para identificar tu agente en el sistema"
  />

  {/* Especialidad */}
  <InputField
    label="Especialidad"
    name="Specialty"
    value={form.specialty}
    onChange={handleChange}
    placeholder="para que es bueno tu agente?"
    helperText="Indica la especialidad principal del agente, como 'Automatización de ventas' o 'Soporte técnico'"
  />

  {/* Objetivo */}
  <InputField
    label="Objectivos?"
    name="objective"
    value={form.objective}
    onChange={handleChange}
    placeholder="que funciones debe tener este agente?"
    helperText="Describe el objetivo principal que debe cumplir el agente"
  />




  {/* Información del negocio */}
  <InputField
  
    label="Información del proyecto"
    name="business_info"
    value={form.business_info}
    onChange={handleChange}
    placeholder="Este agente funciona como un nuevo miembro del equipo: lo entrenas con tu visión, le explicas tus procesos y le asignas responsabilidades. A partir de ahí, actúa con autonomía para ejecutar sus tareas y ayudarte a escalar tu operación."
    rows={3}
    textarea
    colSpan={3}
    helperText="Proporciona información breve sobre la empresa o proyecto donde se desplegará el agente"
  >
    
    <button onClick={() => toggleExamples("business_info")} className="mt-2 text-xs text-blue-500 hover:underline">Show Examples</button>
    <AnimatePresence>
      {showExamples.business_info && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-600 space-y-1">
          <div>Example 1: Empresa SaaS que ofrece soluciones de automatización para pymes.</div>
          <div>Example 2: Proyecto interno de IA para optimización de procesos de soporte y ventas.</div>
        </motion.div>
      )}
    </AnimatePresence>
  </InputField>

  {/* Instrucciones adicionales */}
  <InputField
    label="instrucciones"
    name="additional_msg"
    value={form.additional_msg}
    onChange={handleChange}
    placeholder="Instrucciones adicionales"
    rows={2}
    textarea
    colSpan={3}
    helperText="Añade instrucciones o reglas especiales que tu agente debe seguir"
  >
    <button onClick={() => toggleExamples("additional_msg")} className="mt-2 text-xs text-blue-500 hover:underline">Show Examples</button>
    <AnimatePresence>
      {showExamples.additional_msg && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-600 space-y-1">
          <div>Example 1: Priorizar procesos críticos y flujos de ventas.</div>
          <div>Example 2: Incluir métricas de éxito y objetivos medibles.</div>
        </motion.div>
      )}
    </AnimatePresence>
  </InputField>

  <div className="col-span-3 flex justify-center items-center w-full min-h-[20vh]">
  <div className="w-[50vw] m-5 flex justify-center items-center">
    <button
      onClick={async () => {
        try {
          // 1️⃣ Guardar configuración en Supabase
          await saveUserAgentConfig(form);
          addLog("✅ Configuración guardada en Supabase", "success");
        } catch (err) {
          addLog("⚠️ No se pudo guardar configuración: " + err.message, "error");
        }

        // 2️⃣ Ejecutar agente
        await handleSend();

        // 3️⃣ Abrir chat modal
        setChatModalOpen(true);
      }}
      className="bg-black text-white px-6 py-3 text-base font-semibold rounded-xl shadow-md hover:bg-gray-900 hover:shadow-lg transition-all duration-300"
    >
      ⚡ Execute Agent
    </button>
  </div>
</div>



</div>
</div>


      <AnimatePresence>
        {chatModalOpen && (
          <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl w-full max-w-lg p-5 flex flex-col max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800">Chat con IA</h3>
                <FaTimes className="cursor-pointer text-gray-600 hover:text-gray-800" onClick={() => setChatModalOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto mb-3 space-y-2">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`p-2 rounded-lg text-xs ${m.role === "user" ? "bg-gray-100 text-gray-800 self-end" : "bg-blue-100 text-blue-800 self-start"}`}>
                    {typeof m.content === "object" ? JSON.stringify(m.content, null, 2) : m.content}
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
                <button onClick={sendChatMessage} className="px-3 py-2 bg-black text-white rounded-lg text-xs hover:bg-gray-800 transition-colors">
                  Enviar
                </button>
                    {/* Leyenda inferior */}
          
              </div>
          
        
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function InputField({
    label,
    name,
    value,
    onChange,
    placeholder,
    colSpan = 1,
    rows = 1,
    textarea = false,
    type = "text",
    min,
    max,
    step,
    maxChars = 700,
    children
  }) {
    const [charCount, setCharCount] = useState(value?.length || 0);
  
    const handleChange = (e) => {
      const val = e.target.value;
      if (val.length <= maxChars) {
        setCharCount(val.length);
        onChange(e);
      } else {
        // Opcional: si quieres permitir escribir pero marcar en rojo
        setCharCount(val.length);
        onChange(e);
      }
    };
  
    const baseClass = `w-full p-3 text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-lg`;
  
    return (
      <div
        className={`bg-white p-5 border border-gray-300 shadow-sm rounded-lg ${
          colSpan > 1 ? `col-span-${colSpan}` : ""
        }`}
      >
        {label && (
          <label className="text-xs font-semibold text-gray-700 mb-2 block">{label}</label>
        )}
        {textarea ? (
          <textarea
            name={name}
            rows={rows}
            className={baseClass}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <input
            name={name}
            type={type}
            min={min}
            max={max}
            step={step}
            className={baseClass}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        )}
  
        {/* Contador de caracteres */}
        <div className="text-right mt-1 text-xs">
          <span className={charCount > maxChars ? "text-red-500" : "text-gray-400"}>
            {charCount}/{maxChars}
          </span>
        </div>
  
        {children && <div>{children}</div>}
      </div>
    );
  }
