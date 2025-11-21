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
} from "lucide-react";

import Header from "./components/header";

export default function GLYNNEOverviewComponent() {
  const [openSection, setOpenSection] = useState(null);
  const contentRef = useRef(null);

  const sections = [
    {
      id: "vision",
      title: "Visión general",
      icon: Cpu,
      content:
        "GLYNNE es una plataforma diseñada para resolver uno de los desafíos más complejos de la nueva era tecnológica: construir, desplegar y operar agentes de inteligencia artificial capaces de integrarse profundamente en los procesos de una empresa, no como simples chatbots, sino como unidades funcionales dentro de una arquitectura de software viva. En un contexto donde las herramientas tradicionales ofrecen solo fragmentos —un LLM aquí, un webhook allá, un dashboard limitado— GLYNNE establece un modelo unificado donde el usuario puede conceptualizar, diseñar y ejecutar agentes inteligentes que automatizan tareas con autonomía creciente. La plataforma no solo permite crear agentes, sino que construye a su alrededor la ciudad digital donde estos agentes viven, trabajan y colaboran." },
    {
      id: "motor",
      title: "Motor generativo y modelos",
      icon: Layers,
      content:
        "La esencia de GLYNNE es que no obliga al usuario a saber cómo funciona una arquitectura de IA: la plataforma completa está guiada por un sistema de inteligencia artificial que acompaña, instruye y construye junto al usuario cada parte del proceso. El usuario nunca está solo frente a un panel estático; siempre interactúa con un sistema que entiende lo que está tratando de construir y anticipa las piezas que necesita. Esto elimina la fricción clásica en herramientas de automatización o frameworks de IA donde el usuario debe interpretar documentación compleja, entender conceptos avanzados o navegar un mar de opciones sin dirección.",
    },
    {
      id: "keyvault",
      title: "Key Vault — gestión de claves",
      icon: KeyRound,
      content:
      "En el corazón del sistema está el motor generativo, un servicio central de alto rendimiento que se conecta con modelos de lenguaje avanzados —desde proveedores como Groq, OpenAI o modelos privados del cliente— y los unifica en una interfaz coherente. Para el usuario final, esto significa que puede seleccionar qué modelo alimentará a cada agente, ajustar temperatuas, roles, comportamientos y parámetros sin tocar código. Para la plataforma, significa que cada mensaje, decisión o ejecución pasa por un pipeline robusto donde el modelo se controla como un componente más de la arquitectura.",
    },
    {
      id: "panel-agentes",
      title: "Panel de creación de agentes",
      icon: Cpu,
      content:
        "El acceso a claves, proveedores y credenciales está resuelto mediante un panel de desarrollo seguro que abstrae la complejidad de la gestión de entornos. En lugar de obligar al usuario a crear un archivo .env o a manipular configuraciones manuales, GLYNNE provee un Key Vault inteligente, donde cada clave —desde un token de WhatsApp Business hasta las credenciales de Gmail o el API Key de un LLM privado— puede añadirse con un solo click. Además, la plataforma valida automáticamente si una clave es válida, qué permisos tiene y cómo se integrará en los agentes configurados, evitando errores silenciosos o fallos inesperados."
    },
    {
      id: "framework",
      title: "Framework interno y arquitectura",
      icon: Layers,
      content:
        "Un pilar fundamental es el panel de creación de agentes, una herramienta visual y programática que permite diseñar agentes como componentes modulares. Cada agente tiene su propio contexto, propósito, modelo asignado, herramientas operativas, accesos a bases de datos y flujos de acción. La plataforma guía al usuario para definir preguntas clave: “¿Qué rol tendrá este agente?”, “¿Qué sistemas debe controlar?”, “¿Qué decisiones puede tomar?”, “¿Qué información necesita leer o escribir?”. GLYNNE estructura los agentes como nodos de una arquitectura mayor, facilitando la creación de pipelines complejos sin que el usuario tenga que pensar en lógica condicional o diagramas de flujo interminables."
       },
    {
      id: "entorno-dev",
      title: "Entorno guiado de desarrollo",
      icon: Database,
      content:
        "El framework interno de GLYNNE es uno de sus mayores diferenciadores. Inspirado en plataformas como n8n, Zapier o Actions de OpenAI, pero construido desde la lógica de una arquitectura empresarial escalable, este framework permite a los agentes interactuar entre sí como si fueran microservicios autónomos. Cada agente puede llamar a otro, delegar tareas, solicitar datos, validar estados o disparar eventos. El usuario construye sistemas; los agentes construyen operaciones. Este enfoque permite que las empresas no reciban un chatbot, sino un ecosistema completo donde los agentes colaboran como equipos digitales.",
    },
    {
      id: "integraciones",
      title: "Integraciones: WhatsApp, Gmail, APIs",
      icon: Database,
      content:
        "ILa plataforma incluye un entorno guiado de desarrollo, donde los usuarios pueden ver logs, eventos, métricas y comportamientos de sus agentes en tiempo real. GLYNNE no oculta la ejecución; la expone inteligentemente. Si un agente se detiene por falta de credenciales, el sistema no solo muestra el error: directamente sugiere qué clave falta, dónde añadirla y cómo corregir la configuración. Si un agente responde de forma inconsistente, la plataforma ofrece ajustes automáticos del prompt, del rol o del modelo para estabilizarlo. Esto convierte el panel en una herramienta operativa, no solo administrativa.",
    },
    {
      id: "auditoria",
      title: "Auditoría inteligente",
      icon: Layers,
      content:
        "Otra pieza crucial es la integración con datos estructurados. GLYNNE permite conectar bases de datos como Supabase, Zupavis u otras fuentes de información. El usuario puede definir qué tablas o colecciones serán visibles para un agente, qué campos pueden leerse o modificarse, y cómo se utiliza esa información en conversaciones. Un agente no se limita a responder: puede buscar productos, actualizar stock, enviar reportes, generar correos automáticos, revisar historiales o construir análisis basados en datos reales.",
    },
    {
      id: "gly-dev",
      title: "GLY-DEV",
      icon: Cpu,
      content:
        "El sistema de auditoría inteligente añade una capa consultiva a la plataforma. Antes de crear flujos, automatizaciones o agentes, GLYNNE guía al usuario mediante un diagnóstico conversacional donde evalúa la empresa, su industria, sus necesidades y sus procesos críticos. Esta auditoría se convierte en un JSON estructurado que luego alimenta al segundo agente técnico —GLY-DEV— encargado de generar una propuesta de arquitectura. Esto no es un simple prompt; es un proceso donde la plataforma actúa como consultora experta en automatización empresarial.El sistema de auditoría inteligente añade una capa consultiva a la plataforma. Antes de crear flujos, automatizaciones o agentes, GLYNNE guía al usuario mediante un diagnóstico conversacional donde evalúa la empresa, su industria, sus necesidades y sus procesos críticos. Esta auditoría se convierte en un JSON estructurado que luego alimenta al segundo agente técnico —GLY-DEV— encargado de generar una propuesta de arquitectura. Esto no es un simple prompt; es un proceso donde la plataforma actúa como consultora experta en automatización empresarial.",
    },
    {
      id: "no-code",
      title: "Flujos no-code",
      icon: Layers,
      content:
        "El módulo GLY-DEV transforma la información recopilada en un documento técnico que explica cómo debería construirse el sistema: qué agentes se necesitan, qué flujos deben implementarse, qué bases de datos se requieren, qué proveedores son ideales y qué recomendaciones estratégicas deben seguirse. Esta visión no está centrada en tecnologías específicas, sino en cómo crear soluciones completas y acoplables a los flujos reales de cada empresa. De esta manera, cada cliente obtiene una arquitectura personalizada lista para ejecutarse.",
    },
    {
      id: "datos",
      title: "Conectividad con bases de datos",
      icon: Database,
      content:
        "La plataforma incorpora un panel para la gestión de productos, stock y logística, permitiendo que un agente mantenga sincronizados los datos, actualice inventarios y genere alertas inteligentes. Las empresas no solo automatizan comunicaciones; automatizan operaciones reales. El agente se convierte en un miembro del equipo con acceso controlado y validado a los sistemas empresariales.",
    },
    {
      id: "productos",
      title: "Gestión de productos y stock",
      icon: Database,
      content:
        "Uno de los avances más importantes es la capacidad de GLYNNE para construir flujos no-code muy similares a n8n, pero impulsados por IA. El usuario puede conectar nodos, asignar acciones y definir condiciones sin entrar en expresiones lógicas complejas. Cada nodo representa un agente, una herramienta, un disparador o un destino. Y, si el usuario no sabe cómo construir un flujo, la plataforma lo construye automáticamente a partir de la auditoría y la intención del usuario.",
    },
    {
      id: "seguridad",
      title: "Seguridad y trazabilidad",
      icon: KeyRound,
      content:
        "El diseño del frontend de GLYNNE es una extensión natural de la filosofía del sistema: simple, directo, guiado, hermoso y estructurado en secciones animadas con framer-motion que permiten visualizar conceptos complejos de forma clara. Los tablers técnicos, la arquitectura visual y las interfaces de interacción están diseñadas para que cualquier usuario —desde un gerente hasta un desarrollador— pueda entender el funcionamiento del sistema sin perderse en detalles irrelevantes.",
    },
    {
      id: "observability",
      title: "Observabilidad y métricas",
      icon: Cpu,
      content:
        "La seguridad es otro pilar esencial. Cada acción está firmada digitalmente, cada clave está encriptada, cada operación de agente es auditada y cada flujo tiene un registro completo que puede ser revisado y exportado. Las empresas pueden confiar en que sus agentes no solo son capaces, sino también seguros, trazables y totalmente controlables.",
    },
    {
      id: "ux",
      title: "Diseño guiado por IA",
      icon: Layers,
      content:
        "GLYNNE no es un producto; es un ecosistema. No es una herramienta; es un marco operativo. No es un chatbot; es una infraestructura completa para construir automatizaciones inteligentes que acompañan a las empresas en su transformación digital. La plataforma está construida para que cada cliente pueda escalar, evolucionar y adaptar sus agentes sin reescribir su arquitectura o migrar entre herramientas dispares.",
    },
    {
      id: "escala",
      title: "Escalabilidad y despliegue",
      icon: Database,
      content:
        "El futuro de GLYNNE está orientado hacia agentes aún más autónomos, capaces de leer, analizar y ejecutar estrategias empresariales completas. La visión es que cada empresa tenga su propio equipo digital de especialistas: agentes de ventas, de análisis, de operaciones, de soporte, de gestión financiera, todos trabajando en conjunto como un sistema integrado. Y, lo más importante, sin que el usuario tenga que convertirse en programador.",
    },
    {
      id: "casos",
      title: "Casos de uso",
      icon: Cpu,
      content:
        "La plataforma está diseñada para ser el estándar de la automatización empresarial moderna, donde las empresas no compran software: crean inteligencia operativa. GLYNNE redefine el concepto de automatización al convertirlo en un proceso fluido, guiado y profundamente conectado con las necesidades reales del negocio. Lo que antes requería consultores, integradores, programadores y meses de trabajo ahora puede construirse en minutos con una interfaz que entiende, predice y colabora.",
    },
    {
      id: "roadmap",
      title: "Roadmap",
      icon: Layers,
      content:
        "Cada parte del sistema está pensada para acompañar la ambición del usuario. GLYNNE no es para proyectos pequeños; es para construir titanes tecnológicos. Es para empresas que necesitan pensar en escalabilidad, integraciones, arquitecturas flexibles, modularidad extrema y agentes poderosos que se comportan como microservicios inteligentes. Es una plataforma hecha para quienes quieren impactar.",
    },
    {
      id: "cta",
      title: "Cómo empezar",
      icon: Copy,
      content:
        "Y finalmente, GLYNNE existe para resolver el problema que nadie estaba resolviendo de manera completa: permitir que una empresa construya su propia ciudad digital donde cada agente es un ciudadano especializado, cada dato es una calle accesible y cada proceso es una vía optimizada para el movimiento inteligente. La arquitectura es la ciudad; la IA son los trabajadores; GLYNNE es la mano que une todo.",
    },
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
            <div className="mt-2 text-sm">
              Presets: Ventas, Finanzas, Operaciones
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Entornos: dev • staging • prod
            </div>
          </div>
        </aside>
  
        {/* MAIN — TEXTO PLANO SIN CONTENEDORES */}
        <main
          className="
            md:col-span-2
            md:ml-[280px]
            w-full
            prose prose-neutral max-w-none
          "
        >
          {sections.map((s) => (
            <section
              key={s.id}
              id={`section-${s.id}`}
              className="mb-12 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-2">{s.title}</h2>
  
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {s.content}
              </p>
  
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
              <button
                className="py-2 px-3 rounded-lg border"
                onClick={generarPDF}
              >
                Exportar PDF
              </button>
  
              <button className="py-2 px-3 rounded-lg border">
                Abrir Editor
              </button>
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