'use client';

import { motion } from 'framer-motion';
import { Brain, Thermometer, Type, FileCode2, Code, Zap } from 'lucide-react';

export default function AgentConfigTable() {
  const configs = [
    {
      icon: <Brain className="w-5 h-5 text-blue-500" />,
      name: '"model"',
      type: 'Cadena de texto',
      description:
        'Define el modelo de lenguaje que el agente utilizará. Cada modelo tiene diferente nivel de precisión, creatividad y costo computacional.',
      usage:
        'Modifica el valor con el nombre del modelo que desees usar, por ejemplo: "llama-3.3-70b-versatile" o "mixtral-8x7b".',
      notes:
        'El modelo determina el comportamiento base del agente. Cambiarlo puede alterar la velocidad, profundidad y coherencia de sus respuestas.'
    },
    {
      icon: <Thermometer className="w-5 h-5 text-rose-500" />,
      name: '"temperature"',
      type: 'Número (0.0 a 1.0)',
      description:
        'Controla la creatividad y aleatoriedad de las respuestas generadas. A menor valor, el agente es más literal y técnico; a mayor, más libre e imaginativo.',
      usage:
        'Ajusta el valor según el propósito del agente: 0.0 para precisión técnica, 0.5 para balance, 0.9 para exploración creativa.',
      notes:
        'Ideal para diferenciar entre agentes analíticos y agentes de brainstorming o contenido narrativo.'
    },
    {
      icon: <Type className="w-5 h-5 text-emerald-500" />,
      name: '"rol"',
      type: 'Cadena de texto',
      description:
        'Define la identidad funcional del agente. Este rol se inyecta dentro del prompt y modifica la perspectiva desde la que responde.',
      usage:
        'Escribe un título descriptivo, por ejemplo: "Consultor en Integración de IA", "Auditor Técnico", "Analista de Procesos Empresariales".',
      notes:
        'El rol permite adaptar el mismo modelo a distintos contextos sin necesidad de cambiar su arquitectura.'
    },
    {
      icon: <FileCode2 className="w-5 h-5 text-indigo-500" />,
      name: '"prompt"',
      type: 'Bloque de texto multilínea',
      description:
        'Es el cerebro narrativo del agente: define su contexto, tono, propósito y flujo de razonamiento. Contiene secciones de [META], [HISTORIAL], [ENTRADA] y [RESPUESTA].',
      usage:
        'Edita el contenido dentro del string triple (""") manteniendo las variables {rol}, {historial} y {mensaje}. No elimines las etiquetas entre corchetes.',
      notes:
        'Pequeños cambios en el prompt pueden transformar radicalmente la personalidad y la precisión del agente.'
    },
    {
      icon: <Code className="w-5 h-5 text-teal-500" />,
      name: 'Duplicación del Agente',
      type: 'Archivo Python',
      description:
        'Puedes crear múltiples agentes copiando el archivo `panel.py` y personalizando cada uno con su propia configuración interna.',
      usage:
        'Ejemplo: `panel_marketing.py`, `panel_comercial.py`, `panel_operaciones.py`. Luego enlázalos en `main.py` para exponerlos como endpoints separados.',
      notes:
        'Cada archivo dentro de /user representa un agente independiente dentro del ecosistema GLYNNE.'
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      name: 'Conexión con main.py',
      type: 'Integración',
      description:
        'El archivo `main.py` importa y registra los agentes definidos dentro de /user. Es el punto de enlace con FastAPI y la red de orquestación del framework.',
      usage:
        'Abre `main.py` y agrega una línea como: `from user.panel_marketing import app as marketing_app` para activar tu nuevo agente.',
      notes:
        'La conexión es automática si respetas la estructura base del framework. No modifiques el núcleo en /core.'
    }
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-16 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center"
      >
      Configuración Personalizada del Agente
      </motion.h2>

      {/* Contenedor scrollable */}
      <div className="w-full max-w-6xl h-[60vh] overflow-y-scroll border border-gray-300 rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse text-sm text-gray-800">
          <thead className="sticky top-0 bg-white text-gray-700 text-xs uppercase tracking-wider border-b border-gray-300">
            <tr>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[5%]"></th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[18%]">Parámetro</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[12%]">Tipo</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[30%]">Descripción</th>
              <th className="py-3 px-4 text-left border-r border-gray-300 w-[20%]">Cómo Editarlo</th>
              <th className="py-3 px-4 text-left w-[15%]">Notas</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="py-3 px-4 text-center border-r border-gray-300">{config.icon}</td>
                <td className="py-3 px-4 font-semibold text-gray-900 border-r border-gray-300">{config.name}</td>
                <td className="py-3 px-4 text-gray-700 border-r border-gray-300">{config.type}</td>
                <td className="py-3 px-4 text-gray-700 border-r border-gray-300">{config.description}</td>
                <td className="py-3 px-4 text-gray-600 border-r border-gray-300">{config.usage}</td>
                <td className="py-3 px-4 text-gray-500 italic">{config.notes}</td>
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
        Solo necesitas editar estos valores para transformar completamente el comportamiento del agente. 
        El framework se encarga del resto: ejecución, memoria, API y orquestación del modelo.
      </motion.p>
    </section>
  );
}
