"use client";

import React, { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

const PricingMatrix = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      if (user) {
        setUserInfo({
          name: user.user_metadata.full_name || "Usuario",
          email: user.email,
          phone: user.user_metadata.phone || "No registrado",
          ...user.user_metadata,
        });
      }
    }
    loadUser();
  }, []);

  const phone = "+573123455328";

  const handleSendMessage = (planId) => {
    if (!userInfo) {
      alert("Debes iniciar sesión para continuar.");
      return;
    }

    let planText = "";

    if (planId === "PERSONAL")
      planText = `Estoy interesado en el plan *Personal / Agente Solitario*.`;
    if (planId === "PRO")
      planText = `Quiero información sobre el plan *Pro / Equipo de Élite*.`;
    if (planId === "AGENCY")
      planText = `Estoy interesado en el plan *Agency / Agencia Digital*.`;
    if (planId === "ENTERPRISE")
      planText = `Necesito información sobre el plan *Enterprise AI Suite*.`;

    const finalMessage = `
Hola, soy *${userInfo.name}*.
Correo: *${userInfo.email}*
Teléfono: *${userInfo.phone}*

${planText}

Quiero hablar con un asesor.
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  };

  const plans = [
    {
      id: "PERSONAL",
      name: "Agente Solitario",
      badge: "Para Emprendedores",
      price: 0,
      unit: "/mes",
      description: "Tu primer agente IA trabajando 24/7 para tí",
      cta: "Comenzar Gratis",
      featured: false,
      features: {
        agents: "Agente Activo",
        messages: "Hasta 500 conversaciones/mes",
        models: "Modelo Llama 3 70B incluído",
        integrations: "Integración a tu sitio web",
        support: "Soporte por email (48h)",
        extras: [
          "Exportación JSON ilimitada",
          "60 plantillas pre-entrenadas",
          "Playground de pruebas",
          "Dashboard básico",
        ],
      },
      limits: "Ideal para landing pages y emprendedores",
    },
    {
      id: "PRO",
      name: "Equipe de Élite",
      badge: "Más Popular",
      price: 150,
      unit: "/mes",
      description: "Escalable, potente, listo para producción",
      cta: "Probar",
      featured: true,
      features: {
        agents: "Agentes Concurrentes",
        messages: "Hasta 5,000 conversaciones/mes",
        models: "Llama (elige)",
        integrations: "API + Webhooks + CRM (HubSpot, Salesforce)",
        support: "Soporte prioridad (4h) + Chat en vivo",
        extras: [
          "Auto-scaling inteligente",
          "Analytics avanzado",
          "Base de datos dedicada",
          "Backup automático",
          "White-label básico",
          "2 horas de consultoría/mes",
        ],
      },
      limits: "Soporta hasta 300 usuarios simultáneos",
    },
    {
      id: "AGENCY",
      name: "Agencia Digital",
      badge: "Para Equipos",
      price: "Custom",
      unit: "/mes",
      description: "Multi-cliente, multi-agente, total control",
      cta: "Agendar Demo",
      featured: false,
      features: {
        agents: "Agentes Ilimitados",
        messages: "50,000 conversaciones/mes",
        models: "Todos los modelos + Fine-tuning",
        integrations: "Todo + Redes Sociales (Meta, WhatsApp) + Slack",
        support: "Soporte VIP (1h) + WhatsApp directo + Ingeniero dedicado",
        extras: [
          "Multi-tenant por cliente",
          "SAML/SSO",
          "SOC2 Compliance",
          "99.9% SLA",
          "On-premise opcional",
          "10 horas de consultoría/mes",
          "Training para tu equipo",
        ],
      },
      limits: "Sin límites técnicos. Facturación por éxito disponible",
    },
    {
      id: "ENTERPRISE",
      name: "Enterprise AI Suite",
      badge: "Custom Everything",
      price: "Custom",
      unit: "",
      description: "La IA se adapta a tu empresa, no al revés",
      cta: "Hablar con Ventas",
      featured: false,
      features: {
        agents: "Agentes hiper-especializados",

        models: "Modelos privados + Infraestructura dedicada",
        integrations: "ERP, SAP, sistemas legado + cualquier API",
        support: "Squad dedicado 24/7 + On-site si es necesario",
        extras: [
          "Desarrollo custom de agentes",
          "Integración con datos propietarios",
          "Compliance legal (HIPAA, GDPR, ISO)",
          "Training continuo",
          "Revenue share opcional",
          "Partnership estratégico",
        ],
      },
      limits: "Precio basado en valor generado, no en uso",
    },
  ];

  return (
    <div className="w-full h-[90vh] p-6 bg-white rounded-2xl border border-gray-300 shadow-md flex flex-col overflow-y-auto">

      {/* 🔹 TITULO Y DESCRIPCION */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mb-2">
          Potencia tu Negocio con Agentes IA
        </h1>
        <p className="text-gray-600 text-sm">
          Desarrolla tus agentes GRATIS. Paga solo cuando estés listo para escalar y dejarles el trabajo pesado a las máquinas.
        </p>
      </div>

      {/* 🔹 GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl ${
              plan.featured
                ? "ring-2 ring-blue-600 shadow-xl shadow-blue-300/40 scale-[1.04] bg-white"
                : "bg-white border border-neutral-200 hover:border-black/20 hover:shadow-lg"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-neutral-900">{plan.name}</h3>
              <p className="text-neutral-600 text-sm">{plan.description}</p>
            </div>

            <div className="text-center mb-6">
              {typeof plan.price === "number" ? (
                <div>
                  <span className="text-4xl font-bold text-neutral-900">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-neutral-500">{plan.unit}</span>
                </div>
              ) : (
                <div className="text-3xl font-bold text-neutral-900">Custom</div>
              )}
            </div>

            <button
              onClick={() => handleSendMessage(plan.id)}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                plan.featured
                  ? "bg-black text-white hover:bg-neutral-800 shadow-md"
                  : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300"
              }`}
            >
              {plan.cta}
            </button>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-neutral-900 font-semibold text-sm mb-2">
                  {plan.features.agents}
                </div>
                <div className="text-neutral-600 text-sm">
                  {plan.features.messages}
                </div>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2 text-neutral-800">
                  <span className="text-blue-600 mt-1">✓</span>
                  {plan.features.models}
                </li>
                <li className="flex items-start gap-2 text-neutral-800">
                  <span className="text-blue-600 mt-1">✓</span>
                  {plan.features.integrations}
                </li>
                <li className="flex items-start gap-2 text-neutral-800">
                  <span className="text-blue-600 mt-1">✓</span>
                  {plan.features.support}
                </li>
              </ul>

              <div className="pt-4 border-t border-neutral-200">
                <div className="text-neutral-500 text-xs mb-2">
                  Todo incluye:
                </div>
                <ul className="space-y-1">
                  {plan.features.extras.map((extra, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-neutral-600 text-xs"
                    >
                      <span className="text-blue-600 mt-0.5">✓</span>
                      {extra}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <div className="text-neutral-500 text-xs italic">{plan.limits}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PricingMatrix;
