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
        {/* Texto explicativo sin animaciones */}
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          Nuestro framework ofrece un ecosistema completo de inteligencia artificial preinstalado y listo para usar. No necesitarás configurar entornos de ejecución, variables de entorno ni instalar librerías adicionales: todo ya viene preparado.<br /><br />

          <strong>El único lugar que debes modificar es la carpeta <code>user</code></strong>, donde podrás crear tus agentes, definir su personalidad, rol y modelo. Todo lo demás en la estructura del framework está protegido y listo para funcionar, evitando errores y simplificando tu flujo de desarrollo.<br /><br />

          Una vez personalizados tus agentes, el motor de IA procesará automáticamente tus cambios y estarán listos para integrarse a tus proyectos o plataformas. Descarga, personaliza y ejecuta: así de simple y eficiente.
        </p>
      </div>
    </section>
  );
}
