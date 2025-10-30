'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function CLIExample({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'FastAPI',
      code: [
        { type: 'comment', text: '# 🧠 Montar el servidor local de FastAPI\n' },
        { type: 'comment', text: '# Asegúrate de estar en la raíz del proyecto\n' },
        { type: 'comment', text: '# y de tener el archivo .env con tu GROQ_API_KEY configurada.\n\n' },
        { text: '$ uvicorn main:app --host 0.0.0.0 --port 8000\n\n' },
        { type: 'comment', text: '# El servidor se iniciará en:\n' },
        { text: 'http://localhost:8000\n' },
        { type: 'comment', text: '# o en tu red local:\n' },
        { text: 'http://0.0.0.0:8000\n\n' },
        { type: 'comment', text: '# Desde aquí puedes probar tus endpoints,\n' },
        { type: 'comment', text: '# interactuar con los modelos y validar tus integraciones.\n' },
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
      if (c.type === 'keyword') color = 'text-sky-600';
      if (c.type === 'string') color = 'text-emerald-600';
      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-4 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-[90%] bg-white shadow-md rounded-2xl p-4 border border-gray-100">

        {/* Texto descriptivo */}
        <div className="flex-1 text-left md:pr-6 w-[30%] flex flex-col justify-center">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Inicia tu servidor FastAPI
          </h2>
          <p className="text-xs text-gray-500 leading-snug">
            Para probar tu framework y todo el frontend de GLYNNE, primero necesitas levantar el servidor local de FastAPI. 
            Ejecuta el comando mostrado en la terminal de la derecha y accede a <code>http://localhost:8000</code> para probar endpoints, modelos e integraciones.
          </p>
        </div>

        {/* Contenedor del código */}
        <div className="flex flex-col w-full md:w-[70%] mt-3 md:mt-0">
          
          {/* Header estilo ventana Mac */}
          <div className="flex items-center justify-between mb-2">
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
          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-3 font-mono text-xs shadow-inner border border-gray-200 overflow-y-auto max-h-[400px]">
            <pre className="whitespace-pre-wrap leading-snug text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
