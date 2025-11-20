'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from "react";

const techTools = [
    /* ===========================
       🟦 BACKEND FRAMEWORKS
       =========================== */
    {
      name: "FastAPI",
      icon: "/iconosGooglS/fastapi-svgrepo-com.svg",
      desc: "Framework moderno y de alto rendimiento para crear APIs rápidas con Python.",
    },
    {
      name: "NestJS",
      icon: "/iconosGooglS/icons8-nestjs.svg",
      desc: "Framework backend modular construido en Node.js.",
    },
    {
      name: ".NET Framework",
      icon: "/iconosGooglS/icons8-.net-framework.svg",
      desc: "Plataforma robusta para aplicaciones empresariales.",
    },
    {
      name: "Laravel",
      icon: "/iconosGooglS/laravel-svgrepo-com.svg",
      desc: "Framework PHP con arquitectura limpia.",
    },
    {
      name: "Django",
      icon: "/iconosGooglS/icons8-django.svg",
      desc: "Framework backend seguro y escalable en Python.",
    },

    /* ===========================
       🟩 LENGUAJES DE PROGRAMACIÓN
       =========================== */
    {
      name: "Node.js",
      icon: "/iconosGooglS/icons8-nodejs.svg",
      desc: "Entorno de ejecución para JavaScript del lado del servidor.",
    },
    {
      name: "Java",
      icon: "/iconosGooglS/icons8-java.svg",
      desc: "Lenguaje maduro para aplicaciones robustas.",
    },

    /* ===========================
       🟧 FRONTEND FRAMEWORKS
       =========================== */
    {
      name: "Angular",
      icon: "/iconosGooglS/icons8-angular.svg",
      desc: "Framework de frontend estructurado para apps grandes con TypeScript.",
    },
    {
      name: "Next.js",
      icon: "/iconosGooglS/icons8-nextjs.svg",
      desc: "Framework React optimizado para producción.",
    },
    {
      name: "Vue.js",
      icon: "/iconosGooglS/icons8-vue-js.svg",
      desc: "Framework progresivo y rápido.",
    },

    /* ===========================
       🟪 CLOUD Y DEVOPS
       =========================== */
    {
      name: "AWS",
      icon: "/iconosGooglS/icons8-aws.svg",
      desc: "Servicios cloud escalables y robustos.",
    },
    {
      name: "AWS CloudFront",
      icon: "/iconosGooglS/icons8-aws-cloudfront.svg",
    },
    {
      name: "Google Cloud",
      icon: "/iconosGooglS/icons8-google-cloud.svg",
      desc: "Infraestructura cloud poderosa y flexible.",
    },
    {
      name: "Azure Data Pipeline",
      icon: "/iconosGooglS/icons8-azure-data-pipeline.svg",
      desc: "Pipelines de datos para automatizar procesos ETL.",
    },
    {
      name: "Netlify",
      icon: "/iconosGooglS/netlify-svgrepo-com.svg",
      desc: "Hosting moderno para sitios estáticos.",
    },
    {
      name: "Vercel",
      icon: "/iconosGooglS/vercel-svgrepo-com.svg",
      desc: "Hosting rápido y optimizado para proyectos de frontend.",
    },

    /* ===========================
       🟫 DATA, ANALYTICS & TOOLS
       =========================== */
    {
      name: "Jupyter",
      icon: "/iconosGooglS/icons8-jupyter.svg",
      desc: "Entornos interactivos para análisis y prototipos.",
    },
    {
      name: "Google Colab",
      icon: "/iconosGooglS/icons8-google-colab.svg",
      desc: "Entorno cloud para ejecutar Python y ML.",
    },
    {
      name: "Supabase",
      icon: "/iconosGooglS/icons8-supabase.svg",
      desc: "Backend instantáneo con base de datos Postgres.",
    },

    /* ===========================
       🟨 CONTROL DE VERSIONES
       =========================== */
    {
      name: "GitHub",
      icon: "/iconosGooglS/icons8-github.svg",
      desc: "Control de versiones profesional y CI/CD.",
    },
];

export default function AppCards() {

  return (
    <div
      className="
        w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md 
        h-[90vh] flex flex-col
      "
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Herramientas de Desarrollo
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Estas son las tecnologías que pueden integrarse con nuestro motor <strong>GLYNNE Dynamic Cognitive System</strong>.
      </p>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

          {techTools.map((app) => (
            <motion.div
              key={app.name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.25 }}
              className="
                flex flex-col items-center justify-start 
                bg-white/80 backdrop-blur-md 
                rounded-2xl 
                p-6 
                shadow-md hover:shadow-xl 
                border border-gray-200 
                hover:border-gray-300 
                transition-all duration-300 
                cursor-default
                min-h-[110px]
              "
            >
              <div className="mb-3">
                <Image src={app.icon} alt={app.name} width={48} height={48} />
              </div>

              <h3 className="font-semibold text-gray-800 text-center text-xs tracking-wide">
                {app.name}
              </h3>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
