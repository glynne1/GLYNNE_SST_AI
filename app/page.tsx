'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Head from 'next/head';
import Header from './components/header';
import Main1 from './components/main1';
import Main2 from './components/main2';
import Main4 from './components/main5';
import Footer from './components/footer';
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
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className={`${className} relative`}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        {/* Título principal optimizado */}
        <title>GLYNNE – Agentes IA Personalizados y Automatización Empresarial B2B</title>

        {/* Meta description para SEO */}
        <meta
          name="description"
          content="GLYNNE desarrolla agentes de inteligencia artificial personalizados para empresas B2B. Automatizamos procesos complejos, integramos sistemas existentes y entregamos agentes exportables listos para operar. Optimiza operaciones, ventas y gestión interna con IA avanzada."
        />
        
        {/* Keywords estratégicas */}
        <meta
          name="keywords"
          content="GLYNNE, agentes IA empresariales, inteligencia artificial B2B, automatización de procesos, integración de APIs, LangChain, RPA, arquitecturas escalables, Next.js, Supabase, no-code, low-code, agentes inteligentes, automatización de ventas, IA para empresas"
        />
        
        <meta name="author" content="GLYNNE Tech" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para compartir en buscadores y previsualización */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GLYNNE – Agentes IA Personalizados para Empresas B2B" />
        <meta
          property="og:description"
          content="GLYNNE ofrece desarrollo de agentes de inteligencia artificial 100% adaptados a cada empresa: personalizables, exportables y listos para integrarse en cualquier flujo de trabajo empresarial."
        />
        <meta property="og:image" content="https://glynneai.com/meta-banner.jpg" />
        <meta property="og:url" content="https://glynneai.com/" />
        <meta property="og:site_name" content="GLYNNE" />

        {/* Canonical */}
        <link rel="canonical" href="https://glynneai.com/" />
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data JSON-LD avanzado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GLYNNE",
              "url": "https://glynneai.com/",
              "logo": "https://glynneai.com/favicon.ico",
              "description": "GLYNNE desarrolla agentes IA personalizados y automatización avanzada para empresas B2B, integrando sistemas y optimizando procesos internos, ventas y operaciones.",
              "founder": {
                "@type": "Person",
                "name": "Alexander Quiroga"
              },
              "foundingDate": "2023-01-01",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+57-312-345-5328",
                  "contactType": "sales",
                  "areaServed": "CO",
                  "availableLanguage": "es"
                }
              ],
              "potentialAction": [
                {
                  "@type": "ViewAction",
                  "target": [
                    "https://glynneai.com/appInfo",
                    "https://glynneai.com/politicas"
                  ],
                  "name": "Conoce más sobre nuestra plataforma y políticas"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
                'https://www.instagram.com/axglynne/',
                'https://www.youtube.com/@AXGLYNNE',

              ]
            })
          }}
        />
      </Head>

      <div className={`${inter.variable} font-sans min-h-screen w-full bg-white text-black overflow-y-auto`}>
        <Header />

        {/* H1 visible para SEO en la primera sección */}
        <AnimatedSection className="min-h-screen flex flex-col items-center justify-center">
 
          <Main1 />
        </AnimatedSection>

        {/* H2s para mejorar SEO por secciones */}
        <AnimatedSection className="min-h-screen flex flex-col items-center justify-center">
       
          <Main2 />
        </AnimatedSection>

        <AnimatedSection className="min-h-screen flex flex-col items-center justify-center">
        
          <Main4 />
        </AnimatedSection>

        <Footer />
      </div>
    </>
  );
}
