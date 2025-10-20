'use client';

import React from 'react';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FrameworkStructure() {

  const structure = `└── 📁GLYNNE_Agents_ecosistem
    └── 📁__pycache__
        ├── main.cpython-312.pyc
    └── 📁core
        └── 📁__pycache__
            ├── config.cpython-312.pyc
            ├── graph_manager.cpython-312.pyc
            ├── imports.cpython-312.pyc
            ├── llm_manager.cpython-312.pyc
            ├── memory_manager.cpython-312.pyc
            ├── panel.cpython-312.pyc
            ├── prompt_manager.cpython-312.pyc
        ├──  __init__.py
        ├── cli_runner.py
        ├── config.py
        ├── graph_manager.py
        ├── imports.py
        ├── llm_manager.py
        ├── memory_manager.py
        ├── panel.py
        ├── prompt_manager.py
    └── 📁user
        └── 📁__pycache__
            ├── __init__.cpython-312.pyc
            ├── panel.cpython-312.pyc
        ├── panel.py
    ├── .env
    ├── .gitignore
    ├── CLI.py
    ├── GLYNNE_Documentacion.pdf
    ├── main.py
    ├── README.md
    └── requirements.txt
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(structure);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center px-6 md:px-16 py-12 bg-white">
      <motion.div
        className="max-w-4xl w-full flex flex-col items-start text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* 🧱 Título y descripción */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
          Estructura del Framework GLYNNE
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          La siguiente estructura representa la arquitectura interna del framework una vez instalado.  
          <strong className="text-gray-900"> La única carpeta que debe modificarse es <code>/user</code></strong>,  
          donde podrá personalizar el agente, ajustar el modelo, la temperatura y el rol del sistema.  
          El resto del ecosistema maneja la lógica interna, el enrutamiento, la gestión de memoria y la conexión con el LLM.
        </p>

        {/* 💻 Consola simulada */}
        <motion.div
          className="w-full md:w-[90%] bg-neutral-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Header tipo Mac */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="ml-3 text-xs text-gray-600 font-medium">estructura del proyecto</span>
            </div>
            <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* Bloque de código */}
          <div className="p-4 font-mono text-xs text-left overflow-x-auto text-gray-800 leading-snug">
            <pre className="whitespace-pre-wrap">
              <code>{structure}</code>
            </pre>
          </div>
        </motion.div>

        {/* 🔹 Nota inferior */}
        <p className="text-xs text-gray-500 mt-4 border-l-4 border-gray-300 pl-3">
          🔧 <strong>Importante:</strong> solo modifique la carpeta <code>/user</code>.  
          Las demás carpetas contienen los controladores internos del ecosistema de agentes.
        </p>
      </motion.div>
    </section>
  );
}
