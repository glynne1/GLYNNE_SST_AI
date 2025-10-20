'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import React from 'react';

export default function EnvModelosGroq() {
  const prevExample = () => {};
  const nextExample = () => {};
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`USER_SETTINGS = {
    # ------------------------------------------------------
    # 🤖 MODELO
    # ------------------------------------------------------
    # Aquí defines el modelo que quieres usar. 
    # Los modelos “gratuitos” disponibles en la infraestructura de Groq 
    # (al momento de esta versión del framework) son:
    #
    # 1️⃣  "llama-3.3-70b-versatile"     → Equilibrado, rápido y generalista.
    # 2️⃣  "llama-3.1-8b-instruct"       → Más liviano, ideal para chat y QA.
    # 3️⃣  "mixtral-8x7b"                → Excelente para tareas analíticas.
    # 4️⃣  "gemma-7b-it"                 → Eficiente para generación de texto corta.
    # 5️⃣  "llama-guard-2-8b"            → Especializado en filtrado seguro de contenido.
    #
    # 👉 Puedes alternar el modelo según el tipo de agente que quieras crear.
    # ------------------------------------------------------
    "model": "llama-3.3-70b-versatile",
}`);
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
          ⚙️ Configuración de modelos disponibles
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          En esta sección puedes ajustar qué modelo de lenguaje deseas usar dentro de tu entorno.  
          Por defecto, el sistema usa los modelos gratuitos de <strong>GLYNNE</strong>, pero puedes cambiarlo fácilmente
          por tu modelo preferido, ya sea <strong>OpenAI</strong>, <strong>Gemini</strong> o cualquier otro proveedor compatible.
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
            <span className="ml-3 text-xs text-gray-700 font-medium">settings.py — VS Code Light</span>
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

        {/* Contenido tipo Python (tema claro VSCode) */}
        <div className="p-4 font-mono text-sm leading-relaxed bg-[#f8f8f8] text-gray-900">
          <pre className="whitespace-pre-wrap text-left">
            <code>
              <span className="text-[#0451A5]">USER_SETTINGS</span>{' '}
              <span className="text-gray-700">= {'{'}</span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# ------------------------------------------------------
              </span>{'\n'}
              <span className="text-[#008000]">{'    '}# 🤖 MODELO</span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# ------------------------------------------------------
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# Aquí defines el modelo que quieres usar.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# Los modelos “gratuitos” disponibles en la infraestructura de Groq
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# (al momento de esta versión del framework) son:
              </span>{'\n\n'}
              <span className="text-[#008000]">
                {'    '}# 1️⃣  "llama-3.3-70b-versatile"     → Equilibrado, rápido y generalista.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# 2️⃣  "llama-3.1-8b-instruct"       → Más liviano, ideal para chat y QA.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# 3️⃣  "mixtral-8x7b"                → Excelente para tareas analíticas.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# 4️⃣  "gemma-7b-it"                 → Eficiente para generación de texto corta.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# 5️⃣  "llama-guard-2-8b"            → Especializado en filtrado seguro de contenido.
              </span>{'\n\n'}
              <span className="text-[#008000]">
                {'    '}# 👉 Puedes alternar el modelo según el tipo de agente que quieras crear.
              </span>{'\n'}
              <span className="text-[#008000]">
                {'    '}# ------------------------------------------------------
              </span>{'\n'}
              <span className="text-[#A31515]">{'    '}"model"</span>
              <span className="text-gray-700">: </span>
              <span className="text-[#A31515]">"llama-3.3-70b-versatile"</span>
              <span className="text-gray-700">,</span>{'\n'}
              <span className="text-gray-700">{'}'}</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
