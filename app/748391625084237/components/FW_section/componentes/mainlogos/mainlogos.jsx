'use client';

import Image from 'next/image';
import './mainlogos.css';

export default function TechShowcaseContainer() {
  const techLogos = [
    { src: '/langchain-text.png', alt: 'LangChain' },
    { src: '/n8n-color.png', alt: 'n8n' },
    { src: '/icons8-next.js-48.png', alt: 'Next.js' },
    { src: '/icons8-nodejs-480.png', alt: 'Node.js' },
    { src: '/icons8-supabase-480.png', alt: 'Supabase' },
    { src: '/icons8-python-480.png', alt: 'Python' },
    { src: '/icons8-chatear-500.png', alt: 'OpenAI' },
    { src: '/vercel.png', alt: 'Vercel' },
    { src: '/icons8-estibador-240.png', alt: 'Docker' },
    { src: '/scikit-learn.png', alt: 'Scikit-learn' },
    { src: '/TensorFlow.png', alt: 'TensorFlow' },
  ];

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-10 bg-white"
      style={{
        backgroundImage: "url('/fig.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Blur de fondo */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[3.7px] z-0" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center space-y-8 bg-white/70 backdrop-blur-xl p-6 sm:p-10 ring-1 ring-black/10 shadow-xl rounded-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug tracking-tight">
          Tecnología de clase mundial al servicio de tu empresa
        </h2>

        <p className="max-w-3xl text-gray-600 text-sm md:text-base leading-relaxed font-medium">
          En GLYNNE usamos las mismas tecnologías que impulsan a las compañías más innovadoras del mundo.  
          Esto significa que cada solución que construimos es rápida, segura y capaz de crecer al mismo ritmo que tu negocio.  
          No se trata solo de herramientas: se trata de poner la tecnología adecuada en tus manos para que tu empresa gane eficiencia, reduzca costos y esté preparada para el futuro.
        </p>

        {/* Carrusel de logos */}
        <div className="w-full overflow-hidden scrollbar-hide">
          <div className="flex space-x-6 sm:space-x-10 min-w-max py-2 px-2 animate-slide-infinite">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 relative opacity-90 hover:opacity-100 transition duration-300 ease-in-out"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
