"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import WhatsappRedirect from "./WhatsappRedirect";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="w-screen h-[80vh] bg-white flex p-0 m-0 overflow-hidden">
      {/* Panel principal */}
      <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-center relative">
        <motion.div
          className="relative z-10 max-w-4xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Título */}
          <motion.h2
            className="text-neutral-800 text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            NUESTROS <span className="text-gray-500">CANALES</span>
          </motion.h2>

          {/* Texto */}
          <motion.p
            className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            En esta sección encontrarás todos los canales oficiales de comunicación e información del ecosistema GLYNNE.
            Desde redes sociales hasta plataformas de contenido y documentación, aquí tienes acceso directo a nuestras 
            novedades, anuncios, tutoriales y actualizaciones de la plataforma.  
            Es el punto central para mantenerte conectado con nuestra visión, nuestro avance tecnológico y todo lo nuevo 
            que estamos construyendo para impulsar la autonomía empresarial con inteligencia artificial.
          </motion.p>

          {/* Botón que abre modal */}
          <motion.button
            onClick={() => setOpen(true)}
            className="relative px-12 py-3 text-sm md:text-base font-semibold 
              bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
              text-white shadow-xl overflow-hidden rounded-xl group transition-all duration-300 inline-block cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 font-medium">
              CONTACTANOS
            </span>
          </motion.button>

          {/* Nota */}
          <motion.p
            className="text-gray-400 text-xs md:text-sm mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
             ¡¡¡Conversa con uno de nuestros talentos HUMANOS!!!
          </motion.p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-3xl"
            >
              {/* Cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
              >
                <FaTimes size={20} />
              </button>

              {/* Título dentro del modal */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-gray-800 text-xs md:text-xs font-semibold mb-6 text-center leading-relaxed"
              >
                Aquí tendrás acceso directo a nuestro talento humano para asesorarte sobre el funcionamiento de la herramienta
                o integrar nuevos procesos en tu empresa.
              </motion.h3>

              {/* Componente importado */}
              <div className="w-full mb-8">
                <WhatsappRedirect />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
