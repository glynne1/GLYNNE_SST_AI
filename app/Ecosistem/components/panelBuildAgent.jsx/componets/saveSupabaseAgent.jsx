"use client";

import { useState } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

// ✅ Función para guardar la configuración del agente
export async function saveUserAgentConfig(configData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Usuario no autenticado");

  // 🔎 Verificamos cuántos agentes tiene el usuario
  const { data: existingAgents, error: fetchError } = await supabase
    .from("auditorias")
    .select("id")
    .eq("user_id", user.id);

  if (fetchError) throw new Error("Error al verificar agentes existentes");

  // 🚫 Máximo 6 agentes
  if (existingAgents && existingAgents.length >= 6) {
    throw new Error("Has alcanzado el límite máximo de 6 agentes.");
  }

  // ✅ FORZAMOS la conversación desde la creación
  const agentToSave = {
    ...configData,
    conversation: [], // 👈 Aseguramos que siempre exista el array
  };

  // 🧩 Guardamos el agente con la conversación vacía incluida
  const { error: insertError } = await supabase
    .from("auditorias")
    .insert([
      {
        user_id: user.id,
        user_config: {
          ...agentToSave,
          conversation: [], // 👈 Se forza también dentro del JSON a guardar
        },
      },
    ]);

  if (insertError) throw insertError;
}

// ✅ Componente del botón
export default function SaveAgentConfigButton({ configData }) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      setStatus("");

      await saveUserAgentConfig(configData);
      setStatus("✅ Configuración guardada exitosamente 🎯");

    } catch (err) {
      console.error(err.message);

      if (err.message.includes("límite máximo")) {
        setStatus("⚠️ Solo puedes crear hasta 6 agentes.");
      } else if (err.message.includes("no autenticado")) {
        setStatus("❌ Debes iniciar sesión para guardar agentes.");
      } else {
        setStatus("❌ Error al guardar el agente.");
      }

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={handleSave}
        disabled={saving}
        className={`px-4 py-2 rounded-lg font-semibold text-white ${
          saving ? "bg-gray-600" : "bg-black hover:bg-gray-900"
        }`}
      >
        {saving ? "Guardando..." : "💾 Guardar Configuración de Agente"}
      </button>

      {status && (
        <p
          className={`text-sm ${
            status.startsWith("✅")
              ? "text-green-600"
              : status.startsWith("⚠️")
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
