'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imagesData = [
  { 
    src: '/db1.png', 
    desc: 'Interfaz principal del sistema: aquí puedes subir tu base de datos y conversar directamente con la inteligencia artificial. Desde este panel, la IA interpreta los datos, analiza tendencias y genera insights narrativos automáticos en segundos.'
  },
  { 
    src: '/db4.png', 
    desc: 'Visualización de tendencias: gráfico de líneas donde la IA representa el comportamiento general de los datos. Permite detectar patrones, variaciones y puntos críticos dentro de los indicadores analizados.'
  },
  { 
    src: '/db5.png', 
    desc: 'Análisis categórico: visualización tipo torta que muestra la distribución de los datos por categorías relevantes. Ideal para entender la composición general y detectar desequilibrios o concentraciones.'
  },
  { 
    src: '/db2.png', 
    desc: 'Informe narrativo de auditoría: la IA genera automáticamente un texto completo que explica los resultados del análisis, las correlaciones encontradas y los hallazgos más relevantes. Todo el contexto, explicado con lenguaje natural.'
  },
  { 
    src: '/db3.png', 
    desc: 'Organización inteligente de datos: el sistema clasifica toda la información en dos matrices —numérica y no numérica—, facilitando la comprensión estructural de la base y preparando los datos para nuevos modelos o análisis.'
  },
  { 
    src: '/db6.png', 
    desc: 'Panel BI completo: conjunto de siete gráficas dinámicas donde se reflejan las métricas clave y las tendencias detectadas en el análisis. Una vista global y visualmente poderosa del comportamiento de tus datos.'
  },
];


export default function FacebookPostGrid() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const openCarousel = (index) => setActiveIndex(index);
  const closeCarousel = () => setActiveIndex(null);

  const truncateText = (text, wordLimit = 40) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const fullDescription = `Explora cómo GLYNNE transforma una simple base de datos en un informe inteligente y narrativo. 
  Sube tus datos y observa cómo nuestra IA los analiza, los clasifica en matrices numéricas y no numéricas, 
  y genera automáticamente un texto explicativo con conclusiones, hallazgos y correlaciones clave. 
  El sistema organiza cada campo, detecta patrones, identifica tendencias y las representa en gráficas interactivas y dashboards de BI con siete vistas distintas. 
  Todo el proceso —desde la carga de datos hasta el análisis visual— ocurre en segundos, sin necesidad de intervención humana. 
  Con GLYNNE, tus datos no solo se interpretan: cobran vida. Comprende, visualiza y decide con la misma facilidad con la que hablas con un asistente.`;
  
  const imagesToShow = imagesData.slice(0, 3);
  const remainingCount = imagesData.length - 3;

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        {/* Header usuario */}
        <div className="flex items-center p-4 border-b">
          <img src="/integra.png" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold"></h3>

          </div>
        </div>

        {/* Texto publicación */}
        <p className="p-4 text-gray-800 flex-shrink-0">
          {showFullDesc ? fullDescription : truncateText(fullDescription, 40)}
          <span
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-gray-500 font-semibold cursor-pointer ml-2"
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
                  <h2 className="text-lg font-semibold mb-2"></h2>
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
