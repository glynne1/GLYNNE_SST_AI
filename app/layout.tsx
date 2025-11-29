import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalWrapper from "./GlobalWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GLYNNE AI - La manera mas facil de crear agentes ia",
  description:
    "GLYNNE AI permite crear agentes inteligentes sin código, automatizar procesos empresariales y escalar y adaptar tu empresa en Colombia y Latinoamérica a la nueva era IA.",
  viewport: "width=device-width, initial-scale=1",
  keywords: [
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
    "automatización de procesos comerciales",
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
  "automatización de procesos comerciales B2B"
  ],
  openGraph: {
    title: "GLYNNE AI - Agentes de IA sin código",
    description:
      "Crea agentes inteligentes, automatiza procesos y escala tu negocio con GLYNNE AI, la plataforma líder en Colombia y Latinoamérica.",
    url: "https://www.glynneai.com",
    siteName: "GLYNNE AI",
    images: [
      {
        url: "/DRAVEN.png",
        width: 1200,
        height: 630,
        alt: "GLYNNE AI - Automatización con agentes inteligentes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLYNNE AI - Agentes de IA sin código",
    description:
      "Crea agentes inteligentes, automatiza procesos y escala tu negocio con GLYNNE AI, la plataforma líder en Colombia y Latinoamérica.",
    images: ["/DRAVEN.png"],
    site: "@GlynneAI",
    creator: "@GlynneAI",
  },
  alternates: {
    canonical: "https://www.glynneai.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalWrapper>
          {children}

          {/* Structured Data JSON-LD para Google */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "GLYNNE AI",
                url: "https://www.glynneai.com",
                logo: "https://www.glynneai.com/og-image.png",
                sameAs: [
                  "https://www.linkedin.com/company/glynne-ai",
                  "https://twitter.com/GlynneAI",
                  "https://www.facebook.com/GlynneAI",
                ],
                description:
                  "GLYNNE AI permite crear agentes inteligentes sin código, automatizar procesos empresariales y escalar tu empresa en Colombia y Latinoamérica.",
              }),
            }}
          />

          {/* JSON-LD del FUNDADOR */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Alexander Quiroga",
                alternateName: "Alex Glynne",
                jobTitle: "Fundador & CEO — GLYNNE S.A.S",
                description:
                  "Alexander Quiroga es el fundador y CEO de GLYNNE S.A.S. Desarrollador especializado en automatización empresarial, inteligencia artificial, integración con APIs y arquitectura de software escalable. Creador de la plataforma GLYNNE AI.",
                worksFor: {
                  "@type": "Organization",
                  name: "GLYNNE S.A.S",
                  url: "https://glynneai.com",
                },
                affiliation: {
                  "@type": "Organization",
                  name: "GLYNNE IA",
                },
                url: "https://glynneai.com",
                image: "https://glynneai.com/alexander-quiroga.png",
                sameAs: [
                  "https://www.instagram.com/glynneai/",
                  "https://www.youtube.com/@AXGLYNNE",
                  "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
                ],
                knowsAbout: [
                  "arquitectura de software",
                  "inteligencia artificial",
                  "automatización empresarial",
                  "integración de APIs",
                  "microservicios",
                  "sistemas escalables",
                ],
              }),
            }}
          />

          {/* JSON-LD DEL REPOSITORIO OFICIAL */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareSourceCode",
                name: "Repositorio oficial de GLYNNE",
                codeRepository: "https://github.com/glynne1/GLYNNE",
                url: "https://github.com/glynne1/GLYNNE",
                programmingLanguage: ["Python", "TypeScript", "Next.js", "FastAPI", "LangChain"],
                author: {
                  "@type": "Person",
                  name: "Alexander Quiroga",
                },
                description:
                  "Repositorio oficial de la plataforma GLYNNE AI, que contiene la arquitectura, agentes, API, backend y recursos técnicos utilizados para automatizar procesos empresariales con inteligencia artificial.",
                license: "https://opensource.org/licenses",
                keywords: [
                  "automatización con IA",
                  "agentes inteligentes",
                  "arquitectura de software",
                  "LangChain",
                  "FastAPI",
                  "Next.js",
                  "GLYNNE AI",
                ],
                maintainer: {
                  "@type": "Organization",
                  name: "GLYNNE S.A.S",
                },
              }),
            }}
          />

          {/* 🔥 JSON-LD — INFORMACIÓN EMPRESARIAL (CÁMARA DE COMERCIO / EXPERIAN) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Glynne S.A.S",
                legalName: "Glynne S.A.S",
                url: "https://www.glynneai.com",
                identifier: {
                  "@type": "PropertyValue",
                  propertyID: "NIT",
                  value: "901966512",
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "CARRERA 2A Nro.1-24 SUR",
                  addressLocality: "Madrid",
                  addressRegion: "Cundinamarca",
                  addressCountry: "CO",
                },
                sameAs: [
                  "https://www.datacreditoempresas.com.co/directorio/glynne-sas.html"
                ],
                description:
                  "Glynne S.A.S es una Sociedad por Acciones Simplificada registrada en Colombia. Empresa especializada en automatización con inteligencia artificial, creación de agentes autónomos y desarrollo de software escalable.",
              }),
            }}
          />

        </GlobalWrapper>
      </body>
    </html>
  );
}
