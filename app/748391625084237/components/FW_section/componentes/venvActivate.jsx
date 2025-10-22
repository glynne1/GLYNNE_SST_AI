'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function CLIExample({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Terminal',
      code: [
        { type: 'comment', text: '# Activa tu agente\n' },
        { text: 'source venv/bin/activate\n' },
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
      if (c.type === 'keyword') color = 'text-sky-600';
      if (c.type === 'string') color = 'text-emerald-600';
      if (c.type === 'comment') color = 'text-gray-500 italic';
      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-6 pt-8">
      <div className="flex flex-col md:flex-row items-start justify-center w-[95%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">

        {/* Texto descriptivo */}
        <div className="flex-1 text-left md:pr-8 w-[35%] flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Una vez instalado
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            No necesitarás instalar librerías, configurar entornos ni editar nada más que la <strong>personalidad</strong> del modelo. Todo viene pre-instalado y listo para usar; solo ejecuta el comando para activar tu agente.
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

          {/* Bloque de código con más padding */}
          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-6 font-mono text-sm shadow-inner border border-gray-200 overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-relaxed text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
