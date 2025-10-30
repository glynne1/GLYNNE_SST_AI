'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[35vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-4xl text-left">
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Para que el frontend pueda comunicarse con los agentes y modelos de inteligencia artificial, es necesario <strong>levantar el servidor local de FastAPI</strong>. 
          <br /><br />
          Este servidor actúa como el <strong>núcleo de integración</strong> entre la lógica del modelo y las interfaces del cliente: recibe las solicitudes desde el frontend, ejecuta la lógica del agente y devuelve las respuestas procesadas.
          <br /><br />
          Al ejecutar el comando:
          <pre className="bg-neutral-900 text-neutral-100 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
            <code>
              uvicorn main:app --host 0.0.0.0 --port 8000
            </code>
          </pre>
          estás iniciando el servicio que expone todos los <code>endpoints</code> definidos en <strong>main.py</strong>.
          <br /><br />
          <strong>El archivo <code>main.py</code></strong> es el punto de entrada del sistema. Desde allí se cargan las rutas, los controladores de los agentes, las variables de entorno (como tu <code>GROQ_API_KEY</code>), y se configura cómo FastAPI debe comportarse frente a cada solicitud.  
          <br /><br />
          En otras palabras, si el frontend es la interfaz visual, <code>main.py</code> es el <strong>puente lógico</strong> que conecta la inteligencia del backend con la experiencia de usuario en el navegador.  
          Sin este proceso activo, el frontend no tendría forma de consultar ni ejecutar las funciones de IA definidas en el ecosistema.
        </p>
      </div>
    </section>
  );
}
