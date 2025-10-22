'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[100vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-4xl text-left">
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Una vez que tu servidor de <strong>FastAPI</strong> esté en ejecución, la forma más rápida y limpia de conectar el frontend con nuestra arquitectura es utilizando un proyecto basado en <strong>Next.js</strong>.  
          <br /><br />
          Next.js ofrece un entorno moderno, optimizado y altamente compatible con los flujos de integración que maneja nuestro ecosistema. Desde ahí, podrás consumir los endpoints de <code>FastAPI</code>, crear interfaces conversacionales, dashboards de IA o paneles de control en tiempo real.
          <br /><br />
          Para comenzar, asegúrate de tener instalado <strong>Node.js</strong> (versión 18 o superior). Luego, ejecuta los siguientes comandos en la raíz de tu proyecto:
          <pre className="bg-neutral-900 text-neutral-100 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
            <code>
              # 🧩 Instalar Next.js de forma global
              npm install -g create-next-app
              
              # 🚀 Crear un nuevo proyecto Next.js
              npx create-next-app@latest my-frontend
              
              # 📂 Entrar a la carpeta del proyecto
              cd my-frontend
              
              # ▶️ Iniciar el servidor de desarrollo
              npm run dev
            </code>
          </pre>
          Una vez ejecutado, tu frontend se montará en:  
          <code className="text-blue-600">http://localhost:3000</code>
          <br /><br />
          Desde este entorno, podrás conectar fácilmente tus componentes a la API de FastAPI corriendo en <code>http://localhost:8000</code>, estableciendo una comunicación directa y segura entre el cliente y el backend inteligente.
          <br /><br />
          En resumen, <strong>Next.js</strong> actúa como la capa visual y de experiencia de usuario, mientras que <strong>FastAPI</strong> es el motor lógico que procesa la inteligencia detrás de cada interacción.  
          Con esta combinación, obtienes un flujo completo, modular y escalable que une lo mejor del desarrollo moderno: rendimiento en el cliente e inteligencia en el servidor.
        </p>
      </div>
    </section>
  );
}
