'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function UserSettingsCLI({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Configuración de Modelos',
      code: [
        { type: 'comment', text: '# 🧠 USER_SETTINGS - Ajuste de modelos en GLYNNE Framework\n' },
        { type: 'comment', text: '# ------------------------------------------------------\n' },
        { type: 'comment', text: '# 🤖 MODELO\n' },
        { type: 'comment', text: '# ------------------------------------------------------\n' },
        { type: 'comment', text: '# Aquí defines el modelo que quieres usar para tu agente.\n' },
        { type: 'comment', text: '# Los modelos "gratuitos" disponibles en la infraestructura Groq son:\n' },
        { type: 'comment', text: '# 1️⃣ "llama-3.3-70b-versatile"     → Equilibrado, rápido y generalista.\n' },
        { type: 'comment', text: '# 2️⃣ "llama-3.1-8b-instruct"       → Liviano, ideal para chat y QA.\n' },
        { type: 'comment', text: '# 3️⃣ "mixtral-8x7b"                → Excelente para tareas analíticas.\n' },
        { type: 'comment', text: '# 4️⃣ "gemma-7b-it"                 → Eficiente para generación de texto corta.\n' },
        { type: 'comment', text: '# 5️⃣ "llama-guard-2-8b"            → Especializado en filtrado seguro de contenido.\n' },
        { type: 'comment', text: '#\n' },
        { type: 'comment', text: '# También tienes acceso a modelos premium como ChatGPT-5 y Gemini,\n' },
        { type: 'comment', text: '# pero estos requieren suscripción y están pensados para producción avanzada.\n' },
        { type: 'comment', text: '#\n' },
        { type: 'comment', text: '# 👉 Alterna el modelo según el tipo de agente que quieras crear.\n' },
        { type: 'comment', text: '# ------------------------------------------------------\n\n' },
        { text: 'USER_SETTINGS = {\n' },
        { text: '    "model": "llama-3.3-70b-versatile",\n' },
        { text: '}\n' },
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

        {/* Texto explicativo */}
        <div className="flex-1 md:w-[30%] flex flex-col justify-center items-center text-center pr-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Ajuste de Modelos en GLYNNE Framework
          </h2>
          <p className="text-xs text-gray-500 leading-snug">
            Este bloque define el modelo de IA que tu agente utilizará. 
            Puedes elegir entre los modelos gratuitos de Groq para pruebas y desarrollo, 
            o usar modelos premium como ChatGPT-5 o Gemini si cuentas con suscripción para producción. 
            Cambiar el modelo permite crear agentes con distintos enfoques: rápidos, analíticos, seguros o especializados.
          </p>
        </div>

        {/* Contenedor del código */}
        <div className="flex flex-col w-full md:w-[65%] mt-4 md:mt-0">
          
          {/* Header estilo ventana Mac */}
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

          {/* Bloque de código con scroll */}
          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-4 font-mono text-sm shadow-inner border border-gray-200 overflow-y-auto max-h-[400px]">
            <pre className="whitespace-pre-wrap leading-relaxed text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
