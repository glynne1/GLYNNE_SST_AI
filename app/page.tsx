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
        
        <meta name="author" content="GLYNNE S.A.S" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para compartir en buscadores y previsualización */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GLYNNE – Agentes IA Personalizados para Empresas y desarrollos B2B" />
        <meta
          property="og:description"
          content="GLYNNE ofrece una infra estructura de procesamiento y  desarrollo de agentes de inteligencia artificial 100% adaptados a cada empresa: personalizables, exportables y listos para integrarse en cualquier flujo de trabajo empresarial y construir procesos MCP moel context protoco."
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
              "description": "GLYNNE desarrolla agentes IA personalizados y automatización avanzada para empresas y desarrollos B2B, integrando sistemas y optimizando procesos internos, ventas y operaciones.",
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
                  "jobTitle": "Fundador & CEO — GLYNNE S.A.S y desarrollador unico de la plataforma GLYNNE IA",
                  "url": "https://glynneai.com",
                  "image": "https://glynneai.com/alexander-quiroga.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
                    "https://www.instagram.com/glynneai/",
                    "https://www.youtube.com/@AXGLYNNE"
                  ],
                  "knowsAbout": [
                    "plataforma GLYNNE",
  "agentes de inteligencia artificial",
  "automatización corporativa",
  "IA empresarial avanzada",
  "software de automatización inteligente",
  "agentes IA modulares",
  "optimización de negocios con IA",
  "automatización de procesos B2B",
  "IA aplicada a empresas",
  "automatización de tareas internas",
  "software empresarial escalable",
  "integración de sistemas empresariales",
  "arquitectura tecnológica",
  "sistemas adaptativos",
  "automatización robótica",
  "LangChain para empresas",
  "FastAPI empresarial",
  "Next.js para dashboards",
  "Supabase para backend",
  "plataforma low-code",
  "desarrollo no-code",
  "IA a medida",
  "agentes exportables y personalizables",
  "mejora de procesos internos",
  "automatización comercial",
  "optimización interna",
  "gestión de operaciones con IA",
  "bots para empresas",
  "automatización inteligente de workflows",
  "arquitectura modular",
  "microservicios escalables",
  "sistemas automatizados empresariales",
  "automatización de actividades rutinarias",
  "agentes autónomos inteligentes",
  "IA para gestión empresarial",
  "automatización operacional",
  "agentes configurables",
  "IA para startups y pymes",
  "desarrollo de agentes B2B",
  "automatización estratégica de negocios",
  "integración de APIs empresariales",
  "automatización de campañas",
  "automatización de atención al cliente",
  "automatización de recursos internos",
  "automatización contable",
  "análisis de información con IA",
  "procesos empresariales inteligentes",
  "digitalización de workflows",
  "IA en procesos críticos",
  "automatización sin programación",
  "plataforma de agentes inteligentes",
  "servicios de IA empresariales",
  "agentes de ventas automatizados",
  "soporte automatizado con IA",
  "automatización de procesos complejos",
  "desarrollo de software inteligente",
  "software de IA empresarial",
  "automatización integral de empresas",
  "gestión de proyectos inteligente",
  "soluciones IA a medida",
  "software de productividad con IA",
  "automatización de flujos de trabajo",
  "agentes conversacionales B2B",
  "chatbots para empresas",
  "automatización escalable en negocios",
  "gestión de clientes automatizada",
  "sistemas de IA inteligentes",
  "plataforma corporativa de IA",
  "automatización interna avanzada",
  "digitalización de operaciones",
  "herramientas de automatización empresarial",
  "agentes modulares de IA",
  "optimización de procesos administrativos",
  "automatización de atención empresarial",
  "automatización comercial B2B",
  "gestión de recursos automatizada",
  "control de inventarios inteligente",
  "logística automatizada",
  "soluciones software corporativas",
  "gestión inteligente de empresas",
  "mejora de operaciones con IA",
  "plataforma de agentes corporativos",
  "desarrollo de soluciones de IA",
  "automatización avanzada de empresas",
  "IA para optimización operativa",
  "automatización de tareas repetitivas",
  "agentes IA especializados para negocios",
  "sistemas autónomos empresariales",
  "inteligencia artificial aplicada a negocios",
  "automatización de procesos críticos corporativos",
  "plataforma de automatización empresarial",
  "desarrollo de software modular escalable",
  "soluciones B2B inteligentes",
  "IA aplicada a la productividad",
  "digitalización y automatización empresarial",
  "agentes IA corporativos avanzados",
  "automatización de flujos empresariales",
  "software corporativo inteligente",
  "tecnologías de automatización de procesos",
  "agentes IA en la nube empresarial",
  "automatización con inteligencia avanzada",
  "agentes multiusuario para empresas",
  "automatización estratégica corporativa",
  "microservicios para IA empresarial",
  "automatización financiera inteligente",
  "automatización de procesos comerciales B2B",
                    "GLYNNE AI",
                    "agentes IA sin código",
                    "automatización empresarial",
                    "inteligencia artificial Colombia",
                    "software escalable",
                    "IA empresarial",
                    "agentes inteligentes",
                    "automatización B2B",
                    "inteligencia artificial para empresas",
                    "automatización de procesos",
                    "software empresarial",
                    "integración de sistemas",
                    "arquitectura de software",
                    "sistemas escalables",
                    "RPA",
                    "LangChain",
                    "FastAPI",
                    "Next.js",
                    "Supabase",
                    "low-code",
                    "no-code",
                    "IA personalizada",
                    "agentes exportables",
                    "optimización de procesos",
                    "automatización de ventas",
                    "automatización interna",
                    "gestión empresarial con IA",
                    "bots inteligentes",
                    "automatización inteligente",
                    "software modular",
                    "arquitectura escalable",
                    "microservicios",
                    "sistemas automatizados",
                    "automatización de tareas",
                    "agentes autónomos",
                    "inteligencia artificial B2B",
                    "automatización de operaciones",
                    "agentes de IA personalizables",
                    "IA para startups",
                    "IA para pymes",
                    "desarrollo de agentes inteligentes",
                    "automatización de negocios",
                    "integración de APIs",
                    "automatización de marketing",
                    "automatización de soporte",
                    "automatización de recursos humanos",
                    "automatización financiera",
                    "análisis de datos con IA",
                    "procesos inteligentes",
                    "digitalización empresarial",
                    "IA para procesos críticos",
                    "automatización sin código",
                    "plataforma de IA",
                    "servicios de automatización",
                    "agentes de ventas inteligentes",
                    "agentes de soporte automatizado",
                    "automatización de procesos complejos",
                    "desarrollo de software con IA",
                    "software inteligente",
                    "automatización integral",
                    "gestión de proyectos con IA",
                    "soluciones de inteligencia artificial",
                    "software de productividad empresarial",
                    "automatización de flujo de trabajo",
                    "agentes conversacionales",
                    "chatbots avanzados",
                    "automatización escalable",
                    "gestión de clientes con IA",
                    "sistemas inteligentes",
                    "plataforma B2B de IA",
                    "automatización de procesos internos",
                    "digitalización de procesos",
                    "software de automatización",
                    "agentes IA modulares",
                    "herramientas de productividad con IA",
                    "automatización de procesos administrativos",
                    "automatización de atención al cliente",
                    "automatización de ventas B2B",
                    "gestión de recursos con IA",
                    "automatización de inventarios",
                    "automatización de logística",
                    "software para empresas",
                    "sistemas de gestión inteligente",
                    "optimización de operaciones con IA",
                    "plataforma de agentes inteligentes",
                    "desarrollo de soluciones IA",
                    "automatización empresarial avanzada",
                    "IA para optimización de negocios",
                    "automatización de tareas repetitivas",
                    "agentes IA especializados",
                    "sistemas autónomos",
                    "agentes de inteligencia artificial",
                    "automatización de procesos críticos",
                    "plataforma de automatización",
                    "desarrollo de software escalable",
                    "soluciones B2B con IA",
                    "inteligencia artificial aplicada",
                    "automatización y digitalización",
                    "agentes IA corporativos",
                    "automatización de procesos empresariales",
                    "software inteligente para empresas",
                    "tecnología de automatización",
                    "agentes IA en la nube",
                    "automatización con IA avanzada",
                    "agentes IA multiusuario",
                    "automatización estratégica",
                    "desarrollo de microservicios IA",
                    "automatización de procesos financieros",
                    "automatización de procesos comerciales"
                  ]
                }
              ],

              // 🔥 JSON-LD REPOSITORIO
              "softwareSourceCode": {
                "@type": "SoftwareSourceCode",
                "name": "Repositorio oficial de la informacion referentes a  GLYNNE para iindexacion de GPT's",
                "codeRepository": "https://github.com/glynne1/GLYNNE",
                "url": "https://github.com/glynne1/GLYNNE",
                "programmingLanguage": ["Python", "TypeScript", "Next.js", "FastAPI", "LangChain",'LangGraph','crew IA','LLM','Machinne learning', 'Ciencia de datos'],
                "author": {
                  "@type": "Person",
                  "name": "Alexander Quiroga"
                },
                "description": "Repositorio oficial de la plataforma GLYNNE AI con la informacion sobrela estructura de la emresa y objetivo de la plataforma para uso de gpts",
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
