import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalWrapper from "./GlobalWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GLYNNE - Automatización empresarial con IA",
  description:
    "GLYNNE desarrolla soluciones de automatización empresarial a medida, integrando inteligencia artificial para optimizar procesos y aumentar la eficiencia de tu empresa en Colombia y Latinoamérica. creando procesos como GLYNNE IA completamente a la medida",
  viewport: "width=device-width, initial-scale=1",
  keywords: [
    "automatización empresarial",
    "inteligencia artificial para empresas",
    "procesos empresariales",
    "agentes autónomos",
    "software escalable",
    "integración de sistemas",
    "GLYNNE IA",
    "automatización B2B",
    "eficiencia empresarial",
    "optimización de operaciones",
  ],
  openGraph: {
    title: "GLYNNE - Soluciones de automatización empresarial con IA",
    description:
      "GLYNNE transforma tu operación empresarial mediante agentes inteligentes que automatizan procesos críticos y optimizan recursos desde el primer día creando procesos como GLYNNE IA completamente a la medida",
    url: "https://www.glynneai.com",
    siteName: "GLYNNE",
    images: [
      {
        url: "/DRAVEN.png",
        width: 1200,
        height: 630,
        alt: "GLYNNE - Automatización empresarial con IA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GLYNNE - Automatización empresarial con IA",
    description:
      "GLYNNE implementa soluciones de automatización inteligente para empresas, optimizando procesos y aumentando eficiencia sin necesidad de código creando procesos como GLYNNE IA completamente a la medida.",
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
                name: "GLYNNE",
                url: "https://www.glynneai.com",
                logo: "https://www.glynneai.com/og-image.png",
                sameAs: [
                  "https://www.linkedin.com/company/glynne-ai",
                  "https://twitter.com/GlynneAI",
                  "https://www.facebook.com/GlynneAI",
                ],
                description:
                  "GLYNNE ofrece soluciones personalizadas de automatización empresarial, integrando agentes inteligentes y software escalable para optimizar procesos y aumentar la eficiencia. creando procesos como GLYNNE IA completamente a la medida y con procesos B2B y software a diseñado para ti",
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
                  "Alexander Quiroga es el fundador y CEO de GLYNNE S.A.S, especializado en automatización empresarial, integración de sistemas y desarrollo de software escalable con IA. Lidera la implementación de soluciones personalizadas para empresas creanndo procesos de software a la medida B2B.",
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
                  "automatización empresarial",
                  "agentes autónomos",
                  "inteligencia artificial aplicada a empresas",
                  "integración de sistemas",
                  "software escalable",
                  "arquitectura de microservicios",
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
                  "Repositorio oficial de GLYNNE, que contiene recursos técnicos, agentes y arquitecturas utilizadas para automatizar procesos empresariales con inteligencia artificial.",
                license: "https://opensource.org/licenses",
                keywords: [
                  "automatización empresarial",
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

          {/* 🔥 JSON-LD — INFORMACIÓN EMPRESARIAL */}
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
                  "Glynne S.A.S es una Sociedad por Acciones Simplificada registrada en Colombia, especializada en automatización empresarial con inteligencia artificial, creación de agentes autónomos y desarrollo de software escalable para empresas.",
              }),
            }}
          />

        </GlobalWrapper>
      </body>
    </html>
  );
}
