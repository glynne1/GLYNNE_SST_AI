'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react'; 
import { supabase } from '../../lib/supabaseClient';
import AlertUpgrade from './alertPlanes';
import AuditAlert from '../components/alertGenerarAuditoria';   // 👈 nuevo import
import DiscoverG from './TTSinvoke'

export default function ChatSimple() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [showAuditAlert, setShowAuditAlert] = useState(false); 
  const [userInfo, setUserInfo] = useState({ nombre: 'Usuario' }); // 👈 aquí guardamos el nombre
  const messagesEndRef = useRef(null);

  const API_URL = 'https://gly-chat-v1-2.onrender.com';

  // 👇 Traer datos del usuario desde Supabase
  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('Error obteniendo usuario:', error);
        return;
      }

      const { user_metadata } = user;
      setUserInfo({
        nombre: user_metadata?.full_name || 'Usuario',
      });
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const id = `user_${Math.floor(Math.random() * 90000) + 10000}`;
    setUserId(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const userMessages = messages.filter(m => m.from === 'user').length;
    if (userMessages >= 3 && userMessages <= 10 && !showAuditAlert) {
      setShowAuditAlert(true);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: input, user_id: userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const aiMsg = { from: 'ia', text: data.respuesta || 'No se recibió respuesta' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'ia', text: `⚠️ Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* 👇 Popup de auditoría */}
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
        <div className="flex flex-1 flex-col items-center justify-center text-center px-4 relative">
          <p className="text-2xl md:text-xl sm:text-lg mb-6">
            Me alegro de verte, <span className="font-semibold">{userInfo.nombre}</span>.
          </p>

          {/* Input centrado con borde animado */}
          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Pregunta lo que quieras"
              disabled={isLoading}
              className="w-full px-4 py-4 sm:px-3 sm:py-3 xs:px-2 xs:py-2 rounded-full text-lg sm:text-base xs:text-sm relative z-10 bg-white outline-none"
              style={{
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                position: 'relative',
              }}
            />
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, #4ade80, #3b82f6, #facc15, #ec4899)',
                backgroundSize: '300% 300%',
                animation: 'shine 2.5s linear infinite',
                borderRadius: '9999px',
                padding: '2px',
                zIndex: 0,
                maskImage: 'linear-gradient(#fff 0 0)',
                WebkitMaskImage: 'linear-gradient(#fff 0 0)',
              }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={sendMessage}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 sm:w-8 sm:h-8 xs:w-7 xs:h-7 flex items-center justify-center shadow-md z-20"
            >
              <Send size={18} className="sm:w-4 sm:h-4 xs:w-3 xs:h-3" />
            </motion.button>

            <style jsx>{`
              @keyframes shine {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          </div>
            {/* Visible solo en >= md (768px) */}
<div className="hidden md:block">
  <DiscoverG />
</div>

          <AlertUpgrade />
        </div>
      ) : (
        <>
          {/* Mensajes */}
          <div className="flex-1  px-4 py-2 flex flex-col justify-end">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 sm:px-3 sm:py-1 xs:px-2 xs:py-1 rounded-2xl max-w-[80%] text-lg sm:text-base xs:text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input flotante */}
          <div className="w-full px-4 py-4 flex justify-center">
            <div className="flex w-[70%] sm:w-[85%] xs:w-[95%] relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe tu mensaje..."
                className="w-full px-4 py-4 sm:px-3 sm:py-3 xs:px-2 xs:py-2 rounded-full border focus:outline-none text-lg sm:text-base xs:text-sm pr-14"
                disabled={isLoading}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={sendMessage}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 sm:w-8 sm:h-8 xs:w-7 xs:h-7 flex items-center justify-center shadow-md"
              >
                <Send size={18} className="sm:w-4 sm:h-4 xs:w-3 xs:h-3" />
              </motion.button>
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
