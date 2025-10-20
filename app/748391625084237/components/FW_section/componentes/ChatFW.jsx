'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Send, Mic, Settings, FileText, History, Brain } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';

export default function ChatSimple() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({ nombre: 'Usuario' });
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showDocs, setShowDocs] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const API_URL = 'https://gly-chat-v1-2.onrender.com';

  // 🎤 Configuración de reconocimiento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (!isRecording) {
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // 🧠 Obtener info de usuario
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserInfo({ nombre: user.user_metadata?.full_name || 'Usuario' });
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const id = `user_${Math.floor(Math.random() * 90000) + 10000}`;
    setUserId(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🚀 Enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setShowQuickQuestions(false);
    setShowIcons(false);
    setShowDocs(false);
    setShowIntro(false);

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: input, user_id: userId }),
      });
      const data = await response.json();
      const aiMsg = { from: 'ia', text: data.respuesta || 'No se recibió respuesta' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'ia', text: `⚠️ Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const gradientWarm = 'linear-gradient(90deg, #0ea5e9, #000, #2563eb, #1e40af)';

  // 🔹 Preguntas predefinidas
  const quickQuestions = [
    { text: '¿Cómo controlar el acceso de usuarios al framework?', level: 'medium' },
    { text: '¿Cómo manejar conflictos de versiones de librerías?', level: 'complex' },
    { text: '¿Cómo ejecutar agentes en modo debug detallado?', level: 'complex' },
    { text: '¿Cómo probar un agente antes de exportarlo al frontend?', level: 'medium' },

 { text: '¿Cómo inicio un proyecto con GLYNNE FW?', level: 'basic' },
 { text: '¿Qué es un LLM y cómo lo conecto?', level: 'basic' },
 { text: '¿Cómo configuro un agente inteligente?', level: 'basic' },
 { text: '¿Qué tipo de datos puedo enviar al chat?', level: 'basic' },
 { text: '¿Cómo integrar mi API con el framework?', level: 'basic' },
 { text: '¿Puedo entrenar mi propio modelo de IA?', level: 'medium' },
 { text: '¿Cómo manejar múltiples conversaciones simultáneas?', level: 'medium' },
 { text: '¿Qué seguridad ofrece GLYNNE FW?', level: 'medium' },
 { text: '¿Cómo depuro errores en la conexión con LLM?', level: 'medium' },
 { text: '¿Cómo crear flujos automatizados con agentes?', level: 'medium' },
 { text: '¿Qué es Inteligencia Artificial General y cómo usarla?', level: 'complex' },
 { text: '¿Cómo escalo múltiples agentes sin perder rendimiento?', level: 'complex' },
 { text: '¿Cómo personalizar respuestas según usuario?', level: 'complex' },
 { text: '¿Cómo integrar GLYNNE FW con WhatsApp y Gmail?', level: 'complex' },
 { text: '¿Cómo auditar un flujo de conversación completo?', level: 'complex' },
 { text: '¿Cómo crear un sistema de recomendaciones basado en IA?', level: 'complex' },
 { text: '¿Cómo sincronizar múltiples LLMs para coherencia?', level: 'complex' },
 { text: '¿Cómo manejar fallos en tiempo real de agentes?', level: 'complex' },
 { text: '¿Cómo generar reportes automáticos por IA?', level: 'medium' },
 { text: '¿Qué métricas debo monitorear en agentes activos?', level: 'medium' },
 { text: '¿Qué hago si el ejecutable no abre en Mac?', level: 'basic' },
 { text: '¿Cómo hacer click derecho y “Open” para verificar la app?', level: 'basic' },
 { text: '¿Cómo descargar el proyecto desde el ejecutable?', level: 'basic' },
 { text: '¿Dónde se encuentra la carpeta con la arquitectura del proyecto?', level: 'basic' },
 { text: '¿Qué contiene la arquitectura del motor de IA?', level: 'medium' },
 { text: '¿Cómo crear nuevos agentes de IA en la carpeta del motor?', level: 'medium' },
 { text: '¿Cómo definir la personalidad de un agente?', level: 'medium' },
 { text: '¿Cómo seleccionar el modelo que usará un agente?', level: 'medium' },
 { text: '¿Cómo asignar roles específicos a un agente?', level: 'medium' },
 { text: '¿Cómo exportar un agente al frontend fácilmente?', level: 'medium' },
 { text: '¿Qué hago si el ejecutable falla en Windows?', level: 'basic' },
 { text: '¿Cómo actualizar GLYNNE FW a la última versión?', level: 'medium' },
 { text: '¿Se puede usar el framework en Linux?', level: 'medium' },
 { text: '¿Cómo depurar problemas de permisos en Mac?', level: 'medium' },
 { text: '¿Cómo probar un agente antes de exportarlo?', level: 'medium' },
 { text: '¿Cómo ejecutar múltiples agentes a la vez?', level: 'complex' },
 { text: '¿Cómo optimizar el rendimiento del motor de IA?', level: 'complex' },
 { text: '¿Cómo crear plantillas de personalidad reutilizables?', level: 'medium' },
 { text: '¿Cómo integrar datos externos en los agentes?', level: 'complex' },
 { text: '¿Qué tipos de modelos se pueden usar en GLYNNE FW?', level: 'medium' },
 { text: '¿Cómo probar la integración de API externa?', level: 'medium' },
 { text: '¿Cómo manejar errores de fetch en frontend?', level: 'medium' },
 { text: '¿Se pueden compartir agentes entre proyectos?', level: 'medium' },
 { text: '¿Cómo generar logs detallados de cada agente?', level: 'complex' },
 { text: '¿Cómo automatizar tareas recurrentes con agentes?', level: 'complex' },
 { text: '¿Cómo entrenar un LLM personalizado dentro del motor?', level: 'complex' },
 { text: '¿Cómo establecer prioridades entre múltiples agentes?', level: 'complex' },
 { text: '¿Qué limitaciones tiene la versión actual del framework?', level: 'medium' },
 { text: '¿Cómo personalizar la interfaz de exportación al frontend?', level: 'medium' },
 { text: '¿Cómo manejar conflictos de dependencias al instalar?', level: 'medium' },
 { text: '¿Cómo integrar el framework con sistemas existentes?', level: 'complex' },
 { text: '¿Cómo hacer rollback si un agente falla?', level: 'complex' },
 { text: '¿Cómo configurar autenticación y roles de usuario?', level: 'medium' },
 { text: '¿Cómo documentar los agentes creados para otros devs?', level: 'medium' },
 { text: '¿Cómo probar el motor en distintos entornos?', level: 'medium' },
 { text: '¿Cómo verificar que el ejecutable se descargó correctamente?', level: 'basic' },
{ text: '¿Cómo abrir GLYNNE FW si macOS bloquea la aplicación?', level: 'basic' },
{ text: '¿Cómo crear un proyecto nuevo desde la terminal?', level: 'basic' },
{ text: '¿Qué hago si el motor de IA no genera agentes?', level: 'medium' },
{ text: '¿Cómo cambiar la carpeta predeterminada de proyectos?', level: 'medium' },
{ text: '¿Se pueden ejecutar agentes en paralelo en distintos entornos?', level: 'complex' },
{ text: '¿Cómo restablecer la configuración de un agente por defecto?', level: 'medium' },
{ text: '¿Qué errores comunes ocurren al exportar agentes al frontend?', level: 'medium' },
{ text: '¿Cómo probar la conexión del LLM con datos externos?', level: 'medium' },
{ text: '¿Qué diferencias hay entre modelos predefinidos y personalizados?', level: 'basic' },
{ text: '¿Cómo optimizar la carga inicial de agentes?', level: 'complex' },
{ text: '¿Puedo usar GLYNNE FW con Docker?', level: 'medium' },
{ text: '¿Cómo depurar problemas de permisos en Windows?', level: 'medium' },
{ text: '¿Qué pasos seguir si un agente se queda bloqueado?', level: 'complex' },
{ text: '¿Cómo asignar múltiples roles a un mismo agente?', level: 'complex' },
{ text: '¿Cómo automatizar pruebas unitarias para agentes?', level: 'complex' },
{ text: '¿Qué comandos existen para reiniciar el motor de IA?', level: 'basic' },
{ text: '¿Cómo personalizar las respuestas automáticas de un agente?', level: 'medium' },
{ text: '¿Cómo integrar GLYNNE FW con Slack o Teams?', level: 'complex' },
{ text: '¿Qué hacer si el ejecutable no descarga el proyecto?', level: 'basic' },
{ text: '¿Cómo actualizar los LLMs dentro del motor?', level: 'medium' },
{ text: '¿Cómo crear logs personalizados de cada agente?', level: 'complex' },
{ text: '¿Cómo manejar dependencias externas en agentes?', level: 'medium' },
{ text: '¿Cómo probar la compatibilidad con distintas versiones de Node?', level: 'medium' },
{ text: '¿Qué hacer si el motor falla al iniciar múltiples agentes?', level: 'complex' },
{ text: '¿Cómo documentar un proyecto para nuevos desarrolladores?', level: 'medium' },
{ text: '¿Cómo definir prioridades de ejecución entre agentes?', level: 'complex' },
{ text: '¿Puedo clonar un proyecto existente y reutilizar agentes?', level: 'medium' },
{ text: '¿Cómo asegurar que los datos del usuario se manejen correctamente?', level: 'medium' },
{ text: '¿Qué limitaciones de hardware existen para el motor?', level: 'medium' },
{ text: '¿Cómo restaurar un proyecto a un estado previo?', level: 'medium' },
{ text: '¿Cómo configurar agentes para que trabajen en modo offline?', level: 'complex' },
{ text: '¿Cómo integrar APIs externas en flujos de agentes?', level: 'complex' },
{ text: '¿Cómo manejar errores de fetch dentro de un LLM?', level: 'medium' },
{ text: '¿Cómo automatizar la creación de personalidades para agentes?', level: 'complex' },
{ text: '¿Cómo exportar logs de agentes para análisis externo?', level: 'medium' },
{ text: '¿Qué hacer si el motor se cuelga al importar un agente?', level: 'complex' },
{ text: '¿Cómo probar agentes en distintos entornos de desarrollo?', level: 'medium' },
{ text: '¿Cómo configurar un proxy para agentes que requieren conexión?', level: 'medium' },
{ text: '¿Qué diferencias hay entre roles “listener” y “responder”?', level: 'basic' },
{ text: '¿Cómo personalizar el timeout de cada agente?', level: 'complex' },
{ text: '¿Cómo generar reportes de uso por agente?', level: 'medium' },
{ text: '¿Qué hacer si la carpeta de agentes está vacía tras exportar?', level: 'medium' },
{ text: '¿Cómo crear agentes que interactúen entre sí?', level: 'complex' },
{ text: '¿Cómo configurar alertas si un agente falla?', level: 'complex' },
{ text: '¿Cómo crear un agente que solo responda preguntas de un módulo?', level: 'complex' },
{ text: '¿Cómo cambiar la versión de un modelo usado por un agente?', level: 'medium' },
{ text: '¿Se pueden ejecutar agentes en servidores remotos?', level: 'complex' },
{ text: '¿Cómo limpiar la cache de agentes antiguos?', level: 'medium' },
{ text: '¿Cómo probar la consistencia de respuestas de LLMs múltiples?', level: 'complex' },
{ text: '¿Cómo migrar un proyecto completo a otra máquina?', level: 'medium' },
  ];

  return (
    <div className="w-full h-screen flex flex-col bg-white relative">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20">
          <p className="text-2xl md:text-xl sm:text-lg mb-6">
            Conoce como funciona GLYNNE FW, <span className="font-semibold">{userInfo.nombre}</span>.
          </p>

          {/* 🔹 INPUT PRINCIPAL */}
          <div className="w-full max-w-6xl flex flex-col items-center gap-3 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
                className="w-full px-6 pt-10 pb-14 rounded-2xl text-lg bg-white outline-none relative z-10 shadow-md"
                style={{ border: '2px solid transparent', backgroundClip: 'padding-box' }}
              />

              {/* BOTÓN ENVIAR / GRABAR */}
              {input.trim() ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="absolute bottom-3 right-3 bg-black text-white rounded-xl w-12 h-12 flex items-center justify-center shadow-md z-30"
                >
                  <Send size={20} />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleRecording}
                  disabled={isLoading}
                  className={`absolute bottom-3 right-3 rounded-xl w-12 h-12 flex items-center justify-center shadow-md z-30 ${
                    isRecording ? 'bg-red-600' : 'bg-black'
                  } text-white`}
                >
                  <Mic size={20} />
                </motion.button>
              )}

              <span
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: gradientWarm,
                  backgroundSize: '300% 300%',
                  animation: 'shine 2.5s linear infinite',
                  padding: '2px',
                  zIndex: 0,
                }}
              />
            </div>

         {/* 🔹 Contenedor de documentación del framework */}
{showDocs && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-4 mt-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm backdrop-blur-sm"
  >
    {/* Texto */}
    <motion.p
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-gray-700 text-sm md:text-base leading-relaxed text-center md:text-left"
    >
      Puedes leer el documento base o acceder a la documentación detallada del{' '}
      <span className="font-semibold text-gray-900">Framework GLYNNE Agents Ecosystem</span>.
    </motion.p>

    {/* Contenedor de botones uno al lado del otro */}
    <div className="flex flex-row items-center justify-center gap-3">
      {/* Botón Descargar PDF */}
      <motion.a
        href="/GLYNNE_Agents_Ecosystem.pdf"
        download
        className="relative group overflow-hidden px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs md:text-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <span className="relative z-10 font-medium">Descargar PDF</span>
      </motion.a>

      {/* Botón Ver documentación completa */}
      <motion.a
        href="https://tusitio.com/framework-docs" // 🔗 cambia por la URL real
        target="_blank"
        rel="noopener noreferrer"
        className="relative group overflow-hidden px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs md:text-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[1px]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <span className="relative z-10 font-medium">
          Ver documentación 
        </span>
      </motion.a>
    </div>
  </motion.div>
)}


            {/* 🔹 Descripción + Preguntas estilo terminal claro */}
            {showIntro && (
              <div className="flex flex-col md:flex-row items-start w-full max-w-7xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100 mt-4">
                {/* Texto descriptivo a la izquierda */}
                <div className="flex-1 w-[30%] md:pr-8 flex flex-col justify-center text-left items-start gap-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Conecta tu Framework con GLYNNE AI
                  </h2>
                  <p className="text-sm text-gray-500 leading-snug">
                    Esta IA está diseñada para enseñarte, responder tus preguntas y ofrecer soporte técnico frente a GLYNNE FW. Aprende a usar tu cliente con el backend del chat de manera ágil e inteligente.
                  </p>

                  <p className="text-sm text-gray-500 leading-snug">
                    Recuerda que para instalar el proyecto en macOS, debes usar <span className="font-semibold">clic derecho → Abrir</span>, ya que la aplicación aún está en trámite de licencia de Apple. Esto permitirá que el sistema verifique la aplicación y la abra correctamente.
                  </p>

                  {/* Logo debajo del texto */}
                  <div className="mt-2">
                    <img
                      src="/logo2.png" // reemplaza con tu logo
                      alt="Logo GLYNNE"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
{/* Contenedor de preguntas estilo consola profesional */}
<div className="flex-1 md:w-[90%] mt-4 md:mt-0 h-64 overflow-y-auto p-4 bg-white rounded-lg font-mono text-sm text-gray-900 shadow-inner border border-gray-200">
  {quickQuestions.map((q, idx) => (
    <div
      key={idx}
      onClick={() => setInput(q.text)}
      className="cursor-pointer px-3 py-2 mb-2 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md hover:bg-gray-50"
    >
      <span className="font-semibold mr-2 text-gray-700">{idx + 1}:</span>
      <span className="text-gray-800">{q.text}</span>
    </div>
  ))}


                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 🔹 MENSAJES DEL CHAT */}
          <div className="flex-1 px-6 md:px-16 lg:px-28 py-6 flex flex-col justify-end">
            <div className="flex flex-col w-full max-w-4xl mx-auto space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`px-5 py-3 rounded-2xl break-words ${
                      msg.from === 'user'
                        ? 'bg-black text-white self-end'
                        : 'bg-white text-black shadow-sm border border-gray-200'
                    } max-w-[75%]`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 🔹 INPUT FINAL */}
          <div className="w-full px-6 md:px-16 lg:px-28 py-4 flex flex-col justify-center items-center gap-2 relative">
            <div className="flex w-full max-w-xl relative items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-5 py-4 rounded-full text-lg bg-white outline-none pr-14 relative z-10"
                  disabled={isLoading}
                />

                <div
                  className={`absolute bottom-3 left-4 flex justify-start gap-4 text-gray-700 z-20 transition-opacity duration-500 ${
                    showIcons ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                    <Settings size={18} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                    <History size={18} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                    <FileText size={18} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                    <Brain size={18} />
                  </motion.div>
                </div>

                {input.trim() ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="absolute bottom-3 right-3 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
                  >
                    <Send size={18} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleRecording}
                    disabled={isLoading}
                    className={`absolute bottom-3 right-3 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 ${
                      isRecording ? 'bg-red-600' : 'bg-black'
                    } text-white`}
                  >
                    <Mic size={18} />
                  </motion.button>
                )}

                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: gradientWarm,
                    backgroundSize: '300% 300%',
                    animation: 'shine 2.5s linear infinite',
                    borderRadius: '9999px',
                    padding: '2px',
                    zIndex: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
