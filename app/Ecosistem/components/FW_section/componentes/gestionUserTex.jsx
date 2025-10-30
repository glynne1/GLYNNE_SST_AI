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
        <p className="text-gray-700 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          La carpeta <code className="font-semibold text-neutral-800">user/</code> es el núcleo de personalización dentro del
          <strong> GLYNNE Framework</strong>. Aquí es donde cada desarrollador define la identidad, propósito y
          comportamiento de su agente inteligente.<br /><br />

       
          Gracias a esta arquitectura modular, puedes crear múltiples archivos dentro de la carpeta
          <code className="font-semibold text-neutral-800"> user/</code>, cada uno representando un agente distinto,
          compartiendo el mismo motor GLYNNE pero con identidades totalmente diferentes. 
          Esto permite escalar un ecosistema de agentes especializados bajo una sola base de código.<br /><br />

          Una vez configurado tu agente en <code>user/panel.py</code>, ejecuta el framework desde consola con:<br />
          <strong><code>python CLI.py</code></strong><br /><br />

          Este comando iniciará una <strong>sesión interactiva</strong> que te permitirá conversar directamente con tu agente
          antes de integrarlo a una aplicación o entorno de producción. 
          Así podrás probar su comportamiento, validar su coherencia y refinar su perfil conversacional con total control.<br /><br />
        </p>
      </div>
    </section>
  );
}
