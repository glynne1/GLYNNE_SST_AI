"use client";
import { motion } from "framer-motion";

export default function SocialShowcase() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-24 py-20">
      
      {/* Instagram — texto izquierda / imagen derecha */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold">Síguenos en Instagram</h2>
          <p className="text-lg text-gray-600">
            Puedes encontrarnos en Instagram para ver noticias, avances de la
            plataforma y contenido exclusivo sobre nuestras tecnologías.
          </p>
          <a
            href="https://www.instagram.com/glynneai/"
            target="_blank"
            className="underline underline-offset-2 text-gray-800 hover:text-black"
          >
            @glynneai
          </a>
        </div>

        <img
          src="/mocup/instagram.png"
          alt="Instagram"
          className="rounded-xl w-[70%] mx-auto"
        />
      </motion.section>

      {/* YouTube — imagen izquierda / texto derecha */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <img
          src="/mocup/youtube.png"
          alt="YouTube"
          className="rounded-xl w-[70%] mx-auto order-1 md:order-none"
        />

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold">Contenido en YouTube</h2>
          <p className="text-lg text-gray-600">
            En nuestro canal encontrarás tutoriales completos, explicaciones
            técnicas y demostraciones reales del uso de la plataforma.
          </p>
          <a
            href="https://www.youtube.com/@AXGLYNNE"
            target="_blank"
            className="underline underline-offset-2 text-gray-800 hover:text-black"
          >
            AX GLYNNE – Canal Oficial
          </a>
        </div>
      </motion.section>

      {/* LinkedIn — texto izquierda / imagen derecha */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold">Síguenos en LinkedIn</h2>
          <p className="text-lg text-gray-600">
            Conéctate con nosotros para conocer noticias corporativas, alianzas,
            crecimiento de la empresa y contenido profesional.
          </p>
          <a
            href="https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
            target="_blank"
            className="underline underline-offset-2 text-gray-800 hover:text-black"
          >
            Perfil Corporativo
          </a>
        </div>

        <img
          src="/mocup/linkedin.png"
          alt="LinkedIn"
          className="rounded-xl w-[70%] mx-auto"
        />
      </motion.section>

      {/* GLYNNE — imagen izquierda / texto derecha */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <img
          src="/mocup/glynne.png"
          alt="GLYNNE Platform"
          className="rounded-xl w-[70%] mx-auto order-1 md:order-none"
        />

        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold">Conoce GLYNNE</h2>
          <p className="text-lg text-gray-600">
            Explora toda la información de la plataforma, actualizaciones,
            documentación y nuestras soluciones de automatización empresarial.
          </p>
          <a
            href="https://glynneai.com/"
            target="_blank"
            className="underline underline-offset-2 text-gray-800 hover:text-black"
          >
            glynneai.com
          </a>
        </div>
      </motion.section>
    </div>
  );
}
