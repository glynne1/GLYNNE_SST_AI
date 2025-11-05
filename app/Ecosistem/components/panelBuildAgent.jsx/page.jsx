"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import AgentConfigPanel from "./componets/logicPanel";
import Console from "./componets/consola";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="w-screen h-screen bg-white flex p-0 m-0 overflow-hidden">
      {/* 🔹 Consola lateral (IZQUIERDA - 17%) */}
      <div className="w-[17%] h-full border-r border-gray-200">
        <Console />
      </div>

      {/* 🔹 Panel principal (DERECHA - 83%) */}
      <div className="w-[83%] h-full overflow-y-auto flex flex-col items-center justify-center relative">
        {/* Sección de texto centrada */}
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
  GLYNNE <span className="text-gray-500">PANEL AI</span>
</motion.h2>

{/* Texto descriptivo */}
<motion.p
  className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed mb-8"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
>
  GLYNNE Panel AI es el entorno donde los desarrolladores diseñan, configuran y prueban sus modelos inteligentes antes de integrarlos
  al <strong>motor de procesamiento LLM</strong>. Aquí puedes modificar la estructura, personalidad y comportamiento de cada agente,
  asignar roles específicos y definir parámetros técnicos avanzados. Es el punto de enlace entre la creatividad humana y la autonomía
  generativa, optimizado para que cada ajuste se traduzca en rendimiento, coherencia y precisión dentro del ecosistema GLYNNE.
</motion.p>


          {/* Botón que abre el popup */}
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
            Iniciar entorno de desarrollo GLYNNE dev AI
            </span>
          </motion.button>

          {/* Nota final */}
          <motion.p
            className="text-gray-400 text-xs md:text-sm mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            tu agente al instante
          </motion.p>
        </motion.div>

        {/* Leyenda inferior */}
        <div className="w-full text-center absolute bottom-4 text-gray-500 text-xs tracking-wide">
          © GLYNNE 2025 - Innovación impulsada por inteligencia artificial
        </div>
      </div>

      {/* 🔹 Popup con AgentConfigPanel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="agent-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center overflow-y-auto z-50"
          >
            {/* Contenedor del contenido */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[90%] h-[100vh] rounded-2xl p-8"
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl transition-all"
              >
                <FaTimes />
              </button>

              {/* Descripción del panel */}
              <motion.div
                className="max-w-3xl text-center mx-auto mb-10 mt-[40px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-neutral-800 text-3xl md:text-4xl font-extrabold mb-2 tracking-widest">
                  PANEL DE <span className="text-gray-500">DESARROLLO IA</span>
                </h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-2xl">
                  Configura y prueba tus <strong>modelos de inteligencia artificial</strong> antes del despliegue.  
                  Define <strong>roles, personalidades</strong> y <strong>llaves de acceso</strong> para cada agente del ecosistema GLYNNE.
                </p>
              </motion.div>

              {/* Contenedor del componente */}
              <div className="mt-[20px]">
                <AgentConfigPanel />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
