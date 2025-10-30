'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TextImageSection() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 bg-white overflow-hidden">
      
      {/* Texto más pequeño */}
      <motion.div 
        className="flex-1 flex items-center justify-center text-center md:text-left p-4 order-1 md:order-1"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-xl space-y-4">
          <h2 className="text-black text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
            Conversa, crea y transforma con <span className="text-black">GLY-IA</span>
          </h2>

          <p className="text-black text-s md:text-base lg:text-lg leading-relaxed">
            Potenciamos tu empresa con la misma fuerza con la que la inteligencia artificial está transformando el mundo.  
            Con <strong>GLY</strong> podrás analizar tu negocio, conversar con él y crear ideas de forma natural gracias a nuestro sistema 
            <strong> STT (Speech-to-Text)</strong>, que convierte tu voz en acción y propone soluciones adaptadas a tu contexto.
          </p>
        </div>
      </motion.div>

      {/* Imagen más grande */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-4 order-2 md:order-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-[100%] md:w-[100%] lg:w-[100%]"> {/* 👈 Imagen más grande */}
          <Image
            src="/GTLYSTT.png"
            alt="Interfaz GLY-IA conversacional"
            width={1000}
            height={800}
            className="object-contain w-full h-auto select-none"
            unoptimized
          />
        </div>
      </motion.div>
    </section>
  );
}
