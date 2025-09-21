'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import Main from './main';

export default function Sections() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar ancho de pantalla
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 700);
    };

    checkScreen(); // correr al inicio
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const cards = [
    {
      type: 'consulting',
      title: 'Habla con tu asesora de IA',
      subtitle:
        'Conversa de forma natural, cuéntale sobre tu negocio y deja que te sorprenda con ideas para integrar inteligencia artificial en tu día a día.',
      link: '/GLY_SALES_AGENTS',
      bgImageMobile: 'https://i.pinimg.com/736x/42/8e/5b/428e5bd29c06b8a48037c72d31ee5706.jpg',
      bgImageDesktop: '/rojp.jpg',
    },
    {
      type: 'construye tu auditoria',
      title: 'Tu auditor digital',
      subtitle:
        'Un chat diseñado para conocerte: te hará preguntas clave sobre tu negocio y, con tus respuestas, construirá una auditoría que revela cuellos de botella y oportunidades reales.',
      link: '/chat2',
      bgImageMobile: 'https://i.pinimg.com/1200x/ba/a4/83/baa483acf883ba698c679c96238b9978.jpg',
      bgImageDesktop: '/eart.jpg',
    },
    {
      type: 'analiza-db',
      title: 'Dale voz a tus datos',
      subtitle:
        'Sube tus bases de datos y obtén un análisis claro, con reportes que muestran tendencias, patrones y lo que tu negocio aún no está viendo.',
      link: '/CSVanaliza',
      bgImageMobile: 'https://i.pinimg.com/736x/07/9b/01/079b012c16d601b27a92f12a6c57d800.jpg',
      bgImageDesktop: 'https://i.pinimg.com/1200x/48/8c/0a/488c0ab47335cb4a34167aa1e50145f7.jpg',
    },
  ];

  return (
    <div className="w-screen text-black overflow-auto">
      {/* Header fijo */}
      <Header />

      <main className="w-full">
        {/* Hero principal */}
        <section className="w-full h-[100vh] flex items-center justify-center bg-white">
          <Main />
        </section>

        {/* Cards como secciones apiladas */}
        <section className="flex flex-col w-full">
          {cards.map(({ type, title, subtitle, link, bgImageMobile, bgImageDesktop }, idx) => (
            <motion.div
              key={type}
              onClick={() => router.push(link)}
              className="relative w-full h-[100vh] flex items-center justify-center cursor-pointer overflow-hidden"
              style={{
                backgroundImage: `url(${isMobile ? bgImageMobile : bgImageDesktop})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-6">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {title}
                </h3>
                <p className="text-lg md:text-xl text-gray-200 mb-6">{subtitle}</p>
                <span className="text-base md:text-lg font-medium text-white underline">
                  Ver más →
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Última sección especial */}
        <section
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              "url('/rojo2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-2xl">
              GLYNNE
            </h1>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-white select-none bg-black
    text-xs sm:text-sm md:text-base lg:text-lg
    py-2 sm:py-3 md:py-4
">
  © GLYNNE 2025 - Innovación impulsada por inteligencia artificial
</footer>

    </div>
  );
}
