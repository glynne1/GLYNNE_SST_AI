'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const desktopImages = [
  { 
    src: '/chat1.png', 
    desc: 'Interfaz de entrada elegante e intuitiva, diseñada para que cualquier usuario pueda interactuar sin esfuerzo. Un diseño premium, limpio, sofisticado, con sensación de producto de alta calidad, al estilo Apple. Todo está pensado para que la experiencia sea simple, poderosa y confiable.' 
  },
  { 
    src: '/chat2.png', 
    desc: 'El chat de inteligencia artificial recolecta información sobre tu empresa de manera inteligente y progresiva. Cada interacción permite que la IA haga preguntas precisas y relevantes, construyendo un análisis completo y personalizado para generar resultados claros y accionables.' 
  },
  { 
    src: '/chat3.png', 
    desc: 'Auditoría automatizada en acción: el documento se va construyendo mostrando cada sección y detalle. Puedes ver cómo la IA organiza la información, integra procesos y genera recomendaciones de manera clara y profesional, listo para la toma de decisiones.' 
  },
  { 
    src: '/chat4.png', 
    desc: 'Certificaciones, sellos oficiales y firma del CEO. Cada documento está validado legalmente por nuestra empresa, garantizando que la auditoría es legítima, confiable y lista para respaldar cualquier proceso o decisión empresarial. Un sello de calidad y confianza total.' 
  },
];

const mobileImages = [
  { 
    src: '/mobile1.png', 
    desc: 'Interfaz móvil de entrada, elegante e intuitiva. Todo el diseño está optimizado para pantallas pequeñas, con sensación premium y muy fácil de navegar. La experiencia se siente limpia, profesional y de alta calidad.' 
  },
  { 
    src: '/mobile2.png', 
    desc: 'Chat de IA en versión móvil: recopila información sobre tu empresa de manera progresiva y precisa. Cada interacción está diseñada para que el usuario pueda responder de forma cómoda y natural, generando un flujo inteligente de datos.' 
  },
  { 
    src: '/mobile3.png', 
    desc: 'Vista móvil de la auditoría: el documento se construye mostrando las secciones más importantes y recomendaciones clave. La información se organiza claramente, lista para tomar decisiones rápidas y efectivas.' 
  },
  { 
    src: '/mobile5.png', 
    desc: 'Resumen de resultados en móvil: el usuario puede ver el estado de la auditoría, con indicadores visuales claros, datos clave y alertas importantes de manera compacta pero comprensible.' 
  },
  { 
    src: '/mobile6.png', 
    desc: 'Firma del CEO y validaciones finales en la interfaz móvil, reforzando la legitimidad del documento y el compromiso de la empresa con la calidad y confiabilidad de sus procesos.' 
  },
];

export default function FacebookPostGrid() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [imagesData, setImagesData] = useState(desktopImages);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) setImagesData(mobileImages);
      else setImagesData(desktopImages);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openCarousel = (index) => setActiveIndex(index);
  const closeCarousel = () => setActiveIndex(null);

  // Función para recortar texto a N palabras
  const truncateText = (text, wordLimit = 40) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const fullDescription = `Mira los avances en thinking de nuestro modelo GLYNNE: desde la interfaz de entrada hasta la auditoría final, cada interacción está diseñada para ofrecer una experiencia inteligente, fluida y confiable. Nuestro sistema de IA recolecta información de tu empresa de manera progresiva y precisa, formulando preguntas estratégicas que permiten construir un análisis completo y personalizado. Cada documento generado muestra de manera clara cómo se organizan los procesos internos, integrando información clave y generando recomendaciones accionables. Desde la validación de datos hasta la firma del CEO y la inclusión de sellos oficiales, todo está pensado para garantizar la legitimidad, confiabilidad y calidad del análisis. Con GLYNNE, la información no solo se recopila: se transforma en decisiones inteligentes, facilitando la toma de decisiones estratégicas y ofreciendo una visión completa de tu empresa. Cada detalle, cada sección y cada recomendación están diseñados para que puedas actuar con confianza y eficiencia, optimizando recursos y potenciando tus resultados.`;

  const imagesToShow = imagesData.slice(0, 3);
  const remainingCount = imagesData.length - 3;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        {/* Header usuario */}
        <div className="flex items-center p-4 border-b">
          <img src="/integra.png" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold">Producción GLYNNE</h3>
            <p className="text-gray-500 text-sm"></p>
          </div>
        </div>

        {/* Texto publicación */}
        <p className="p-4 text-gray-800 flex-shrink-0">
          {showFullDesc ? fullDescription : truncateText(fullDescription, 40)}
          <span
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-gray-500  font-semibold cursor-pointer ml-2"
          >
            {showFullDesc ? 'Ver menos' : 'Ver más'}
          </span>
        </p>

        {/* Grilla de imágenes */}
        <div className="p-2 flex-grow">
          <div className="grid grid-cols-3 gap-2">
            {imagesToShow.map((img, index) => (
              <motion.div
                key={index}
                className="relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openCarousel(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={img.src}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] object-cover"
                />
                {index === 2 && remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    Ver +{remainingCount}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal carrusel */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCarousel}
            >
              <motion.div
                className="relative w-[90vw] h-[90vh] flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Imagen */}
                <div className="flex-grow w-full lg:w-[75%] h-[75%] lg:h-full flex items-center justify-center bg-white relative">
                  <img
                    src={imagesData[activeIndex].src}
                    alt={`Imagen ${activeIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  {/* Controles prev/next */}
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? imagesData.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    onClick={() => setActiveIndex((prev) => (prev === imagesData.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>
                </div>

                {/* Descripción */}
                <div className="w-full lg:w-[25%] h-[25%] lg:h-full p-4 bg-white overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-2">GLYNNE</h2>
                  <p className="text-gray-800">{imagesData[activeIndex].desc}</p>
                </div>

                {/* Botón cerrar */}
                <button
                  className="absolute top-4 right-4 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  onClick={closeCarousel}
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
