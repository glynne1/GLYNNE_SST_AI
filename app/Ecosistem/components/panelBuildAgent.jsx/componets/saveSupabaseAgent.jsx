"use client";

import { useState } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

// ✅ Exportamos la función para reusarla
export async function saveUserAgentConfig(configData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Usuario no autenticado");

  const { error } = await supabase
    .from("auditorias")
    .insert([
      {
        user_id: user.id,
        user_config: configData,
      },
    ]);

  if (error) throw error;
}

// ✅ Componente sigue igual
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
      console.error(err);
      setStatus("❌ Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900"
      >
        {saving ? "Guardando..." : "💾 Guardar Configuración de Agente"}
      </button>

      {status && (
        <p className="text-xs text-gray-700">
          {status}
        </p>
      )}
    </div>
  );
}
