'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function FrameworkTreeScroll({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Estructura',
      code: [
        { type: 'comment', text: '📂 GLYNNE Framework - Estructura de Carpetas\n' },
        { text: '└── 📁GLYNNE_Agents_ecosistem\n' },
        { text: '    └── 📁__pycache__\n' },
        { text: '        ├── main.cpython-312.pyc\n' },
        { text: '    └── 📁core\n' },
        { text: '        └── 📁__pycache__\n' },
        { text: '            ├── config.cpython-312.pyc\n' },
        { text: '            ├── graph_manager.cpython-312.pyc\n' },
        { text: '            ├── imports.cpython-312.pyc\n' },
        { text: '            ├── llm_manager.cpython-312.pyc\n' },
        { text: '            ├── memory_manager.cpython-312.pyc\n' },
        { text: '            ├── panel.cpython-312.pyc\n' },
        { text: '            ├── prompt_manager.cpython-312.pyc\n' },
        { text: '        ├── __init__.py\n' },
        { text: '        ├── cli_runner.py\n' },
        { text: '        ├── config.py\n' },
        { text: '        ├── graph_manager.py\n' },
        { text: '        ├── imports.py\n' },
        { text: '        ├── llm_manager.py\n' },
        { text: '        ├── memory_manager.py\n' },
        { text: '        ├── panel.py\n' },
        { text: '        ├── prompt_manager.py\n' },
        { text: '    └── 📁user\n' },
        { text: '        └── 📁__pycache__\n' },
        { text: '            ├── __init__.cpython-312.pyc\n' },
        { text: '            ├── panel.cpython-312.pyc\n' },
        { text: '        ├── panel.py\n' },
        { text: '    ├── .env\n' },
        { text: '    ├── .gitignore\n' },
        { text: '    ├── CLI.py\n' },
        { text: '    ├── GLYNNE_Documentacion.pdf\n' },
        { text: '    ├── main.py\n' },
        { text: '    ├── README.md\n' },
        { text: '    └── requirements.txt\n' },
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

        {/* Logo descriptivo */}
        <div className="flex-1 md:pr-6 w-[10%] flex justify-center items-center">
          <img 
            src="/logo2.png" 
            alt="Logo GLYNNE" 
            className="max-w-[40%] h-auto"
          />
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
