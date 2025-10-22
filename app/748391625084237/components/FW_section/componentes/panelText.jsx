'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[30vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-4xl text-left">
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Dentro del framework, toda la arquitectura de ejecución del agente se construye a partir de tres parámetros esenciales: 
          <strong> el modelo, la temperatura y el prompt</strong>. Solo modificando estos valores en la configuración del archivo <code>panel.py</code>, defines por completo cómo razona, responde y actúa tu agente dentro del ecosistema GLYNNE.<br /><br />

          El framework ya contiene toda la infraestructura necesaria —gestión de memoria, lógica conversacional, procesamiento de contexto y exposición vía API—, por lo que no necesitas alterar nada más para obtener un agente funcional y estable.<br /><br />

          Si deseas crear otro agente con un rol o comportamiento diferente, basta con duplicar el archivo actual, ajustar su configuración interna y registrar su conexión dentro del <code>main.py</code>. 
          El proceso completo se explica con más detalle en la siguiente sección, donde verás cómo escalar tus agentes de forma modular y ordenada.
        </p>
      </div>
    </section>
  );
}
