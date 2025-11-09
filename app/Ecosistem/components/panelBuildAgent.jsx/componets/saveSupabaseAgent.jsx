"use client";

import { useState } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

// ✅ Guardar la configuración del agente SIN LÍMITE
export async function saveUserAgentConfig(configData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Usuario no autenticado");

  // ❌ Se elimina el bloqueo de cantidad de agentes

  const agentToSave = {
    ...configData,
    conversation: [],
  };

  const { error: insertError } = await supabase
    .from("auditorias")
    .insert([
      {
        user_id: user.id,
        user_config: agentToSave,
      },
    ]);

  if (insertError) throw insertError;
}

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

      if (err.message.includes("no autenticado")) {
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
