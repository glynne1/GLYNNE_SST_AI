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
        className="max-w-4xl w-full flex flex-col items-center text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* 📖 Texto tipo documentación */}
        <motion.div
          className="text-gray-700 text-sm md:text-[15px] leading-relaxed mb-10 w-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
            Instalación del Framework GLYNNE
          </h2>

      

          <ol className="list-decimal pl-4 space-y-3">
            <li>
              <strong>Descargar el ejecutable (.zip):</strong>  
              la forma más rápida de comenzar. Descargue el archivo, descomprímalo y ejecútelo.
              Este método incluye todos los módulos, dependencias y estructura base preconfigurada.
            </li>
             {/* 🔹 Botón principal */}
       <motion.a
  href="/GLYNNE_FW.zip"
  download
  className="relative px-12 py-3 text-sm md:text-base font-semibold 
             bg-gradient-to-r from-neutral-800 via-neutral-900 to-black
             text-white shadow-xl overflow-hidden rounded-xl group transition-all duration-300 inline-block"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
>
  {/* 💡 Efecto de brillo dinámico */}
  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
  <span className="relative z-10 font-medium tracking-wide">
    Descargar GLYNNE Framework (.zip)
  </span>
</motion.a>

<motion.p
  className="text-gray-400 text-xs md:text-sm mt-4 text-center md:text-left"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.6 }}
>
  Haga clic derecho → “Abrir” para iniciar la instalación en MacOS.
</motion.p>

            <li>
              <strong>Clonar el repositorio manualmente:</strong>  
              si prefiere trabajar desde la terminal, puede clonar el repositorio oficial e instalar
              el entorno con Python.
            </li>
          </ol>
        </motion.div>

        {/* 💻 Consola tipo Mac */}
        <motion.div
          className="w-full md:w-[90%] bg-neutral-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="ml-3 text-xs text-gray-600 font-medium">{examples[currentIndex].lang}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={prevExample} className="p-1 rounded hover:bg-gray-200 transition">
                <ArrowLeft className="w-3 h-3 text-gray-600" />
              </button>
              <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition">
                <ArrowRight className="w-3 h-3 text-gray-600" />
              </button>
              <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
                <Copy className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 font-mono text-xs text-left overflow-x-auto text-gray-800">
            <pre className="whitespace-pre-wrap leading-snug">
              <code>{renderCode(examples[currentIndex].code)}</code>
              {'\n'}

             
              <span className="text-gray-500 italic"># Instalar dependencias</span>{'\n'}
              pip install -r requirements.txt{'\n\n'}
              <span className="text-gray-500 italic"># Ejecutar entorno local</span>{'\n'}
              uvicorn main:app --host 0.0.0.0 --port 8000
            </pre>
          </div>
        </motion.div>
        <motion.div
  className="w-full md:w-[90%] bg-neutral-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8"
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2, duration: 0.6 }}
>
  <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-red-400 rounded-full"></span>
      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
      <span className="ml-3 text-xs text-gray-600 font-medium">bash</span>
    </div>
    <div className="flex gap-1">
      <button onClick={prevExample} className="p-1 rounded hover:bg-gray-200 transition">
        <ArrowLeft className="w-3 h-3 text-gray-600" />
      </button>
      <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition">
        <ArrowRight className="w-3 h-3 text-gray-600" />
      </button>
      <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
        <Copy className="w-3 h-3 text-gray-600" />
      </button>
    </div>
  </div>

  {/* Contenido del bloque de terminal */}
  <div className="p-4 font-mono text-xs text-gray-800 bg-gray-50">
    <pre className="whitespace-pre-wrap leading-relaxed">
{`# Crear entorno virtual
$ python -m venv bend

# Entrar al entorno
$ cd bend

# Entrar a la carpeta bin
$ cd bin

# Activar el entorno
$ source activate

# Regresar a la carpeta principal
$ cd ..
$ cd ..
$ cd ..
`}
    </pre>
  </div>
</motion.div>

       
      </motion.div>
    </section>
  );
}
