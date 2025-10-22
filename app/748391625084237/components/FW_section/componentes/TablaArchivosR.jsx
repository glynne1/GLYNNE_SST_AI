'use client';

import { motion } from 'framer-motion';
import { FileCode2, Settings, Terminal, FileText, FileCog, Database } from 'lucide-react';

export default function FrameworkFilesTable() {
  const files = [
    {
      icon: <Database className="w-5 h-5 text-sky-500" />,
      name: '📁 user/',
      type: 'Directorio',
      description: 'Contiene los agentes personalizados y configuraciones específicas del usuario.',
      usage: 'Personaliza comportamiento, rol y modelo de IA aquí.',
      notes: 'Es el núcleo editable del framework: donde defines identidad y propósito del agente.'
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-500" />,
      name: '📁 __pycache__/',
      type: 'Directorio (interno)',
      description: 'Archivos compilados automáticamente por Python para mejorar el rendimiento.',
      usage: 'No requiere modificación.',
      notes: 'Se genera de forma automática al ejecutar el framework.'
    },
    {
      icon: <FileCode2 className="w-5 h-5 text-indigo-500" />,
      name: 'panel.py',
      type: 'Módulo Python',
      description: 'Controla la visualización del panel de auditoría y el flujo de información con GLYNNE.',
      usage: 'Puedes ampliar la lógica visual o agregar endpoints personalizados.',
      notes: 'Ideal para adaptar la experiencia del usuario o conectar con dashboards externos.'
    },
    {
      icon: <FileCog className="w-5 h-5 text-emerald-500" />,
      name: '.env',
      type: 'Configuración',
      description: 'Archivo que contiene variables de entorno (API keys, rutas, puertos, etc).',
      usage: 'Edita este archivo para conectar tus servicios o definir entornos locales y productivos.',
      notes: 'No debe subirse a repositorios públicos.'
    },
    {
      icon: <FileText className="w-5 h-5 text-gray-600" />,
      name: '.gitignore',
      type: 'Configuración',
      description: 'Indica qué archivos o carpetas deben excluirse del control de versiones.',
      usage: 'Agrega rutas de logs, cachés o claves sensibles.',
      notes: 'Mantiene tu repositorio limpio y seguro.'
    },
    {
      icon: <Terminal className="w-5 h-5 text-orange-500" />,
      name: 'CLI.py',
      type: 'Script',
      description: 'Permite iniciar y probar el framework desde consola con una interfaz conversacional.',
      usage: 'Ejecuta `python CLI.py` para interactuar con tu agente localmente.',
      notes: 'Ideal para debugging y entrenamiento de agentes antes de desplegarlos.'
    },
    {
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      name: 'GLYNNE_Documentacion.pdf',
      type: 'Documento',
      description: 'Manual técnico con estructura, comandos, diagramas y guía de integración del framework.',
      usage: 'Consúltalo para entender el flujo interno y recomendaciones de arquitectura.',
      notes: 'Incluye ejemplos prácticos de conexión con LangChain y Supabase.'
    },
    {
      icon: <FileCode2 className="w-5 h-5 text-purple-500" />,
      name: 'main.py',
      type: 'Script Principal',
      description: 'Punto de entrada del servidor. Controla carga de modelos, agentes y rutas del sistema.',
      usage: 'Personalízalo para integrar nuevos endpoints o modificar la lógica global.',
      notes: 'Mantén su estructura base; es el corazón operativo del framework.'
    },
    {
      icon: <FileText className="w-5 h-5 text-gray-500" />,
      name: 'README.md',
      type: 'Documento Markdown',
      description: 'Archivo de presentación general del proyecto con pasos de instalación y uso.',
      usage: 'Actualízalo si modificas funcionalidades o añades módulos personalizados.',
      notes: 'Es la carta de presentación del framework.'
    },
    {
      icon: <FileCog className="w-5 h-5 text-teal-500" />,
      name: 'requirements.txt',
      type: 'Dependencias',
      description: 'Lista de librerías necesarias para ejecutar el entorno Python del framework.',
      usage: 'Instala con `pip install -r requirements.txt`.',
      notes: 'Actualízalo si integras nuevas librerías o modelos.'
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-16 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-gray-900 mb-10 text-center"
      >

      </motion.h2>

      {/* Contenedor scrollable */}
      <div className="w-full max-w-6xl h-[60vh] overflow-y-scroll border border-gray-300 rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse text-sm text-gray-800">
          <thead className="sticky top-0 bg-white text-gray-700 text-xs uppercase tracking-wider border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[5%]"></th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[20%]">Nombre</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[12%]">Tipo</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[30%]">Descripción</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[18%]">Uso</th>
              <th className="py-3 px-4 text-left w-[15%]">Notas</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-sky-50 transition-colors duration-200`}
              >
                <td className="py-3 px-4 text-center border-r border-gray-300">{file.icon}</td>
                <td className="py-3 px-4 font-semibold text-gray-900 border-r border-gray-300">{file.name}</td>
                <td className="py-3 px-4 text-gray-700 border-r border-gray-300">{file.type}</td>
                <td className="py-3 px-4 text-gray-700 border-r border-gray-300">{file.description}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{file.usage}</td>
                <td className="py-3 px-4 text-gray-500 italic">{file.notes}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-500 text-sm mt-8 text-center max-w-3xl"
      >
        Esta estructura garantiza modularidad, escalabilidad y trazabilidad total del sistema.<br />
        Cada módulo puede extenderse, reemplazarse o integrarse con APIs externas sin comprometer la base del framework.
      </motion.p>
    </section>
  );
}
