'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import AlertUpgrade from './alertPlanes';
import DiscoverG from './TTSinvoke';
import PlusMenu from './masContenido';
import { marked } from "marked";
import Baner from './banerAut'
import Cards from './cards'
export default function ChatSimple() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({ nombre: 'Usuario' });
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const API_URL = 'https://glynne-ecosistem.onrender.com/chat1';

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
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
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return;
      const { user_metadata } = user;
      setUserInfo({ nombre: user_metadata?.full_name || 'Usuario' });
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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: input, user_id: userId }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const aiMsg = { from: 'ia', text: data.respuesta || 'No se recibió respuesta' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'ia', text: `⚠️ Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="w-full h-screen ml-0 md:-ml-[100px] sm:-ml-4 flex flex-col bg-white">
      {/* ===== BANNER ARRIBA ===== */}
      <div className="w-full">
        <Baner />
      </div>
  
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center px-4 relative">
          <p className="text-2xl md:text-xl sm:text-lg mb-4">
            Aqui te explicare como crear tus agentes IA, <span className="font-semibold">{userInfo.nombre}</span>
          </p>
  
          <div className="w-full max-w-3xl flex flex-col items-center gap-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="relative w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Hablemos de IA"
                disabled={isLoading}
                className="w-full px-4 py-4 rounded-xl text-lg bg-white outline-none relative z-10 pr-14 border-2 border-gray-300"
              />
  
              {/* Send / Mic dentro del input */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex gap-2">
                {input.trim() ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                  >
                    <Send size={18} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleRecording}
                    disabled={isLoading}
                    className={`rounded-full w-10 h-10 flex items-center justify-center shadow-md ${
                      isRecording ? 'bg-red-600 text-white' : 'bg-black text-white'
                    }`}
                  >
                    <Mic size={18} />
                  </motion.button>
                )}
              </div>
            </div>
  
            {/* Solo el + debajo del input */}
            <div className="flex justify-start gap-2 mt-3 w-full">
              <PlusMenu onRefresh={handleRefresh} />
            </div>
          </div>
  
          <div className="hidden md:block mt-4">
            <DiscoverG />
            <Cards />
          <AlertUpgrade />
          </div>
       

        </div>
      ) : (
        <>
          <div className="flex-1 px-4 py-2 flex flex-col justify-end space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap ${
                    msg.from === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black shadow-md'
                  }`}
                >
                  {msg.from === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <div
                      className="prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
  
          <div className="w-full px-4 py-4 flex justify-center">
            <div className="flex w-full md:w-[70%] relative items-center gap-2 flex-col">
              <div className="relative w-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 pr-14 border-2 border-gray-300"
                  disabled={isLoading}
                />
  
                {/* Send / Mic dentro del input */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex gap-2">
                  {input.trim() ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={sendMessage}
                      disabled={isLoading}
                      className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                    >
                      <Send size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={toggleRecording}
                      disabled={isLoading}
                      className={`rounded-full w-10 h-10 flex items-center justify-center shadow-md ${
                        isRecording ? 'bg-red-600 text-white' : 'bg-black text-white'
                      }`}
                    >
                      <Mic size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
  
              {/* Solo el + debajo del input */}
              <div className="flex justify-start gap-2 mt-2 w-full">
                <PlusMenu onRefresh={handleRefresh} />
              </div>
            </div>
          </div>
  
          <div className="hidden md:flex justify-center items-center w-full">
            <DiscoverG />
          </div>
        </>
      )}
    </div>
  );
                    }  