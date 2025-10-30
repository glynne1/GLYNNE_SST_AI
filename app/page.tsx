'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Head from 'next/head';

import Main1 from './components/main1';
import Main2 from './components/main2';
import Main4 from './components/main5';

import Footer from './components/footer';

/**
 * NOTAS:
 * - Cambié el default de AnimatedSection a `min-h-screen` para evitar cortes / solapamientos en pantallas pequeñas.
 * - El wrapper padre ahora permite scroll vertical con snap y se asegura de ajustarse al contenido.
 * - No modifiqué tus componentes Main1/Main2/Main4: sólo cambié el layout y el tamaño de sección aquí.
 */

function AnimatedSection({
  children,
  className = 'min-h-screen', // <- cambiado a min-h-screen (más flexible)
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
      className={`snap-start ${className} relative`} // aseguro relative para evitar posicionados absolutos fuera del flujo
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>GLYNNE – Automatización Empresarial con IA y Arquitectura Escalable</title>
        <meta name="description" content="GLYNNE es una plataforma empresarial que permite integrar inteligencia artificial y automatización avanzada en cada proceso operativo. Diagnósticos inteligentes, orquestación con agentes IA, dashboards en tiempo real y más." />
        <meta name="keywords" content="GLYNNE, automatización empresarial, inteligencia artificial, RPA, BPA, integración, agentes IA, LangChain, Next.js, arquitectura escalable, orquestación, low-code, no-code, procesos empresariales, eficiencia operativa, Supabase, n8n" />
        <meta name="author" content="GLYNNE Tech" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="GLYNNE – IA para Automatizar tu Empresa" />
        <meta property="og:description" content="Orquesta procesos empresariales con IA: arquitecturas inteligentes, integración de APIs, agentes personalizados y diagnósticos inteligentes." />
        <meta property="og:image" content="https://glynne-ia-6rjd.vercel.app/meta-banner.jpg" />
        <meta property="og:url" content="https://glynne-ia-6rjd.vercel.app/" />
        <meta property="og:site_name" content="GLYNNE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GLYNNE – IA para Automatizar tu Empresa" />
        <meta name="twitter:description" content="Orquestación de procesos empresariales con inteligencia artificial y automatización avanzada." />
        <meta name="twitter:image" content="https://glynne-ia-6rjd.vercel.app/meta-banner.jpg" />

        <link rel="canonical" href="https://glynne-ia-6rjd.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenedor principal:
          - h-screen para ocupar la ventana y permitir snap vertical
          - overflow-y-auto para permitir scrolling si la suma de secciones supera la pantalla
          - snap-y snap-mandatory para desplazamiento por secciones
      */}
      <div className="h-screen w-full bg-white text-black overflow-y-auto snap-y snap-mandatory font-inter">
        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main1 />
        </AnimatedSection>

        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main2 />
        </AnimatedSection>
    

 
        <AnimatedSection className="min-h-screen flex items-center justify-center">
          <Main4 />
        </AnimatedSection>

        {/* Footer no debería superponerse: lo dejamos fuera del snap si quieres que siempre esté accesible */}
        <div className="w-full bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
