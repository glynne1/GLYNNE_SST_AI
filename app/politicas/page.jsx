"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  ChevronDown,
  ChevronUp,
  Database,
  KeyRound,
  Cpu,
  Layers,
  FileText,
} from "lucide-react";

import Head from "next/head";
import Header from "./components/header";

export default function GLYNNEOverviewComponent() {
  const [openSection, setOpenSection] = useState(null);
  const contentRef = useRef(null);

 
  const sections = [
    {
      id: "legal-1",
      title: "Alcance y Naturaleza del Servicio",
      icon: FileText,
      content:
        "GLYNNE es una plataforma tecnológica que provee herramientas, interfaces, módulos de automatización y entornos de despliegue orientados al desarrollo y operación de agentes de inteligencia artificial. La plataforma no constituye un servicio de consultoría, supervisión, garantía de resultados, ni un intermediario en las decisiones que el usuario implemente mediante agentes, flujos o integraciones."
    },
    {
      id: "legal-2",
      title: "Responsabilidad sobre Automatizaciones",
      icon: FileText,
      content:
        "Toda acción generada dentro de GLYNNE —ya sea por agentes configurados, flujos no-code, integraciones externas, scripts o modelos generativos— es responsabilidad exclusiva del usuario que diseñó o activó dicha acción. GLYNNE no valida, corrige ni interpreta la intención real detrás de cada automatización y, por tanto, no asume responsabilidad por su uso, efectos o consecuencias."
    },
    {
      id: "legal-3",
      title: "Modelo Open-Source y Layer B2B",
      icon: FileText,
      content:
        "GLYNNE opera bajo un modelo mixto: una capa base open-source que permite a cualquier desarrollador utilizar componentes fundamentales, y un nivel superior B2B que agrega características empresariales, soporte técnico y escalabilidad. En ningún caso la disponibilidad de estas capas implica coautoría, corresponsabilidad o participación en los sistemas creados por terceros."
    },
    {
      id: "legal-4",
      title: "Naturaleza de las Recomendaciones de IA",
      icon: FileText,
      content:
        "La plataforma provee infraestructura, no decisiones. Aunque GLYNNE incluye sistemas basados en IA capaces de generar sugerencias, recomendaciones o estructuras técnicas, dichas salidas son orientativas y no deben interpretarse como instrucciones obligatorias, ni como garantías de exactitud o conformidad legal, técnica o financiera."
    },
    {
      id: "legal-5",
      title: "Credenciales, Permisos e Integraciones",
      icon: FileText,
      content:
        "Toda configuración realizada por un usuario —incluyendo claves API, accesos a bases de datos, permisos de lectura/escritura, integraciones con servicios externos y manejo de información sensible— queda bajo su total responsabilidad. GLYNNE no monitorea ni verifica la autenticidad, legalidad o propiedad de dichas credenciales."
    },
    {
      id: "legal-6",
      title: "Limitación de Responsabilidad por Daños",
      icon: FileText,
      content:
        "GLYNNE no se hace responsable de daños directos, indirectos, incidentales, emergentes, punitivos o derivados de la ejecución de sistemas autónomos, decisiones generadas por agentes, errores de integración, uso indebido de API externas, fallas en proveedores de terceros o configuraciones inadecuadas por parte del usuario."
    },
    {
      id: "legal-7",
      title: "Validaciones Técnicas No Garantizan Correctitud",
      icon: FileText,
      content:
        "La plataforma incorpora mecanismos de validación semiautomática para evitar fallos técnicos previsibles, pero estos no garantizan la corrección lógica, normativa ni ética de los sistemas construidos por el usuario. GLYNNE no se hace responsable por decisiones tomadas por agentes que operen sobre datos incorrectos, incompletos o manipulados."
    },
    {
      id: "legal-8",
      title: "Imprecisión de Modelos Generativos",
      icon: FileText,
      content:
        "El usuario reconoce que los modelos generativos utilizados en GLYNNE —independientemente del proveedor (OpenAI, Groq, modelos privados o cualquier otro)— operan bajo márgenes probabilísticos y pueden generar información imprecisa, inconsistente o contradictoria. GLYNNE no es responsable de la veracidad ni del impacto de dichas respuestas."
    },
    {
      id: "legal-9",
      title: "Terceros y Dependencias Externas",
      icon: FileText,
      content:
        "Cualquier integración con APIs externas (WhatsApp, Gmail, Supabase, Zupavis, plataformas de mensajería, servicios financieros u otros) queda sujeta a los términos y políticas de dichos proveedores. GLYNNE no controla ni puede garantizar la disponibilidad, continuidad, precisión o seguridad de servicios externos."
    },
    {
      id: "legal-10",
      title: "Cumplimiento Normativo en Envíos y Automatizaciones",
      icon: FileText,
      content:
        "Los usuarios que activen flujos automatizados que envíen mensajes masivos, correos electrónicos, notificaciones, reportes o manipulaciones de datos, reconocen y aceptan ser los únicos responsables del cumplimiento de normas de privacidad, anti-spam, protección de datos y leyes aplicables en su jurisdicción."
    },
    {
      id: "legal-11",
      title: "Procesamiento y Propiedad de Datos",
      icon: FileText,
      content:
        "GLYNNE no almacena, procesa ni redistribuye los datos de los usuarios con fines distintos a la operación interna del sistema. Todo contenido procesado por agentes o modelos generativos se considera propiedad exclusiva del usuario, quien asume totalmente la responsabilidad sobre su legalidad, origen y uso final."
    },
    {
      id: "legal-12",
      title: "Impacto Operativo y Pérdidas Económicas",
      icon: FileText,
      content:
        "La plataforma no es responsable por pérdidas económicas, alteraciones de inventario, fallos en procesos administrativos, errores en reportes generados por agentes, problemas en sistemas contables, o decisiones operativas que hayan sido automatizadas a partir de configuraciones del usuario."
    },
    {
      id: "legal-13",
      title: "Autonomía de los Agentes",
      icon: FileText,
      content:
        "El usuario reconoce que los agentes pueden tomar decisiones autónomas si así se configuran. Toda consecuencia operativa derivada de esa autonomía es responsabilidad exclusiva del usuario y no compromete a GLYNNE bajo ningún escenario."
    },
    {
      id: "legal-14",
      title: "Suspensión por Actividad Inusual",
      icon: FileText,
      content:
        "GLYNNE se reserva el derecho de suspender, limitar o restringir funciones cuando detecte actividades inusuales que puedan comprometer la estabilidad del sistema, pero dicha intervención no implica obligación de proteger los procesos particulares del usuario ni garantiza la prevención de daños."
    },
    {
      id: "legal-15",
      title: "Herramientas de Auditoría",
      icon: FileText,
      content:
        "La plataforma provee herramientas de auditoría y trazabilidad, pero estas existen únicamente como recursos informativos. GLYNNE no garantiza que dichos registros sean suficientes para resolver conflictos legales, técnicos o regulatorios."
    },
    {
      id: "legal-16",
      title: "Acuerdos B2B y Limitaciones",
      icon: FileText,
      content:
        "Las automatizaciones creadas por usuarios empresariales bajo planes B2B pueden estar sujetas a acuerdos adicionales, pero en ningún caso estos acuerdos transfieren a GLYNNE responsabilidades sobre decisiones operativas o sobre la manipulación de datos de terceros."
    },
    {
      id: "legal-17",
      title: "Derechos sobre Datos Procesados",
      icon: FileText,
      content:
        "GLYNNE no actúa como custodio legal de datos. El usuario debe garantizar que posee todos los derechos y permisos necesarios para procesar información dentro de la plataforma, incluyendo datos personales, financieros, comerciales o sensibles."
    },
    {
      id: "legal-18",
      title: "Accesos No Autorizados y Custodia de Cuentas",
      icon: FileText,
      content:
        "Cualquier daño derivado de accesos no autorizados a cuentas del usuario —incluyendo robo de contraseñas, usos indebidos de claves API o intervenciones internas del personal de la empresa usuaria— es responsabilidad exclusiva del titular de la cuenta."
    },
    {
      id: "legal-19",
      title: "Condición 'Tal Cual' y Disponibilidad",
      icon: FileText,
      content:
        "La infraestructura de GLYNNE se ofrece “tal cual” (“as is”) y “según disponibilidad” (“as available”). No se garantizan niveles específicos de uptime, performance, continuidad de servicios, ni ausencia total de errores."
    },
    {
      id: "legal-20",
      title: "Dependencias Open-Source",
      icon: FileText,
      content:
        "Los sistemas, librerías, integraciones y módulos open-source utilizados por GLYNNE mantienen sus propias licencias. La plataforma no puede garantizar el funcionamiento interno de sistemas de terceros incluidos o adaptados para la operación general."
    },
    {
      id: "legal-21",
      title: "Naturaleza de Herramientas de Desarrollo",
      icon: FileText,
      content:
        "Todas las herramientas de desarrollo ofrecidas mediante la plataforma —frameworks internos, entornos guiados, generadores automáticos, plantillas de agentes, y sistemas de recomendación— se consideran recursos opcionales y no implican responsabilidad compartida en el software final que construya el usuario."
    },
    {
      id: "legal-22",
      title: "Uso Legal de la Plataforma",
      icon: FileText,
      content:
        "El usuario se compromete a no utilizar GLYNNE para actividades ilegales, no reguladas o que vulneren derechos de terceros. Cualquier consecuencia derivada del incumplimiento de esta obligación recae exclusivamente en el usuario."
    },
    {
      id: "legal-23",
      title: "Interacción con Clientes Finales",
      icon: FileText,
      content:
        "En escenarios donde el usuario opere agentes que interactúen con clientes finales —por ejemplo, agentes de ventas o soporte— GLYNNE no se hace responsable de compromisos, comunicaciones, ofertas, precios, políticas comerciales o acuerdos que el agente genere o envíe."
    },
    {
      id: "legal-24",
      title: "Limitación sobre Fallos de IA",
      icon: FileText,
      content:
        "Las políticas de responsabilidad limitan expresamente cualquier tipo de reclamación basada en fallos derivados de acciones de inteligencia artificial, incluyendo errores de interpretación, inferencias incorrectas, malentendidos de contexto o desviaciones del comportamiento esperado."
    },
    {
      id: "legal-25",
      title: "Extensiones y Módulos Avanzados",
      icon: FileText,
      content:
        "Cualquier extensión de funcionalidades, como módulos empresariales, agentes avanzados, integraciones personalizadas o despliegues B2B, sigue este mismo marco de exención de responsabilidad y no constituye coautoría ni control operativo por parte de GLYNNE."
    },
    {
      id: "legal-26",
      title: "Aceptación Total de las Políticas",
      icon: FileText,
      content:
        "Al utilizar la plataforma, el usuario acepta plenamente estas políticas, reconociendo que GLYNNE actúa únicamente como proveedor de infraestructura y no como operador, garante o responsable de los resultados generados dentro del ecosistema digital creado por el usuario."
    }
  ];

  const toggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copiado al portapapeles");
    } catch (e) {
      alert("No se pudo copiar");
    }
  };

  const generarPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save("GLYNNE_documentacion.pdf");
  };

  return (
    <div ref={contentRef} className="max-w-6xl mt-10 mx-auto p-6">

      {/* ================================ */}
      {/* 🔥 SEO AGREGADO EXACTAMENTE COMO PEDISTE */}
      {/* ================================ */}
      {/* ================================ */}
      {/* 🔥 SEO AVANZADO */}
      {/* ================================ */}
      <Head>
        <title>GLYNNE AI – Documentación Legal y Arquitectura de Agentes IA</title>
        <meta
          name="description"
          content="GLYNNE AI ofrece agentes de inteligencia artificial sin código, automatización avanzada y arquitecturas escalables para empresas B2B en Colombia y Latinoamérica. Consulta documentación legal, lineamientos técnicos y alcances del servicio."
        />
        <meta
          name="keywords"
          content="GLYNNE, inteligencia artificial, agentes IA, automatización sin código, arquitectura de software, B2B, Colombia, Latinoamérica, LangChain, Next.js, integraciones API, automatización empresarial"
        />
        <meta name="author" content="GLYNNE Tech" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Geolocalización */}
        <meta name="geo.region" content="CO" />
        <meta name="geo.placename" content="Colombia" />
        <meta name="geo.position" content="4.5709;-74.2973" />
        <meta name="ICBM" content="4.5709, -74.2973" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="GLYNNE AI – Documentación Legal y Arquitectura de Agentes IA" />
        <meta
          property="og:description"
          content="Accede a la documentación oficial de GLYNNE, plataforma empresarial para agentes IA, automatización profunda y arquitectura integrable."
        />
        <meta property="og:image" content="https://glynneai.com/meta-banner.jpg" />
        <meta property="og:url" content="https://glynneai.com/politicas" />
        <meta property="og:site_name" content="GLYNNE AI" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GLYNNE AI – Documentación Legal y Arquitectura de Agentes IA" />
        <meta
          name="twitter:description"
          content="GLYNNE AI ofrece agentes de inteligencia artificial sin código y automatización empresarial avanzada para empresas B2B en Colombia y Latinoamérica."
        />
        <meta name="twitter:image" content="https://glynneai.com/meta-banner.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://glynneai.com/politicas" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Documentación y Políticas · GLYNNE AI",
              "url": "https://glynneai.com/politicas",
              "description": "Documentación oficial del servicio, alcances legales, lineamientos técnicos y aclaraciones sobre el funcionamiento de agentes IA en GLYNNE.",
              "publisher": {
                "@type": "Organization",
                "name": "GLYNNE AI",
                "url": "https://glynneai.com",
                "logo": "https://glynneai.com/favicon.ico",
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": "https://glynneai.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Políticas",
                    "item": "https://glynneai.com/politicas"
                  }
                ]
              }
            }),
          }}
        />
      </Head>

      {/* ================================ */}
      {/* TODO TU CÓDIGO ORIGINAL SIN CAMBIAR NADA */}
      {/* ================================ */}

      <Header />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SIDEBAR FIXED */}
        <aside
          className="
            hidden md:block
            md:col-span-1
            space-y-4
            w-[350px]
            fixed
            top-24
            left-0
            h-[calc(100vh-6rem)]
            overflow-y-auto
            pr-4
          "
        >
          <div className="p-4 rounded-2xl shadow-sm bg-white/60 backdrop-blur">
            <h3 className="font-semibold">Secciones</h3>

            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(`section-${s.id}`);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="w-full flex items-start justify-between p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <s.icon className="w-4 h-4" />
                      <span>{s.title}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => copyToClipboard("https://glynneai.com")}
                className="flex-1 py-2 px-3 rounded-lg border text-sm hover:bg-gray-50"
              >
                <Copy className="w-4 h-4 inline-block mr-2" /> Copiar URL
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur shadow-sm">
            <h4 className="text-xs uppercase text-gray-500">Estado</h4>
            <div className="mt-2 text-sm">Presets: Ventas, Finanzas, Operaciones</div>
            <div className="mt-3 text-xs text-gray-400">Entornos: dev • staging • prod</div>
          </div>
        </aside>

        {/* MAIN — TEXTO */}
        <main
          className="
            md:col-span-2
            md:ml-[280px]
            w-full
            prose prose-neutral max-w-none
          "
        >
          {sections.map((s) => (
            <section key={s.id} id={`section-${s.id}`} className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-2">{s.title}</h2>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{s.content}</p>

              <hr className="my-8 border-gray-300" />
            </section>
          ))}

          {/* DOCUMENTACIÓN EXTENDIDA */}
          <section className="mt-12">
            <h3 className="text-xl font-semibold">Documentación extendida</h3>
            <p className="mt-2 text-gray-700">
              Aquí puedes pegar artículos largos, contenido técnico o guías completas.
            </p>

            <div className="mt-4 flex gap-2">
              <button className="py-2 px-3 rounded-lg border" onClick={generarPDF}>
                Exportar PDF
              </button>

              <button className="py-2 px-3 rounded-lg border">Abrir Editor</button>
            </div>
          </section>
        </main>
      </div>

      <footer className="mt-6 text-sm text-gray-500 text-center">
        GLYNNE · Plataforma de agentes y automatización guiada por IA
      </footer>
    </div>
  );
}
