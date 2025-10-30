'use client';

import { motion } from 'framer-motion';

export default function TextSection() {
  return (
    <section
      className="w-[100%] min-h-[75vh] flex items-center justify-center px-6 md:px-16 bg-white bg-center bg-no-repeat relative"
    >
      {/* Fondo blanco */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Contenedor principal */}
      <motion.div
        className="relative z-10 max-w-4xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* Título */}
        <motion.h2
          className="text-neutral-800 text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          GLYNNE <span className="text-gray-500">FRAMEWORK</span>
        </motion.h2>

        {/* Texto explicativo */}
        <motion.p
          className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
       GLYNNE Framework redefine cómo los desarrolladores integran inteligencia artificial en sus proyectos. Descarga, personaliza y ejecuta: así de simple. Solo ajusta la personalidad, el rol y el modelo de tu agente, inicia el servidor y obtendrás un ecosistema completo listo para procesar consultas, responder contextos y conectarse a cualquier aplicación. Sin configuraciones complejas, sin dependencias externas: un entorno de ejecución optimizado para desplegar IA funcional desde el primer comando. </motion.p>

        {/* Botón de descarga */}
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

        {/* Nota final */}
        <motion.p
          className="text-gray-400 text-xs md:text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          abre con click derecho / open
        </motion.p>
      </motion.div>
    </section>
  );
}
