'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mensajes = [
  "Audita tus procesos y detecta los puntos críticos de tu negocio para adaptarlo a la era de la IA.",
  "Optimiza tus operaciones con automatización inteligente y ahorra tiempo valioso.",
  "Transforma la forma en que tu empresa maneja datos y toma decisiones estratégicas.",
  "Incrementa la productividad de tu equipo con flujos de trabajo automatizados.",
  "Detecta cuellos de botella y puntos de mejora en tiempo real.",
  "Integra soluciones de IA que se adaptan al crecimiento de tu empresa.",
  "Reduce errores humanos con procesos empresariales inteligentes.",
  "Convierte tus datos en información accionable para potenciar tu negocio."
];

export default function BannerAuditoria() {
  const [index, setIndex] = useState(0);

  // Cambiar mensaje cada vez que termina la animación
  useEffect(() => {
    const duration = 25000; // duración de la animación en ms (igual que en motion.div)
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, duration);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center overflow-hidden bg-white py-4">
      <div className="w-1/2 overflow-hidden">
        <motion.div
          key={index} // 🔹 clave para reiniciar la animación al cambiar mensaje
          className="inline-block whitespace-pre text-gray-800 text-[12px] italic font-medium"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ x: { repeat: 0, duration: 20, ease: 'linear' } }}
        >
          {mensajes[index]}
        </motion.div>
      </div>
    </div>
  );
}
