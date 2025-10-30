'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[30vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal sin animaciones */}
      <div className="relative z-10 max-w-4xl text-left">
        {/* Texto explicativo actualizado */}
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Una vez que hayas personalizado tu agente dentro de la carpeta <code>user</code> —definiendo su rol, personalidad y modelo— podrás ejecutar el framework directamente desde la consola.<br /><br />

          Solo necesitas correr el siguiente comando:<br />
          <strong><code>python CLI.py</code></strong><br /><br />

          Esto iniciará una sesión interactiva en terminal donde podrás conversar directamente con tu agente antes de migrarlo o integrarlo a tu aplicación. 
          Esta ejecución te permite validar su comportamiento, probar respuestas, ajustar prompts y asegurar que su personalidad esté alineada con los objetivos de tu proyecto.<br /><br />

          GLYNNE Framework te ofrece una forma práctica y controlada de experimentar con tus agentes de IA, sin necesidad de desplegarlos todavía. Simplemente ejecuta, conversa y afina.

          Despues de probar, inicia tu servidor y migra tu agente
        </p>
      </div>
    </section>
  );
}
