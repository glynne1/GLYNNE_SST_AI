'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Head from 'next/head';

import Main1 from './components/main1';
import Main2 from './components/main2';
import Main4 from './components/main5';
import Footer from './components/footer';

// Importa la fuente Inter optimizada con next/font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function AnimatedSection({
  children,
  className = 'min-h-screen',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: 'easeOut',
          },
        },
      }}
      className={`snap-start ${className} relative`}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>GLYNNE – Desarrollo de Agentes IA Personalizados para Empresas</title>

        <meta
          name="description"
          content="GLYNNE desarrolla agentes de inteligencia artificial ultra personalizados para empresas, capaces de automatizar procesos complejos, integrarse a sistemas existentes y exportarse para su uso en cualquier flujo de trabajo. Optimiza operaciones con IA a medida."
        />
        <meta
          name="keywords"
          content="GLYNNE, agentes IA personalizados, desarrollo de IA, inteligencia artificial empresarial, automatización avanzada, exportación de agentes, integración de APIs, LangChain, RPA, arquitecturas escalables, Next.js, Supabase, no-code, low-code"
        />
        <meta name="author" content="GLYNNE Tech" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="GLYNNE – Agentes IA Ultra Personalizados para Empresas" />
        <meta
          property="og:description"
          content="Creamos agentes IA totalmente adaptados a cada empresa: personalizables, exportables y listos para integrarse en tus procesos operativos. Automatización avanzada con inteligencia artificial hecha a tu medida."
        />
        <meta property="og:image" content="https://glynne-ia-6rjd.vercel.app/meta-banner.jpg" />
        <meta property="og:url" content="https://glynne-ia-6rjd.vercel.app/" />
        <meta property="og:site_name" content="GLYNNE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GLYNNE – Agentes IA Ultra Personalizados" />
        <meta
          name="twitter:description"
          content="GLYNNE ofrece desarrollo de agentes de IA a medida para empresas, optimizando procesos, integraciones y exportación de agentes listos para operar en cualquier flujo de trabajo."
        />
        <meta name="twitter:image" content="https://glynne-ia-6rjd.vercel.app/meta-banner.jpg" />

        <link rel="canonical" href="https://glynne-ia-6rjd.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenedor principal con fuente global */}
      <div
        className={`${inter.variable} font-sans h-screen w-full bg-white text-black overflow-y-auto snap-y snap-mandatory`}
      >
        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main1 />
        </AnimatedSection>

        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main2 />
        </AnimatedSection>

        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main4 />
        </AnimatedSection>

        <div className="w-full bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
