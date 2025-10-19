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

  const quickQuestions = [
    'Mi empresa tiene problemas de ...',
    '¿Qué puedo automatizar primero?',
  ];

  const docsCards = [
    { id: 'arquitectura', title: 'Arquitectura del Sistema', description: 'Documentación sobre la arquitectura base y los módulos principales.' },
    { id: 'api', title: 'Integración API', description: 'Endpoints, autenticación y estructura de datos para desarrolladores.' },
    { id: 'agentes', title: 'Agentes Inteligentes', description: 'Cómo funcionan los agentes LLM dentro de la infraestructura.' },
  ];

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

  return (
    <div className="w-full h-screen flex flex-col bg-white relative">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20">
          <p className="text-2xl md:text-xl sm:text-lg mb-6">
            Conoce como funciona GLYNNE FW, <span className="font-semibold">{userInfo.nombre}</span>.
          </p>

          {/* 🔹 INPUT PRINCIPAL */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-3 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Quires saber como instalar?"
                disabled={isLoading}
                className="w-full px-6 pt-10 pb-14 rounded-2xl text-lg bg-white outline-none relative z-10 shadow-md"
                style={{ border: '2px solid transparent', backgroundClip: 'padding-box' }}
              />

              {/* ÍCONOS */}
              <div
                className={`absolute bottom-3 left-4 flex justify-start gap-4 text-gray-700 z-20 transition-opacity duration-500 ${
                  showIcons ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
                  <Brain size={20} />
                </motion.div>
              </div>

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

            {/* 🔹 Descripción + Código estilizado */}
            {showIntro && (
              <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100">
                {/* Texto descriptivo */}
                <div className="flex-1 text-left md:pr-8 w-[30%]">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Conecta tu Framework con GLYNNE AI
                  </h2>
                  <p className="text-sm text-gray-500 leading-snug">
                    Usa este fragmento para vincular tu cliente con el backend del chat
                    y comenzar a procesar mensajes de manera inteligente.
                  </p>
                </div>

                {/* Contenedor del código alineado a la izquierda */}
                <div className="flex w-full md:w-[70%] mt-4 md:mt-0">
                  <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-4 font-mono text-sm shadow-inner border border-gray-200">
                    {/* Encabezado del editor */}
                    <div className="flex items-center mb-2 text-xs text-neutral-500">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-1"></span>
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                      <span className="font-semibold text-neutral-600">chatConnector.js</span>
                    </div>

                    {/* Bloque de código */}
                    <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-left">
                      <code>
                        <span className="text-sky-600">const</span> sendMessage ={' '}
                        <span className="text-sky-600">async</span> () =&gt; {'{'}
                        {'\n'}
                        {'  '}<span className="text-sky-600">const</span> r ={' '}
                        <span className="text-sky-600">await</span> fetch(
                        <span className="text-emerald-600">{'`${API_URL}/chat`'}</span>, {'{'}
                        {'\n'}
                        {'    '}method: <span className="text-amber-600">'POST'</span>,{'\n'}
                        {'    '}headers: {'{'}{' '}
                        <span className="text-amber-600">'Content-Type'</span>:{' '}
                        <span className="text-amber-600">'application/json'</span>{' '}{'}'},{'\n'}
                        {'    '}body: JSON.stringify({'{'} mensaje: input {'}'}){'\n'}
                        {'  '}{'}'});{'\n'}
                        {'  '}<span className="text-sky-600">const</span> d ={' '}
                        <span className="text-sky-600">await</span> r.json();{'\n'}
                        {'  '}console.log(d);{'\n'}
                        {'}'};
                      </code>
                    </pre>
                  </div>
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
