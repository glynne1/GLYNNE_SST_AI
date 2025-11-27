import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalWrapper from "./GlobalWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GLYNNE AI - Agentes de IA sin código y automatización empresarial",
  description:
    "GLYNNE AI permite crear agentes inteligentes sin código, automatizar procesos empresariales y escalar tu empresa en Colombia y Latinoamérica.",
  viewport: "width=device-width, initial-scale=1",
  keywords: [
    "GLYNNE AI",
    "agentes IA sin código",
    "automatización empresarial",
    "inteligencia artificial Colombia",
    "software escalable",
    "IA empresarial",
  ],
  openGraph: {
    title: "GLYNNE AI - Agentes de IA sin código",
    description:
      "Crea agentes inteligentes, automatiza procesos y escala tu negocio con GLYNNE AI, la plataforma líder en Colombia y Latinoamérica.",
    url: "https://www.glynneai.com",
    siteName: "GLYNNE AI",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
    site: "@GlynneAI", // Si tienes cuenta oficial de Twitter
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
        </GlobalWrapper>
      </body>
    </html>
  );
}
