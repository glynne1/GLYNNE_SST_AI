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
        <title>GLYNNE – Desarrollo de Software y Arquitecturas Personalizadas B2B</title>

        {/* Meta description para SEO */}
        <meta
          name="description"
          content="GLYNNE diseña soluciones de software y arquitecturas personalizadas para empresas B2B. Implementamos sistemas escalables, automatización de procesos y agentes inteligentes adaptados a cada negocio, optimizando operaciones, ventas y gestión interna."
        />
        
        {/* Keywords estratégicas */}
        <meta
          name="keywords"
          content="GLYNNE, desarrollo de software empresarial, arquitecturas B2B, automatización de procesos, integración de sistemas, microservicios escalables, software a medida, soluciones empresariales, optimización de operaciones, agentes inteligentes, RPA, LangChain, FastAPI, Next.js, Supabase"
        />
        
        <meta name="author" content="GLYNNE S.A.S" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para compartir en buscadores y previsualización */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GLYNNE – Soluciones de Software y Arquitecturas Empresariales B2B" />
        <meta
          property="og:description"
          content="GLYNNE crea arquitecturas de software y sistemas personalizados para empresas B2B, integrando automatización, agentes inteligentes y soluciones escalables adaptadas a cada flujo de trabajo empresarial."
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
              "description": "GLYNNE desarrolla soluciones de software y arquitecturas personalizadas para empresas B2B, integrando sistemas, automatización avanzada y agentes inteligentes que optimizan operaciones, ventas y gestión interna.",
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
                "https://www.instagram.com/axglynne/",
                "https://www.youtube.com/@AXGLYNNE"
              ],
              
              // 🔥 JSON-LD FUNDADOR
              "employee": [
                {
                  "@type": "Person",
                  "name": "Alexander Quiroga",
                  "jobTitle": "Fundador & CEO — GLYNNE S.A.S y arquitecto de software empresarial",
                  "url": "https://glynneai.com",
                  "image": "https://glynneai.com/alexander-quiroga.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
                    "https://www.instagram.com/glynneai/",
                    "https://www.youtube.com/@AXGLYNNE"
                  ],
                  "knowsAbout": [
                    "desarrollo de software B2B",
                    "arquitectura de software personalizada",
                    "automatización empresarial",
                    "microservicios escalables",
                    "integración de sistemas",
                    "agentes inteligentes para negocios",
                    "optimización de procesos internos",
                    "RPA y automatización avanzada",
                    "LangChain y FastAPI",
                    "Next.js, Supabase y plataformas web escalables",
                    "software empresarial a medida",
                    "consultoría tecnológica B2B"
                  ]
                }
              ],

              // 🔥 JSON-LD REPOSITORIO
              "softwareSourceCode": {
                "@type": "SoftwareSourceCode",
                "name": "Repositorio oficial de la arquitectura y soluciones GLYNNE",
                "codeRepository": "https://github.com/glynne1/GLYNNE",
                "url": "https://github.com/glynne1/GLYNNE",
                "programmingLanguage": ["Python", "TypeScript", "Next.js", "FastAPI", "LangChain", "LangGraph", "crew IA", "LLM", "Machine Learning", "Ciencia de datos"],
                "author": {
                  "@type": "Person",
                  "name": "Alexander Quiroga"
                },
                "description": "Repositorio oficial de GLYNNE con la información de arquitecturas, soluciones B2B y desarrollo de software empresarial escalable.",
                "license": "https://opensource.org/licenses",
                "maintainer": {
                  "@type": "Organization",
                  "name": "GLYNNE S.A.S"
                }
              },

              // 🔥 JSON-LD REGISTRO LEGAL
              "legalName": "Glynne Sas",
              "taxID": "901966512",
              "legalForm": "Sociedad por Acciones Simplificada",
              "foundingLocation": "Madrid, Cundinamarca, Colombia",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "CARRERA 2A Nro.1-24SUR",
                "addressLocality": "Madrid",
                "addressRegion": "Cundinamarca",
                "postalCode": "250030",
                "addressCountry": "CO"
              },
              "isicV4": "6201 - Desarrollo de sistemas informáticos",
              "registrationStatus": "MATRÍCULA ACTIVA",
              "registrationURL": "https://www.datacreditoempresas.com.co/directorio/glynne-sas.html"
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
