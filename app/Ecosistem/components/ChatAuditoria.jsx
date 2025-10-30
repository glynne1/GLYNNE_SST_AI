'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

import AuditAlert from './alertGenerarAuditoria';
import DiscoverG from './instruccionnesAuditoria';

import BannerAuditoria from './banerAut';

export default function ChatSimple() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [showAuditAlert, setShowAuditAlert] = useState(false);
  const [userInfo, setUserInfo] = useState({ nombre: 'Usuario' });
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const API_URL = 'https://glynne-ecosistem.onrender.com';

  const quickQuestions = [
    "Mi empresa tiene problemas de ...",
    "¿Qué puedo automatizar primero?",
  ];

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserInfo({ nombre: user.user_metadata?.full_name || 'Usuario' });
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const id = `user_${Math.floor(Math.random() * 90000) + 10000}`;
    setUserId(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const userMessages = messages.filter((m) => m.from === 'user').length;
    if (userMessages === 5 && !showAuditAlert) setShowAuditAlert(true);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    if (showQuickQuestions) setShowQuickQuestions(false);

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

  const gradientWarm = 'linear-gradient(90deg, #fff, #f5f5f5, #bfbfbf, #e6e6e6)';


  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <BannerAuditoria />

      {showAuditAlert && (
        <AuditAlert
          onClose={() => setShowAuditAlert(false)}
          onGenerate={() => {
            setShowAuditAlert(false);
            alert('🔍 Aquí dispararías la generación de la auditoría');
          }}
        />
      )}

      {messages.length === 0 ? (
        // 🧭 Vista inicial (sin mensajes)
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20">
          <p className="text-2xl md:text-xl sm:text-lg mb-6">
            Hoy auditaremos tus procesos, <span className="font-semibold">{userInfo.nombre}</span>.
          </p>

          <div className="w-full max-w-3xl flex flex-col items-center gap-3 relative">
            {/* Input inicial */}
            <div className="relative w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Cuéntanos sobre tu empresa"
                disabled={isLoading}
                className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10"
                style={{ border: '2px solid transparent', backgroundClip: 'padding-box' }}
              />
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
              {input.trim() ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
                >
                  <Send size={18} />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleRecording}
                  disabled={isLoading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 ${isRecording ? 'bg-red-600' : 'bg-black'} text-white`}
                >
                  <Mic size={18} />
                </motion.button>
              )}
            </div>

            {/* 👉 PlusMenu debajo del input */}
       

            {/* Preguntas rápidas */}
            {showQuickQuestions && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(q)}
                    className="bg-white hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block mt-6">
            <DiscoverG />
          </div>
        </div>
      ) : (
        // 💬 Vista de chat con mensajes
        <>
          <div className="flex-1 px-6 md:px-16 lg:px-28 py-6 flex flex-col justify-end">
            <div className="flex flex-col w-full max-w-4xl mx-auto space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
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

          {/* Input inferior */}
          <div className="w-full px-6 md:px-16 lg:px-28 py-4 flex flex-col justify-center items-center gap-2">
            <div className="flex w-full max-w-xl relative items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-5 py-4 rounded-full text-lg bg-white outline-none pr-14 relative z-10"
                  style={{ border: '2px solid transparent', backgroundClip: 'padding-box' }}
                  disabled={isLoading}
                />
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
                {input.trim() ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20"
                  >
                    <Send size={18} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleRecording}
                    disabled={isLoading}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 ${isRecording ? 'bg-red-600' : 'bg-black'} text-white`}
                  >
                    <Mic size={18} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* 👉 PlusMenu debajo del input del chat */}
      
          </div>

          <div className="hidden md:flex justify-center items-center w-full mb-4">
            <DiscoverG />
          </div>
        </>
      )}
    </div>
  );
}
