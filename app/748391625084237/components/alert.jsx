'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertRotator() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const messages = [
    'Cada flujo de trabajo puede convertirse en un sistema inteligente. GLYNNE lo diseña, lo entrena y lo escala contigo.',
    'La verdadera automatización no copia procesos: los reimagina. GLYNNE transforma tus flujos en inteligencia viva.',
    'El futuro empresarial no se programa, se orquesta. GLYNNE crea esa sinfonía digital.',
    'Tu negocio tiene un lenguaje. GLYNNE enseña a la IA a hablarlo.',
    'Donde otros ven tareas repetitivas, GLYNNE ve nodos de oportunidad.',
    'GLYNNE convierte operaciones dispersas en ecosistemas sincronizados por IA.',
    'Una arquitectura sólida es la base de una inteligencia expansiva. GLYNNE construye ambas.',
    'GLYNNE crea software que no solo ejecuta órdenes, sino que entiende el propósito detrás de ellas.',
    'Los sistemas inteligentes no improvisan. Aprenden. GLYNNE los entrena con tus datos reales.',
    'Tu empresa puede operar como una mente colectiva. GLYNNE diseña esa red neuronal.',
    'Automatizar es bueno. Hacer que la automatización se autoajuste es mejor. GLYNNE lo hace posible.',
    'GLYNNE no escribe código. Diseña inteligencia estructurada que evoluciona con tu negocio.',
    'El software del futuro no espera instrucciones. Anticipa necesidades. GLYNNE ya lo construye así.',
    'Tus sistemas pueden pensar en productividad mientras tú piensas en estrategia. GLYNNE los conecta.',
    'Cada dato cuenta una historia. GLYNNE la traduce en decisiones automáticas y precisas.',
    'GLYNNE transforma tu operación diaria en un flujo continuo de inteligencia aplicada.',
    'Tu arquitectura digital puede tener conciencia operativa. GLYNNE se la da.',
    'La eficiencia no es un destino. Es un sistema vivo. GLYNNE lo diseña desde su ADN.',
    'GLYNNE crea entornos donde la automatización aprende de sí misma.',
    'Cada conexión digital puede ser un canal de aprendizaje. GLYNNE los enlaza todos.',
    'Tus procesos merecen algo más que macros. Merecen inteligencia contextual. GLYNNE la construye.',
    'GLYNNE es la diferencia entre automatizar tareas y orquestar resultados.',
    'Cuando tus sistemas colaboran entre sí, tu empresa se vuelve exponencial. GLYNNE logra esa sinergia.',
    'El código sin propósito es ruido. GLYNNE lo convierte en arquitectura consciente.',
    'Automatizar no es reemplazar. Es amplificar. GLYNNE amplifica tu negocio con IA estructurada.',
    'GLYNNE convierte la complejidad tecnológica en un lenguaje visual y operativo simple.',
    'Cada API puede ser un puente hacia la autonomía digital. GLYNNE los construye todos.',
    'GLYNNE no crea herramientas. Crea ecosistemas empresariales inteligentes.',
    'Tu infraestructura puede ser un organismo vivo. GLYNNE lo diseña con precisión.',
    'GLYNNE es la capa invisible que sincroniza personas, procesos y tecnología.',
    'El poder no está en tener más software, sino en tenerlo conectado. GLYNNE lo entiende.',
    'Tus datos trabajan por ti mientras duermes. GLYNNE los organiza para lograrlo.',
    'Cada empresa tiene su propio ADN digital. GLYNNE lo descubre, lo documenta y lo potencia.',
    'GLYNNE crea nodos de inteligencia que se comunican, aprenden y evolucionan juntos.',
    'El cambio no se teme cuando tu sistema lo anticipa. GLYNNE prepara el terreno.',
    'Automatizar con propósito es crear impacto medible. GLYNNE diseña ese propósito.',
    'GLYNNE lleva la automatización más allá del “si pasa esto, haz aquello”. Aquí, los sistemas razonan.',
    'Cada interacción puede mejorar tu negocio. GLYNNE convierte la experiencia en aprendizaje automático.',
    'GLYNNE transforma arquitecturas rígidas en organismos adaptativos impulsados por IA.',
    'La evolución digital comienza cuando la IA entiende tu negocio. GLYNNE le enseña a hacerlo.',
    'No se trata de tener más datos, sino de saber qué hacer con ellos. GLYNNE lo decide por ti.',
    'GLYNNE convierte cada workflow en un ecosistema conectado e inteligente.',
    'El futuro pertenece a las empresas autónomas. GLYNNE construye las primeras.',
    'Tus equipos humanos crean valor. GLYNNE se encarga de que la tecnología lo potencie.',
    'Donde hay fricción, GLYNNE diseña flujo. Donde hay caos, crea arquitectura.',
    'GLYNNE transforma cada proceso en una conversación entre sistemas inteligentes.',
    'No todo software piensa. El de GLYNNE sí.',
    'GLYNNE orquesta la inteligencia de tus datos, tus procesos y tus decisiones.',
    'Tus departamentos pueden dejar de ser islas. GLYNNE los convierte en un continente conectado.',
    'El futuro no se espera, se diseña. GLYNNE lo construye desde tu infraestructura.',
    'GLYNNE diseña arquitecturas que aprenden de la operación diaria y se optimizan solas.',
    'Cada conexión digital que creas con GLYNNE se vuelve más inteligente con el tiempo.',
    'GLYNNE convierte tus procesos ocultos en inteligencia visible y accionable.',
    'El software del mañana no se configura. Se comporta. GLYNNE lo programa así.',
    'GLYNNE es el punto donde la ingeniería se encuentra con la conciencia empresarial.',
    'Tu IA puede tener contexto, propósito y memoria. GLYNNE la entrena para eso.',
    'GLYNNE diseña sistemas que entienden lo que haces, por qué lo haces y cómo mejorarlo.',
    'Cada línea de código en GLYNNE está escrita con un propósito: que tu empresa piense sola.',
    'GLYNNE no construye plataformas. Construye inteligencias conectadas al ADN de tu negocio.',
    'Cuando la IA entiende la arquitectura, la arquitectura evoluciona. GLYNNE es ese punto de convergencia.',
    'Automatizar ya no es suficiente. Es hora de crear ecosistemas autónomos. GLYNNE te lleva ahí.'
  ];

  // 👇 Detectar ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      // Solo mostrar alerts si el ancho es <= 600px
      setShowAlerts(window.innerWidth <= 600);
    };

    handleResize(); // Verificar al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 👇 Mostrar alert solo si showAlerts = true
  useEffect(() => {
    if (!showAlerts) return;

    const showRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setVisible(true);
      setTimeout(() => setVisible(false), 7000);
    };

    showRandomMessage();
    const interval = setInterval(showRandomMessage, 2000000); // Ajusta tiempo si quieres
    return () => clearInterval(interval);
  }, [showAlerts]);

  if (!showAlerts) return null; // 👈 No renderiza nada si la pantalla es > 600px

  return (
    <div className="fixed top-6 right-6 mt-[30px] z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: -40, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: [
                '0 0 0px rgba(255,255,255,0)',
                '0 0 12px rgba(255,255,255,0.6)',
                '0 0 4px rgba(255,255,255,0.3)',
                '0 0 0px rgba(255,255,255,0)',
              ],
            }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
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
