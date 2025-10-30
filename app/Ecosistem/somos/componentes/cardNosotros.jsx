'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserTie, FaBullseye, FaEye, FaStar, FaBalanceScale, FaHistory,
  FaFlagCheckered, FaBuilding, FaLaptopCode, FaBrain, FaFlask, FaGlobe
} from 'react-icons/fa';
const services = [
  {
    icon: <FaUserTie size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Quiénes Somos',
    description: 'GLYNNE TECH S.A.S: Inteligencia, automatización y propósito empresarial.',
    detail: `GLYNNE TECH S.A.S es una compañía de base tecnológica especializada en la creación de soluciones empresariales inteligentes. 
Nos dedicamos a diseñar, desarrollar e implementar arquitecturas de software que permiten a las organizaciones evolucionar hacia modelos de gestión autónomos, precisos y eficientes.

Somos un equipo de mentes creativas, técnicas y estratégicas con una misión clara: transformar la forma en que las empresas operan, utilizando la inteligencia artificial no como un accesorio, sino como el corazón de su infraestructura digital. 

En GLYNNE no seguimos tendencias; las construimos. Creemos en una tecnología que piensa, aprende y se adapta a los objetivos de cada negocio. Nuestro enfoque combina auditoría empresarial, análisis predictivo y automatización para crear ecosistemas digitales que realmente generan valor, eliminan fricciones operativas y aumentan la competitividad global.`
  },
  {
    icon: <FaBullseye size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nuestra Misión',
    description: 'Impulsar la transformación digital mediante inteligencia aplicada.',
    detail: `Nuestra misión es ayudar a las empresas a operar con mayor eficiencia, reduciendo la carga manual y potenciando la autonomía tecnológica. 
Buscamos integrar la automatización inteligente en cada departamento —Ventas, Recursos Humanos, Finanzas, Soporte y Operaciones— para que las organizaciones puedan tomar decisiones basadas en datos y no en suposiciones.

GLYNNE TECH promueve un modelo donde la inteligencia artificial no reemplaza al talento humano, sino que lo amplifica. 
Nuestro propósito es que cada compañía con la que trabajamos logre independencia tecnológica, control operativo y visión estratégica a largo plazo, utilizando herramientas que auditan, diagnostican y optimizan su propio funcionamiento.`
  },
  {
    icon: <FaEye size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nuestra Visión',
    description: 'Liderar la nueva generación de empresas inteligentes y autónomas.',
    detail: `Nuestra visión es construir un futuro donde las empresas funcionen como organismos vivos: cada proceso, flujo y sistema trabajando en armonía bajo la dirección de una inteligencia orquestada. 
GLYNNE TECH busca posicionarse como referente global en la integración de inteligencia artificial aplicada a la operación corporativa, creando soluciones que piensan, actúan y evolucionan junto a las necesidades del mercado.

Soñamos con compañías donde la eficiencia no sea una meta, sino el punto de partida. 
Nuestra visión se basa en la idea de una arquitectura viva, donde los agentes de IA se comportan como asesores, analistas y operadores digitales dentro de un ecosistema empresarial completamente automatizado.`
  },
  {
    icon: <FaStar size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Qué Nos Hace Diferentes',
    description: 'Auditoría inteligente, personalización total y evolución continua.',
    detail: `GLYNNE TECH no vende software genérico. Creamos sistemas diseñados específicamente para la realidad de cada empresa. 
Nuestro modelo de automatización se basa en la auditoría profunda de los procesos internos: entendemos cómo funciona tu negocio, identificamos los puntos críticos y proponemos soluciones que generan impacto real.

A diferencia de los desarrollos tradicionales, nuestros sistemas de IA analizan, interpretan y recomiendan. 
Cada interacción, cada conversación y cada dato recolectado se convierten en conocimiento estructurado, impulsando mejoras automáticas en productividad y precisión operativa.

Nos distingue nuestra capacidad de combinar análisis estratégico con automatización funcional, entregando resultados tangibles en ahorro de tiempo, reducción de costos y aumento del rendimiento empresarial.`
  },
  {
    icon: <FaBalanceScale size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nuestros Valores',
    description: 'Tecnología con propósito, innovación con sentido y resultados medibles.',
    detail: `• **Innovación consciente:** Creemos en una innovación que resuelve, no que complica.  
• **Escalabilidad real:** Cada solución está diseñada para crecer junto con el negocio.  
• **Autonomía inteligente:** Buscamos que cada empresa logre independencia operativa con el apoyo de la IA.  
• **Transparencia y ética:** La inteligencia artificial debe ser confiable, verificable y responsable.  
• **Impacto tangible:** Medimos nuestro éxito por los resultados reales de nuestros clientes.  
• **Colaboración genuina:** No somos un proveedor más, somos un aliado estratégico en la evolución de tu empresa.`
  },
  {
    icon: <FaHistory size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nuestra Historia',
    description: 'De una idea ambiciosa a un ecosistema de automatización inteligente.',
    detail: `GLYNNE TECH nació con la visión de construir algo más que software: una compañía capaz de revolucionar la manera en que las empresas piensan y operan. 
Lo que empezó como un proyecto de desarrollo de sistemas inteligentes se transformó en una organización dedicada a la creación de ecosistemas empresariales completamente automatizados.

Consolidamos un modelo único que combina conversación natural, diagnóstico automatizado y análisis de datos. 
Hoy, nuestras soluciones están orientadas a detectar oportunidades, anticipar necesidades y proponer mejoras continuas. 
Nuestra historia es la evolución constante de una idea que busca un único resultado: autonomía empresarial impulsada por inteligencia artificial.`
  },
  {
    icon: <FaFlagCheckered size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Nuestro Impacto',
    description: 'Automatización con propósito, transformación con evidencia.',
    detail: `El impacto de GLYNNE TECH se mide en la eficiencia que generamos. 
Cada empresa que pasa por nuestra auditoría obtiene una visión clara de sus puntos críticos, junto con un documento oficial que certifica el diagnóstico y las oportunidades de automatización detectadas.

Ayudamos a compañías a reducir su carga operativa, aumentar su capacidad de respuesta y potenciar la toma de decisiones. 
En un mundo saturado de herramientas, nosotros entregamos inteligencia. 
GLYNNE TECH no persigue ideas pequeñas. Perseguimos impacto.`
  },
  {
    icon: <FaBuilding size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Naturaleza Legal',
    description: 'GLYNNE TECH S.A.S, regida por la Ley 1258 de 2008.',
    detail: `GLYNNE TECH S.A.S es una sociedad por acciones simplificada, constituida bajo las leyes colombianas y debidamente registrada ante cámara de comercio. 
Opera conforme a los principios de responsabilidad, legalidad y transparencia empresarial.

Cada proyecto, documento o auditoría que emitimos se encuentra respaldado por nuestra firma corporativa, NIT y registro oficial. 
Nuestro marco legal garantiza la seguridad jurídica y la confianza que las empresas necesitan para implementar procesos de transformación digital con respaldo institucional.`
  },
  {
    icon: <FaLaptopCode size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Objeto Social',
    description: 'Soluciones empresariales basadas en inteligencia y automatización.',
    detail: `Nuestro objeto social consiste en diseñar, desarrollar e implementar soluciones tecnológicas avanzadas orientadas a la automatización de procesos empresariales mediante inteligencia artificial. 
Nos especializamos en auditorías digitales, diagnóstico organizacional y optimización operativa, ayudando a empresas a reducir costos y aumentar su rentabilidad.

GLYNNE TECH impulsa la transformación digital de compañías que buscan eficiencia, escalabilidad y autonomía tecnológica, integrando análisis, asesoría y acompañamiento estratégico dentro de un mismo ecosistema digital.`
  },
  {
    icon: <FaBrain size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Especialización en Inteligencia Artificial',
    description: 'Inteligencia que entiende, analiza y actúa.',
    detail: `GLYNNE TECH desarrolla e integra modelos de inteligencia artificial diseñados para comprender el contexto empresarial de cada cliente. 
Nuestras soluciones no solo responden preguntas: interpretan necesidades, analizan datos y generan estrategias de mejora continua.

Creamos asistentes inteligentes que auditan conversaciones, procesan información empresarial y entregan diagnósticos completos que permiten detectar oportunidades de automatización y mejora. 
Cada modelo está entrenado para ofrecer respuestas útiles, comprensibles y alineadas con los objetivos del negocio.`
  },
  {
    icon: <FaFlask size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Investigación, Desarrollo e Innovación',
    description: 'I+D+i como motor de evolución tecnológica.',
    detail: `La innovación no es un departamento dentro de GLYNNE TECH: es nuestra esencia. 
Promovemos proyectos de investigación y desarrollo enfocados en nuevas formas de aplicar la inteligencia artificial a la productividad empresarial.

Colaboramos con instituciones, universidades y organizaciones para explorar soluciones disruptivas que eleven los estándares de automatización y gestión corporativa. 
Además, ofrecemos formación, mentoría y acompañamiento para que las empresas aprendan a integrar la inteligencia artificial en su ADN organizacional.`
  },
  {
    icon: <FaGlobe size={40} className="text-orange-500 drop-shadow-sm" />,
    title: 'Domicilio y Expansión',
    description: 'Desde Madrid (Cundinamarca) hacia un impacto global.',
    detail: `El domicilio principal de GLYNNE TECH se encuentra en Madrid, Cundinamarca, Colombia, desde donde operamos con visión internacional. 
Nuestra meta es expandir nuestras operaciones hacia mercados globales, estableciendo alianzas estratégicas que impulsen la adopción de la inteligencia artificial empresarial.

Con la proyección de crear sucursales en distintas regiones, GLYNNE TECH se prepara para liderar la revolución digital de las empresas modernas, ofreciendo soluciones que trascienden fronteras y redefinen la forma en que los negocios operan, aprenden y crecen.`
  },

  
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function NosotrosMain() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 pt-[100px] bg-white">
      <div className="absolute inset-0 backdrop-blur-[4px] z-0" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center space-y-10 p-6 sm:p-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide text-gray-900">
            Nosotros
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4 text-base md:text-lg">
            GLYNNE TECH S.A.S impulsa la autonomía empresarial mediante auditorías inteligentes, diagnóstico automatizado y soluciones de inteligencia artificial enfocadas en resultados reales.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/40 backdrop-blur-md border border-gray-200/40 p-5 rounded-2xl text-center shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_40px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(service)}
            >
              <div className="mb-3 flex justify-center">{service.icon}</div>
              <h3 className="text-md font-semibold uppercase text-gray-800 mb-1 tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Popup con estilo glass futurista */}
      <AnimatePresence>
        {selected && (
          <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-50">
            <motion.div
              className="fixed inset-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-4/5 max-w-4xl bg-white/40 backdrop-blur-lg border border-gray-200/30 shadow-[0_8px_40px_rgba(0,0,0,0.15)] rounded-2xl p-8"
              >
                <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900">
                  {selected?.title}
                </Dialog.Title>
                <Dialog.Description className="text-gray-800 text-base whitespace-pre-line leading-relaxed">
                  {selected?.detail}
                </Dialog.Description>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-2 bg-gray-900/80 text-white font-medium rounded-lg hover:bg-gray-900 transition-all shadow-sm hover:shadow-md"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
