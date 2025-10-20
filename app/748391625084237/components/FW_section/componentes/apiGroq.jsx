'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import React from 'react';

export default function EnvGroqExampleLight() {
  const prevExample = () => {};
  const nextExample = () => {};
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`# Archivo .env
# Configuración de credenciales para Groq API

GROQ_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

PORT=8000
ENVIRONMENT=development`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-8">
      {/* Texto explicativo alineado a la izquierda */}
      <motion.div
        className="w-full md:w-[90%] mb-6 text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Cómo obtener tu API Key de Groq
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Para utilizar los modelos de Groq en tu proyecto, primero crea una cuenta en{' '}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://console.groq.com/keys
          </a>.  
          Luego dirígete a <strong>Generate New Key</strong> copia tu clave
          para agregarla en tu archivo <code>.env</code> como se muestra a continuación.
        </p>
      </motion.div>

      {/* Bloque tipo terminal estilo VS Code Light */}
      <motion.div
        className="w-full md:w-[90%] bg-[#f8f8f8] border border-gray-300 rounded-xl shadow-lg overflow-hidden mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Header tipo terminal */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span className="ml-3 text-xs text-gray-700 font-medium">.env — VS Code Light</span>
          </div>
          <div className="flex gap-1">
            <button onClick={prevExample} className="p-1 rounded hover:bg-gray-200 transition">
              <ArrowLeft className="w-3 h-3 text-gray-500" />
            </button>
            <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition">
              <ArrowRight className="w-3 h-3 text-gray-500" />
            </button>
            <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
              <Copy className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Contenido tipo código (tema claro VSCode) */}
        <div className="p-4 font-mono text-sm leading-relaxed bg-[#f8f8f8] text-gray-900">
          <pre className="whitespace-pre-wrap text-left">
            <code>
              <span className="text-[#008000]"># Archivo .env</span>{'\n'}
              <span className="text-[#008000]"># Configuración de credenciales para Groq API</span>{'\n\n'}
              <span className="text-[#0451A5]">GROQ_API_KEY</span>
              <span className="text-gray-700">=</span>
              <span className="text-[#A31515]">sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>{'\n\n'}
              <span className="text-[#0451A5]">PORT</span>
              <span className="text-gray-700">=</span>
              <span className="text-[#098658]">8000</span>{'\n'}
              <span className="text-[#0451A5]">ENVIRONMENT</span>
              <span className="text-gray-700">=</span>
              <span className="text-[#A31515]">development</span>{'\n'}
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
