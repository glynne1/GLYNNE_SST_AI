'use client';

import React from 'react';
import { Copy, Info } from 'lucide-react';

export default function FrameworkUserPanel({ show = true }) {
  if (!show) return null;

  const example = {
    lang: 'User Config',
    code: [
      { type: 'comment', text: '📂 GLYNNE Framework - Carpeta de usuario\n' },
      { type: 'highlight-folder', text: '└── 📁user\n' },
      { text: '    └── 📁__pycache__\n' },
      { text: '        ├── __init__.cpython-312.pyc\n' },
      { text: '        ├── panel.cpython-312.pyc\n' },
      { type: 'highlight-file', text: '    ├── panel.py   ← 🔧 Punto de personalización del agente\n' },
    ],
  };

  const copyToClipboard = () =>
    navigator.clipboard.writeText(example.code.map((c) => c.text).join(''));

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = 'text-neutral-800';
      if (c.type === 'comment') color = 'text-gray-500 italic';
      if (c.type === 'highlight-folder') color = 'text-blue-600 font-semibold';
      if (c.type === 'highlight-file') color = 'text-emerald-600 font-bold';
      return (
        <span key={i} className={color}>
          {c.text}
        </span>
      );
    });

  return (
    <div className="flex flex-col justify-center items-center w-full bg-white py-8 px-6">
      <div className="w-[90%] md:w-[90%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">

        {/* Texto descriptivo alineado a la izquierda */}
        <div className="text-left mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-3">
            user/panel.py — Núcleo de Personalización del Agente
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
        
            Cada archivo que crees dentro de esta carpeta puede representar un agente distinto,
            compartiendo el mismo motor base, pero con una <strong>identidad y propósito únicos</strong>.
            Así, puedes tener múltiples agentes coexistiendo, cada uno especializado en una función específica
            dentro de tu arquitectura.
          </p>
        </div>

        {/* Header estilo ventana Mac */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="ml-2 font-semibold text-neutral-600 text-xs">{example.lang}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <Copy className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        {/* Bloque de código */}
        <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-4 font-mono text-sm shadow-inner border border-gray-200 overflow-y-auto max-h-[300px]">
          <pre className="whitespace-pre-wrap leading-relaxed text-left">
            <code>{renderCode(example.code)}</code>
          </pre>
        </div>

        {/* Bloque explicativo */}
        <div className="mt-6 bg-red-50 border border-red-400 rounded-xl p-4 flex gap-3 items-start">
          <Info className="w-5 h-5 text-red-600 mt-1" />
          <p className="text-red-700 text-sm leading-relaxed max-w-3xl">
            Dentro de <span className="font-semibold">📁user/panel.py</span> se controla el corazón de cada agente.  
            Aquí defines cómo piensa, cómo se comunica y qué modelo utiliza para razonar.
            <br /><br />
            Esta arquitectura modular permite tener múltiples archivos con la misma estructura,
            cada uno representando un agente diferente, sincronizados con el mismo motor GLYNNE.
          </p>
        </div>
      </div>
    </div>
  );
}
