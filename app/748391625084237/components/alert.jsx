'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertRotator() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const messages = [
    ' En GLYNNE transformamos procesos empresariales en sistemas inteligentes que se adaptan, aprenden y escalan contigo.',
    'La automatización con IA no solo ahorra tiempo, sino que te da ventaja competitiva. GLYNNE lo convierte en tu nueva norma operativa.',
    ' Cada proceso que automatizas libera tiempo humano para pensar, no para repetir. GLYNNE crea esos sistemas por ti.',
    'Tu empresa puede ser más rápida, más precisa y más rentable. Solo necesita la arquitectura correcta. Ahí entra GLYNNE.',
    ' GLYNNE integra IA y software modular para que tus equipos operen con eficiencia casi autónoma.',
    ' No hacemos bots. Construimos inteligencias que entienden tus flujos y los optimizan cada día.',
    ' La automatización no reemplaza personas. Potencia su impacto. GLYNNE diseña esa sinergia perfecta.',
    ' Tus datos ya tienen las respuestas. GLYNNE crea la infraestructura para que tu empresa las escuche.',
    ' Cada departamento puede ser un nodo inteligente dentro de tu ecosistema. GLYNNE diseña esa ciudad digital.',
    ' Desde la arquitectura hasta la orquestación: GLYNNE crea sistemas que piensan como tu negocio.',
    ' GLYNNE no vende software. Crea inteligencia estructurada para que tu empresa evolucione sola.',
    '⚡ Automatizar es el primer paso. Construir autonomía digital con GLYNNE es el siguiente nivel.'
  ];

  useEffect(() => {
    const showRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setVisible(true);
      setTimeout(() => setVisible(false), 10000); // Visible por 8s
    };

    showRandomMessage();
    const interval = setInterval(showRandomMessage, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: [
                '0 0 0px rgba(255,255,255,0)',
                '0 0 12px rgba(255,255,255,0.6)',
                '0 0 4px rgba(255,255,255,0.3)',
                '0 0 0px rgba(255,255,255,0)'
              ],
            }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.8,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'mirror',
              },
            }}
            className="bg-white text-black rounded-xl shadow-xl p-4 max-w-sm border border-gray-200 backdrop-blur-sm"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.2))',
            }}
          >
            <p className="text-sm leading-relaxed font-medium tracking-wide">
              {currentMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
