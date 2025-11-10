'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function FrameworkTreeScroll({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Get-Groq-API-Key.txt',
      code: [
        { type: 'comment', text: '🔑 ¿Cómo obtener tu API Key de Groq?\n\n' },
        { text: "1. Ingresa a la consola oficial:\n" },
        { text: "   👉 " },
        { type: "link", text: "Abrir console.groq.com/keys", href: "https://console.groq.com/keys" },

        { text: "3. Clic en:  'Create API Key'\n\n" },

        { type: "api", text: "gsk_FDt3wdXpb4qrvLiDlsSnWGdy........\n\n" },
        { text: "⚠️ Importante:\n" },
        { text: "- No compartas tu API Key públicamente.\n" },

        { type: "comment", text: "✅ ¡Ahora  Puedes usar tu API Key en tus proyectos! 🚀" }
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
      if (c.type === "link") {
        return (
          <a
            key={i}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            {c.text}
          </a>
        );
      }

      let color = "text-neutral-800";
      if (c.type === "comment") color = "text-gray-500 italic";
      if (c.type === "api") color = "text-green-600 font-bold";

      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <div className="flex  flex-col items-center w-full bg-white p-8">

      {/* ✅ TITULO Y TEXTO FUERA DE LA CONSOLA */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Obtén tu API Key de Groq</h2>
      <p className="text-gray-600 text-sm text-center max-w-xl mb-6">
        Sigue los pasos para generar tu API Key y usarla en tus proyectos de inteligencia artificial.
        No compartas tu clave con nadie y úsala con buenas prácticas de seguridad.
      </p>

      {/* CAJA PRINCIPAL */}
      <div className="flex  flex-col md:flex-row items-center w-[95%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">

        {/* Texto lateral */}
        <div className="flex-1 md:pr-6 w-full md:w-[25%] flex justify-center items-center text-center mb-4 md:mb-0">
          <p className="text-sm text-gray-700 font-medium leading-snug">
            🔐 Genera tu API Key y úsala para conectar tus agentes o proyectos con Groq.
          </p>
        </div>

        {/* Consola */}
        <div className="flex flex-col w-full md:w-[70%]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="ml-2 font-semibold text-neutral-600 text-xs">{examples[currentIndex].lang}</span>
              <button onClick={prevExample} className="ml-2 p-1 rounded hover:bg-gray-200"><ArrowLeft className="w-3 h-3 text-gray-600" /></button>
              <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200"><ArrowRight className="w-3 h-3 text-gray-600" /></button>
            </div>
            <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200">
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

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
