"use client";
import Head from "next/head";

import Header from "./components/heder";
import Main1 from "./components/main1";
import SocialShowcase from "./components/Coontacto";
import Footer from "./components/footer";

export default function Page() {
  return (
    <>
      <Head>
        <title>
          GLYNNE S.A.S — Empresa de Desarrollo de Software, Automatización Empresarial y Arquitectura de Inteligencia Artificial
        </title>

        <meta
          name="description"
          content="GLYNNE S.A.S (NIT 901966512) es una empresa registrada en Colombia dedicada al desarrollo de software, automatización empresarial, integración de sistemas, arquitectura de inteligencia artificial y plataformas corporativas escalables. Ubicada en Madrid, Cundinamarca."
        />

        <meta
          name="keywords"
          content="GLYNNE S.A.S, Glynne Sas, NIT 901966512, empresa de software Colombia, automatización empresarial, inteligencia artificial, integración de sistemas, desarrollo B2B, arquitecturas escalables, plataformas corporativas, IA aplicada, innovación tecnológica"
        />

        <meta name="author" content="GLYNNE S.A.S" />
        <meta name="robots" content="index, follow" />

        {/* OG */}
        <meta property="og:title" content="GLYNNE S.A.S — Ingeniería de Software, IA y Automatización" />
        <meta
          property="og:description"
          content="Empresa colombiana (NIT 901966512) especializada en desarrollo de software, automatización avanzada y soluciones de inteligencia artificial para empresas."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://glynneai.com" />
        <meta property="og:image" content="https://glynneai.com/og-main.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GLYNNE S.A.S — Desarrollo de Software y Automatización Empresarial" />
        <meta
          name="twitter:description"
          content="Empresa de ingeniería en software con enfoque en automatización, IA y sistemas empresariales escalables."
        />
        <meta name="twitter:image" content="https://glynneai.com/og-main.png" />

        <link rel="canonical" href="https://glynneai.com" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GLYNNE S.A.S",
              legalName: "Glynne Sas",
              alternateName: "GLYNNE S.A.S",
              url: "https://glynneai.com",
              logo: "https://glynneai.com/logo.png",
              description:
                "GLYNNE S.A.S (NIT 901966512) es una empresa colombiana dedicada al desarrollo de plataformas empresariales, automatización avanzada, integración con APIs corporativas, agentes inteligentes y arquitectura de software escalable.",
              taxID: "901966512",
              vatID: "901966512",
              foundingDate: "2024-01-01",
              numberOfEmployees: "1-20",
              legalForm: "Sociedad por Acciones Simplificada (S.A.S)",
              isicV4: "6201 - Desarrollo de sistemas informáticos",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Carrera 2A #1-24 Sur",
                addressLocality: "Madrid",
                addressRegion: "Cundinamarca",
                postalCode: "250030",
                addressCountry: "CO",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+57 3123455328",
                email: "alexglynne7@gmail.com",
                contactType: "customer service",
                availableLanguage: ["es", "en"],
              },
              sameAs: [
                "https://www.instagram.com/glynneai/",
                "https://www.youtube.com/@AXGLYNNE",
                "https://www.linkedin.com/in/alexander-quiroga-a992452b4/",
                "https://glynneai.com/politicas",
                "https://glynneai.com/appInfo",
                "https://www.datacreditoempresas.com.co/directorio/glynne-sas.html",
              ],
              brand: {
                "@type": "Brand",
                name: "GLYNNE IA",
                description:
                  "GLYNNE IA es un producto de GLYNNE S.A.S orientado a autonomía operativa, automatización de procesos y agentes inteligentes para empresas.",
              },
              makesOffer: [
                {
                  "@type": "Service",
                  name: "Desarrollo de Software Empresarial",
                  description:
                    "Creación de plataformas personalizadas, microservicios, sistemas de gestión y aplicaciones corporativas robustas.",
                },
                {
                  "@type": "Service",
                  name: "Automatización de Procesos Empresariales",
                  description:
                    "Implementación de flujos autónomos, agentes inteligentes, orquestación y automatización con IA aplicada.",
                },
                {
                  "@type": "Service",
                  name: "Integración de Sistemas",
                  description:
                    "Conexiones estructuradas con APIs de WhatsApp, Gmail, ERPs, CRMs y sistemas internos.",
                },
                {
                  "@type": "Service",
                  name: "Arquitectura de Inteligencia Artificial",
                  description:
                    "Diseño de sistemas complejos basados en agentes, modelos lingüísticos, pipelines y arquitecturas escalables.",
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="w-full flex flex-col">
        {/* Sección principal */}
        <div>
          <Header />
        </div>

        <div>
          <Main1 />
        </div>

        {/* Sección de redes sociales */}
        <div className="mt-20">
          <SocialShowcase />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
