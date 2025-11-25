'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function IntroCodeSection({
  show = true,
  API_URL = 'https://gly-chat-v1-2.onrender.com'
}) {
  if (!show) return null;

  // Nuevos ejemplos de instalación
  const examples = [
    {
      lang: 'Clonar repositorio',
      code: [
        { type: 'keyword', text: 'git' }, { text: ' clone ' },
        { type: 'string', text: 'https://github.com/thealeglynne/GLYNNE_fornt1' },
        { text: '\n' },
        { type: 'keyword', text: 'cd' }, { text: ' GLYNNE_fornt1' }
      ]
    },
    {
      lang: 'Instalar dependencias',
      code: [
        { type: 'keyword', text: 'npm' }, { text: ' install\n' },
        { type: 'keyword', text: 'npm' }, { text: ' install ' },
        { type: 'string', text: 'framer-motion lucide-react marked' }
      ]
    },
    {
      lang: 'Iniciar proyecto',
      code: [
        { type: 'keyword', text: 'npm' }, { text: ' run dev\n\n' },
        { text: '# Proyecto Next.js completamente preparado\n' },
        { text: '# Conexión lista para trabajar con GLYNNE IA' }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevExample = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? examples.length - 1 : prev - 1
    );

  const nextExample = () =>
    setCurrentIndex((prev) =>
      prev === examples.length - 1 ? 0 : prev + 1
    );

  const copyToClipboard = () =>
    navigator.clipboard.writeText(
      examples[currentIndex].code.map((c) => c.text).join('')
    );

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = 'text-neutral-800';
      if (c.type === 'keyword') color = 'text-sky-600';
      if (c.type === 'string') color = 'text-emerald-600';
      return (
        <span key={i} className={color}>
          {c.text}
        </span>
      );
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-4 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-[80%] bg-white shadow-md rounded-2xl p-4 border border-gray-100">

        {/* Texto descriptivo actualizado */}
        <div className="flex-1 text-left md:pr-6 w-[30%] flex flex-col justify-center">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Instala el proyecto base de GLYNNE para Next.js
          </h2>
          <p className="text-xs text-gray-500 leading-snug">
            Solo necesitas clonar el repositorio y ejecutar las instalaciones.
            El proyecto viene completamente configurado para que empieces a
            construir y conectar tus modelos de IA creados en GLYNNE desde el
            primer arranque.
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
              <span className="ml-2 font-semibold text-neutral-600 text-xs">
                {examples[currentIndex].lang}
              </span>
              <button
                onClick={prevExample}
                className="ml-2 p-1 rounded hover:bg-gray-200 transition"
              >
                <ArrowLeft className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={nextExample}
                className="p-1 rounded hover:bg-gray-200 transition"
              >
                <ArrowRight className="w-3 h-3 text-gray-600" />
              </button>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-1 rounded hover:bg-gray-200 transition"
            >
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* Bloque de código */}
          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-3 font-mono text-xs shadow-inner border border-gray-200 overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-snug text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
