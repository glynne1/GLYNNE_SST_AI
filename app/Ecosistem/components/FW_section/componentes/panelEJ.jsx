'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function FrameworkTreeScroll({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Configuración del Agente',
      code: [
        { type: 'comment', text: '# ===============================================\n' },
        { type: 'comment', text: '# 🧠 GLYNNE FRAMEWORK - CONFIGURACIÓN DE AGENTE\n' },
        { type: 'comment', text: '# ===============================================\n' },
        { type: 'comment', text: '# 📂 Archivo: user/panel.py\n' },
        { type: 'comment', text: '# 📦 Objetivo:\n' },
        { type: 'comment', text: '#     Este módulo define la configuración base de un agente IA.\n' },
        { type: 'comment', text: '#     Cada archivo dentro de la carpeta `user/` representa un agente diferente,\n' },
        { type: 'comment', text: '#     con su propio modelo, temperatura, rol y prompt personalizado.\n' },
        { type: 'comment', text: '#\n' },
        { type: 'comment', text: '# 🧩 Ejemplo:\n' },
        { type: 'comment', text: '#     - user/panel.py           → Agente general (analista técnico)\n' },
        { type: 'comment', text: '#     - user/panel2.py          → Agente comercial\n' },
        { type: 'comment', text: '#     - user/panel_marketing.py → Agente enfocado en marketing estratégico\n' },
        { type: 'comment', text: '#\n' },
        { type: 'comment', text: '# ⚙️ Este archivo se conecta con el núcleo del framework (core/panel.py)\n' },
        { type: 'comment', text: '#     mediante la clase `CorePanel`, que interpreta estas configuraciones\n' },
        { type: 'comment', text: '#     y expone una interfaz FastAPI (en el main.py del proyecto).\n' },
        { type: 'comment', text: '# ===============================================\n\n' },

        { text: 'from core.panel import CorePanel\n\n' },

        { type: 'comment', text: '# ======================================================\n' },
        { type: 'comment', text: '# ⚙️ CONFIGURACIÓN DEL AGENTE PERSONALIZADO\n' },
        { type: 'comment', text: '# ======================================================\n' },
        { text: 'USER_SETTINGS = {\n' },
        { type: 'comment', text: '    # 🤖 MODELO\n' },
        { text: '    "model": "llama-3.3-70b-versatile",\n\n' },
        { type: 'comment', text: '    # 🌡️ TEMPERATURA\n' },
        { text: '    "temperature": 0.7,\n\n' },
        { type: 'comment', text: '    # 🧍‍♂️ ROL DEL AGENTE\n' },
        { text: '    "rol": "Analista Técnico en Automatización Empresarial",\n\n' },
        { type: 'comment', text: '    # 💬 PROMPT BASE\n' },
        { text: '    "prompt": """\n' },
        { text: '    [META]\n' },
        { text: '    Actúa como un {rol} especializado en analizar procesos empresariales,\n' },
        { text: '    identificar cuellos de botella y proponer soluciones técnicas \n' },
        { text: '    basadas en inteligencia artificial y automatización.\n\n' },
        { text: '    [HISTORIAL]\n' },
        { text: '    {historial}\n\n' },
        { text: '    [ENTRADA DEL USUARIO]\n' },
        { text: '    {mensaje}\n\n' },
        { text: '    [RESPUESTA]\n' },
        { text: '    Ofrece una respuesta profesional, clara y enfocada en soluciones escalables.\n' },
        { text: '    """\n' },
        { text: '}\n\n' },

        { type: 'comment', text: '# ======================================================\n' },
        { type: 'comment', text: '# 🚀 INICIALIZACIÓN DEL FRAMEWORK\n' },
        { type: 'comment', text: '# ======================================================\n' },
        { text: 'framework = CorePanel(USER_SETTINGS)\n' },
        { text: 'app = framework.graph\n' },
      ],
    },
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
      <div className="flex flex-col w-[95%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">

        {/* 🧠 Bloque informativo superior */}
        <div className="mb-6 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Configura la mente de tu agente.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            En GLYNNE Framework, cada agente IA nace dentro de la carpeta <strong>user/</strong>.  
            Aquí defines su modelo, temperatura, rol y estructura cognitiva.  
            Este archivo es más que una configuración: es la <em>identidad</em> con la que el agente razonará, 
            interactuará y tomará decisiones dentro del ecosistema.
          </p>
        </div>

        {/* 🧩 Contenedor tipo terminal */}
        <div className="flex flex-col w-full">
          
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

          {/* Bloque de código */}
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
