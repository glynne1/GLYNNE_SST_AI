"use client";

import React, { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function PricingCards({ onClose }) {
  const [billing, setBilling] = useState("monthly");
  const [userInfo, setUserInfo] = useState(null);

  // TRAER USUARIO AL MONTAR EL COMPONENTE
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();

      if (user) {
        setUserInfo({
          name: user.user_metadata.full_name || "Usuario",
          email: user.email,
          phone: user.user_metadata.phone || "No registrado",
          ...user.user_metadata
        });
      }
    }
    loadUser();
  }, []);

  // FUNCIÓN PARA ARMAR Y ENVIAR EL MENSAJE
  const handleSendMessage = async (plan) => {
    if (!userInfo) {
      alert("Debes iniciar sesión para continuar.");
      return;
    }

    const phone = "TU_NUMERO"; // <-- CAMBIAR A TU NÚMERO
    let planText = "";

    if (plan === "plan0") {
      planText = `Estoy interesado en el *Plan 0* y quiero empezar a crear mis primeros agentes IA.`;
    }

    if (plan === "b2b") {
      planText = `Quiero información sobre el *Plan B2B* para activar automatizaciones 24/7 con integraciones reales.`;
    }

    if (plan === "full") {
      planText = `Necesito información sobre el plan *Full a la Medida*. Quiero una arquitectura completa integrada a mis sistemas internos.`;
    }

    const finalMessage = `
Hola, soy *${userInfo.name}*.
Mi correo es: *${userInfo.email}*.
Teléfono: *${userInfo.phone}*.

${planText}

Quiero hablar con un asesor.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex flex-col items-center py-16 bg-[#fff]">

      {/* TITULO */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#1c1c38] mb-2">
        Planes diseñados para escalar tu empresa con IA
      </h1>
      <p className="text-[#70707d] mb-10 text-sm">
        Sin contratos. Sin costos ocultos. Configura y escala cuando quieras.
      </p>

      {/* SWITCH */}
      <div className="flex items-center bg-white shadow-sm p-1 rounded-full text-xs mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            billing === "monthly" ? "bg-[#4c6fff] text-white shadow-sm" : "text-[#6f6f89]"
          }`}
        >
          MENSUAL
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            billing === "yearly" ? "bg-[#4c6fff] text-white shadow-sm" : "text-[#6f6f89]"
          }`}
        >
          ANUAL
        </button>
      </div>

      {/* CARDS */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 justify-center">

        {/* PLAN 0 */}
        <div className="bg-white shadow-lg rounded-3xl p-10 w-[320px] text-left">
          <h2 className="text-3xl font-bold text-[#1c1c38] mb-1">Plan 0</h2>
          <span className="text-[#70707d] text-xs">(Totalmente gratuito)</span>

          <p className="text-[#70707d] mt-1 mb-4 text-xs leading-relaxed">
            Ideal para experimentar con la plataforma y empezar a construir tus agentes inteligentes.
          </p>

          <ul className="space-y-2 text-[#70707d] mb-6 text-xs">
            <li>✔ Crear, editar e interactuar con agentes IA</li>
            <li>✔ Exportación de agentes a proyectos propios</li>
            <li>✔ Integración básica vía API</li>
            <li>✔ Sin límite de pruebas</li>
          </ul>

          <button
            className="w-full py-2 rounded-full bg-[#eef0ff] text-[#4c6fff] font-semibold text-sm hover:bg-[#e0e3ff] transition"
            onClick={() => handleSendMessage("plan0")}
          >
            Empezar Gratis
          </button>
        </div>

        {/* B2B */}
        <div className="bg-gradient-to-b from-[#6788ff] to-[#4c6fff] text-white shadow-2xl rounded-3xl p-10 w-[320px] scale-105 relative text-left">

          <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
            MÁS UTILIZADO
          </div>

          <h2 className="text-3xl font-bold mb-1">B2B</h2>

          <p className="text-white/90 mt-1 mb-4 text-xs leading-relaxed">
            Perfecto para empresas que desean activar automatizaciones completas operando 24/7.
          </p>

          <ul className="space-y-2 mb-6 text-white/90 text-xs">
            <li>✔ Integración con ecosistemas sociales</li>
            <li>✔ Conexión con Google Cloud Services</li>
            <li>✔ Integración con ecosistemas propios vía API</li>
            <li>✔ IA operativa para ventas, soporte y automatización</li>
            <li>✔ Dashboards de métricas empresariales</li>
          </ul>

          <button
            className="w-full py-2 rounded-full bg-white text-[#4c6fff] font-semibold text-sm hover:bg-gray-100 transition"
            onClick={() => handleSendMessage("b2b")}
          >
            Activar B2B
          </button>
        </div>

        {/* FULL */}
        <div className="bg-white shadow-lg rounded-3xl p-10 w-[320px] text-left">
          <h2 className="text-3xl font-bold text-[#1c1c38] mb-1">Full a la Medida</h2>

          <p className="text-[#70707d] mt-1 mb-4 text-xs leading-relaxed">
            Para compañías que requieren una arquitectura completa construida desde cero para su negocio.
          </p>

          <ul className="space-y-2 text-[#70707d] mb-6 text-xs">
            <li>✔ Arquitectura empresarial a escala</li>
            <li>✔ Sistemas de automatización avanzados</li>
            <li>✔ Integración profunda con ERP, CRM y APIs internas</li>
            <li>✔ IA especializada para ventas y soporte</li>
            <li>✔ Acompañamiento técnico y optimización continua</li>
          </ul>

          <button
            className="w-full py-2 rounded-full bg-[#eef0ff] text-[#4c6fff] font-semibold text-sm hover:bg-[#e0e3ff] transition"
            onClick={() => handleSendMessage("full")}
          >
            Solicitar Proyecto
          </button>
        </div>

      </div>
    </div>
  );
}
