'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function TextSection() {
  const repoURL = 'https://github.com/GLYNNE-AI/GLYNNE-Framework';
  const examples = [
    {
      lang: 'bash',
      code: [
        { type: 'comment', text: '# 📦 Clonar el Framework de GLYNNE\n' },
        { type: 'keyword', text: 'git' }, { text: ' clone ' },
        { type: 'string', text: repoURL }, { text: '\n\n' },
        { type: 'comment', text: '# 🧠 Accede al proyecto\n' },
        { text: 'cd GLYNNE-Framework\n' },
        { type: 'comment', text: '# Abre el entorno en VSCode\n' },
        { type: 'keyword', text: 'code' }, { text: ' .' },
      ]
    },
    {
      lang: 'powershell',
      code: [
        { type: 'comment', text: '# 📦 Clona el Framework de GLYNNE\n' },
        { type: 'keyword', text: 'git' }, { text: ' clone ' },
        { type: 'string', text: repoURL }, { text: '\n\n' },
        { type: 'comment', text: '# 🧠 Abre el proyecto en Visual Studio Code\n' },
        { text: 'Set-Location GLYNNE-Framework\n' },
        { text: 'code .' },
      ]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevExample = () => setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  const nextExample = () => setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  const copyToClipboard = () =>
    navigator.clipboard.writeText(examples[currentIndex].code.map(c => c.text).join(''));

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = 'text-gray-800';
      if (c.type === 'keyword') color = 'text-blue-600';
      if (c.type === 'string') color = 'text-emerald-600';
      if (c.type === 'comment') color = 'text-gray-500 italic';
      return <span key={i} className={color}>{c.text}</span>;
    });

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 bg-white">
      <motion.div
        className="max-w-6xl w-full flex flex-col items-start text-left space-y-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >

        {/* Título y texto general sobre instalación */}
        <div className="flex flex-col items-start mb-4">
          <h1 className="text-lg font-bold text-gray-800 mb-1">
            Varias formas de instalar GLYNNE Framework
          </h1>
          <p className="text-sm text-gray-500 leading-snug">
            Tenemos varias formas de instalar nuestra herramienta de desarrollo. La forma más directa es clonar el repositorio oficial de GitHub: <code>{repoURL}</code>, luego crear el entorno virtual, instalar dependencias y ejecutar la aplicación localmente.
          </p>
        </div>

        {/* Bloque de código + texto explicativo */}
        <div className="flex flex-col md:flex-row items-center w-full bg-white shadow-md rounded-2xl p-4 border border-gray-100">
          {/* Texto explicativo */}
          <div className="flex-1 md:w-[30%] flex flex-col justify-center items-center text-center pr-6">
            <h2 className="text-base font-semibold text-gray-800 mb-1">
              Clonar o descargar GLYNNE Framework
            </h2>
            <p className="text-xs text-gray-500 leading-snug">
              Puedes clonar el repositorio desde GitHub, pero si lo haces deberás crear el entorno virtual,
              instalar dependencias, activar el entorno y configurar <code>.gitignore</code> y <code>.env</code>.
              La forma más rápida es descargarlo desde la página oficial, donde todo viene listo para ejecutar.
            </p>
          </div>

          {/* Contenedor del código */}
          <div className="flex flex-col w-full md:w-[70%] mt-6 md:mt-0">
            {/* Header estilo ventana Mac */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="ml-2 font-semibold text-neutral-600 text-xs">{examples[currentIndex].lang}</span>
                <button onClick={prevExample} className="ml-2 p-1 rounded hover:bg-gray-200 transition">
                  <ArrowLeft className="w-3 h-3 text-gray-600" />
                </button>
                <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition">
                  <ArrowRight className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
                <Copy className="w-3 h-3 text-gray-600" />
              </button>
            </div>

            {/* Bloque de código */}
            <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-3 font-mono text-xs shadow-inner border border-gray-200 overflow-x-auto">
              <pre className="whitespace-pre-wrap leading-snug text-left">
                <code>{renderCode(examples[currentIndex].code)}</code>
                {'\n'}
                <span className="text-gray-500 italic"># Crear y activar entorno virtual</span>{'\n'}
                python -m venv venv{'\n'}
                cd venv{'\n'}
                cd bin{'\n'}
                source activate{'\n'}
                cd ..{'\n'}
                cd ..{'\n\n'}
                <span className="text-gray-500 italic"># Instalar dependencias</span>{'\n'}
                pip install -r requirements.txt{'\n\n'}
                <span className="text-gray-500 italic"># Ejecutar entorno local</span>{'\n'}
                uvicorn main:app --host 0.0.0.0 --port 8000
              </pre>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
