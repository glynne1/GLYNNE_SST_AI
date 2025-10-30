'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-full min-h-[70vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal sin animación */}
      <div className="relative z-10 max-w-4xl text-left">
        {/* Texto explicativo */}
        <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8">
          <strong>Descarga GLYNNE Framework y comienza a desarrollar agentes conversacionales de IA de manera inmediata.</strong><br /><br />
          Nuestro framework proporciona un ecosistema completo de inteligencia artificial listo para usar. 
          Desde la plataforma oficial, no necesitarás instalar entornos de ejecución, configurar variables de entorno 
          ni gestionar librerías: todo viene preinstalado y preparado.<br /><br />
          Una vez configurado, el motor de IA procesará automáticamente tus ajustes y tu agente estará listo para ser 
          consumido en tus proyectos o plataformas. Descarga, personaliza y haz el <strong>fetch</strong>: así de simple.
        </p>

        {/* Botón de descarga con animación al hover */}
        <motion.a
          href="/GLYNNE_FW.zip"
          download
          className="relative px-12 py-3 text-sm md:text-base font-semibold 
                     bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
                     text-white shadow-xl overflow-hidden rounded-xl group transition-all duration-300 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Reflejo dinámico */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10 font-medium">
            Descargar GLYNNE Framework - versión para MacOS
          </span>
        </motion.a>

        {/* Nota final sin animación */}
        <p className="text-gray-400 text-xs md:text-sm mt-4">
          abre con click derecho / open
        </p>
      </div>
    </section>
  );
}
