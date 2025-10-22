'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function FrameworkTreeScroll({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'ChatMinimal.jsx',
      code: [
        { type: 'comment', text: '💡 Con este código puedes crear tu propio chat y conectar tu proyecto Next.js con GLYNNE.\n' },
        { type: 'comment', text: 'Solo pégalo en tu editor y ejecuta tu backend FastAPI.\n\n' },
        { text: "'use client';\n\n" },
        { text: "import { useState, useRef, useEffect } from 'react';\n" },
        { text: "import { Send } from 'lucide-react';\n" },
        { text: "import { motion } from 'framer-motion';\n\n" },
        { text: "export default function ChatMinimal() {\n" },
        { text: "  const [messages, setMessages] = useState([]);\n" },
        { text: "  const [input, setInput] = useState('');\n" },
        { text: "  const [isLoading, setIsLoading] = useState(false);\n" },
        { text: "  const messagesEndRef = useRef(null);\n\n" },
        { text: "  const API_URL = 'http://0.0.0.0:8000/chat'; // Backend FastAPI local\n" },
        { text: "  const userId = useRef(`user_${Math.floor(Math.random() * 90000) + 10000}`);\n" },
        { text: "  const rol = 'usuario';\n\n" },
        { text: "  useEffect(() => {\n" },
        { text: "    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });\n" },
        { text: "  }, [messages]);\n\n" },
        { text: "  const sendMessage = async () => {\n" },
        { text: "    if (!input.trim() || isLoading) return;\n\n" },
        { text: "    const userMsg = { from: 'user', text: input };\n" },
        { text: "    setMessages((prev) => [...prev, userMsg]);\n" },
        { text: "    setIsLoading(true);\n\n" },
        { text: "    try {\n" },
        { text: "      const res = await fetch(API_URL, {\n" },
        { text: "        method: 'POST',\n" },
        { text: "        headers: { 'Content-Type': 'application/json' },\n" },
        { text: "        body: JSON.stringify({ user_id: userId.current, rol, mensaje: input })\n" },
        { text: "      });\n" },
        { text: "      const data = await res.json();\n" },
        { text: "      const aiMsg = { from: 'ai', text: data.respuesta || 'Sin respuesta del servidor.' };\n" },
        { text: "      setMessages((prev) => [...prev, aiMsg]);\n" },
        { text: "    } catch (err) {\n" },
        { text: "      setMessages((prev) => [...prev, { from: 'ai', text: `⚠️ Error: ${err.message}` }]);\n" },
        { text: "    } finally {\n" },
        { text: "      setInput('');\n" },
        { text: "      setIsLoading(false);\n" },
        { text: "    }\n" },
        { text: "  };\n\n" },
        { text: "  return (\n" },
        { text: "    <div className='w-full h-screen flex flex-col bg-[#f9fafb]'>\n" },
        { text: "      <div className='flex-1 overflow-y-auto px-4 py-6 space-y-3'>\n" },
        { text: "        {messages.map((msg, idx) => (\n" },
        { text: "          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>\n" },
        { text: "            <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${msg.from === 'user' ? 'bg-black text-white' : 'bg-white text-black shadow-sm'}`}>\n" },
        { text: "              {msg.text}\n" },
        { text: "            </div>\n" },
        { text: "          </div>\n" },
        { text: "        ))}\n" },
        { text: "        <div ref={messagesEndRef} />\n" },
        { text: "      </div>\n\n" },
        { text: "      <div className='w-full border-t bg-white px-4 py-3 flex items-center'>\n" },
        { text: "        <div className='relative flex-1'>\n" },
        { text: "          <input type='text' placeholder='Escribe un mensaje...' value={input}\n" },
        { text: "            onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}\n" },
        { text: "            disabled={isLoading} className='w-full border border-gray-300 rounded-full px-4 py-2 text-sm outline-none pr-10' />\n" },
        { text: "          <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}\n" },
        { text: "            onClick={sendMessage} disabled={isLoading}\n" },
        { text: "            className='absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center'>\n" },
        { text: "            <Send size={14} />\n" },
        { text: "          </motion.button>\n" },
        { text: "        </div>\n" },
        { text: "      </div>\n" },
        { text: "    </div>\n" },
        { text: "  );\n" },
        { text: "}\n" },
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevExample = () =>
    setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  const nextExample = () =>
    setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  const copyToClipboard = () =>
    navigator.clipboard.writeText(examples[currentIndex].code.map(c => c.text).join(''));

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = 'text-neutral-800';
      if (c.type === 'comment') color = 'text-gray-500 italic';
      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-6 pt-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-[95%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">

        {/* 🧠 Texto explicativo en lugar del logo */}
        <div className="flex-1 md:pr-6 w-[15%] flex justify-center items-center text-center">
          <p className="text-sm text-gray-700 font-medium leading-snug">
            💡 Este snippet te permite conectar Next.js con el backend GLYNNE.
            Solo pégalo y ejecuta tu API.
          </p>
        </div>

        {/* 💻 Bloque del código */}
        <div className="flex flex-col w-full md:w-[70%] mt-4 md:mt-0">
          
          {/* Header tipo Mac */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="ml-2 font-semibold text-neutral-600 text-xs">{examples[currentIndex].lang}</span>
              <button onClick={prevExample} className="ml-2 p-1 rounded hover:bg-gray-200 transition"><ArrowLeft className="w-3 h-3 text-gray-600" /></button>
              <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition"><ArrowRight className="w-3 h-3 text-gray-600" /></button>
            </div>
            <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* Área del código */}
          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-4 font-mono text-xs shadow-inner border border-gray-200 overflow-y-auto max-h-[420px]">
            <pre className="whitespace-pre-wrap leading-relaxed text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
