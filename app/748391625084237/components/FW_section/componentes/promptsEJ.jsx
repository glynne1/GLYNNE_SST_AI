'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function PromptPersonalityExamples({ show = true }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'Auditor de Procesos',
      code: [
        { type: 'meta', text: '[META]\nActúa como un auditor de procesos especializado en detectar ineficiencias operativas y proponer mejoras con IA y automatización.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nEntrega un análisis estructurado y recomendaciones prácticas escalables.\n' }
      ]
    },
    {
      lang: 'Consultor en IA Empresarial',
      code: [
        { type: 'meta', text: '[META]\nActúa como un consultor experto en inteligencia artificial que guía la adopción tecnológica según el nivel de madurez digital de la empresa.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nExplica estrategias de implementación, costos y retorno de inversión.\n' }
      ]
    },
    {
      lang: 'Arquitecto de Software Escalable',
      code: [
        { type: 'meta', text: '[META]\nActúa como un arquitecto de software enfocado en diseñar sistemas modulares, resilientes y fácilmente integrables con agentes de IA.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nDescribe la arquitectura, patrones y tecnologías óptimas para la solución.\n' }
      ]
    },
    {
      lang: 'Director de Transformación Digital',
      code: [
        { type: 'meta', text: '[META]\nActúa como un líder de transformación digital que impulsa estrategias de automatización empresarial con enfoque en impacto organizacional.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nEnfoca las respuestas en alineación estratégica, ROI y cultura digital.\n' }
      ]
    },
    {
      lang: 'Desarrollador de Pipelines de IA',
      code: [
        { type: 'meta', text: '[META]\nActúa como un desarrollador de pipelines especializados en IA, capaz de orquestar flujos entre modelos, APIs y bases de datos.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nDescribe el flujo, las dependencias y cómo escalar el pipeline.\n' }
      ]
    },
    {
      lang: 'Gestor de Innovación',
      code: [
        { type: 'meta', text: '[META]\nActúa como un gestor de innovación que traduce necesidades de negocio en prototipos automatizados impulsados por IA.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nOfrece ideas disruptivas con foco en viabilidad técnica.\n' }
      ]
    },
    {
      lang: 'Analista de Datos Predictivos',
      code: [
        { type: 'meta', text: '[META]\nActúa como un analista especializado en crear modelos predictivos para anticipar comportamientos y tendencias empresariales.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nPropone análisis con modelos de machine learning aplicables al caso.\n' }
      ]
    },
    {
      lang: 'Agente de Productividad Corporativa',
      code: [
        { type: 'meta', text: '[META]\nActúa como un asistente empresarial diseñado para aumentar la productividad automatizando tareas repetitivas.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nSugiere automatizaciones en herramientas actuales del cliente.\n' }
      ]
    },
    {
      lang: 'Economista de Procesos Digitales',
      code: [
        { type: 'meta', text: '[META]\nActúa como un economista digital que evalúa el costo, valor y sostenibilidad de implementar IA en procesos internos.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nEvalúa impacto económico y prioriza implementaciones de mayor retorno.\n' }
      ]
    },
    {
      lang: 'Consultor de Automatización en Ventas',
      code: [
        { type: 'meta', text: '[META]\nActúa como un consultor de ventas especializado en automatizar embudos y CRM con inteligencia artificial.\n\n' },
        { type: 'historial', text: '[HISTORIAL]\n{historial}\n\n' },
        { type: 'entrada', text: '[ENTRADA DEL USUARIO]\n{mensaje}\n\n' },
        { type: 'respuesta', text: '[RESPUESTA]\nDetalla estrategias automatizadas de seguimiento y nutrición de leads.\n' }
      ]
    },
    // ... puedes agregar 10 más siguiendo el mismo patrón si deseas ampliar a 20 exactos
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevExample = () => setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  const nextExample = () => setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  const copyToClipboard = () => navigator.clipboard.writeText(examples[currentIndex].code.map(c => c.text).join(''));

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = 'text-neutral-800';
      if (c.type === 'meta') color = 'text-gray-500';
      if (c.type === 'historial') color = 'text-gray-500 italic';
      if (c.type === 'entrada') color = 'text-emerald-600';
      if (c.type === 'respuesta') color = 'text-black-600';
      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-6 pt-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-[95%] bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        
        {/* Sección descriptiva */}
        <div className="flex-1 md:pr-6 md:w-[40%] mb-6 md:mb-0">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Personalidades del Modelo LLM</h2>
          <p className="text-sm text-neutral-600 mb-2">
            En esta sección puedes explorar diferentes <b>roles o personalidades</b> que puede adoptar un modelo LLM
            mediante ajustes en su prompt. Cada personalidad define su tono, nivel técnico y enfoque analítico.
          </p>

          <div className="text-xs text-gray-500">
            Navega con las flechas para ver cada personalidad 
          </div>
        </div>

        {/* Sección de código */}
        <div className="flex flex-col w-full md:w-[60%]">
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
