"use client";

import { useState } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

/**
 * ✅ Actualiza parcialmente la configuración de un agente en Supabase
 * Permite modificar cualquier parte del JSON `user_config` sin crear un nuevo agente
 */
export async function updateUserAgentConfig(agentId, partialConfig) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Usuario no autenticado");

  // 1️⃣ Obtener configuración actual del agente
  const { data, error: fetchError } = await supabase
    .from("auditorias")
    .select("user_config")
    .eq("id", agentId)
    .eq("user_id", user.id)
    .single();

  if (fetchError) throw new Error("Error al obtener configuración existente");

  const currentConfig = data?.user_config || {};

  // 2️⃣ Combinar con nuevos datos
  const updatedConfig = {
    ...currentConfig,
    ...partialConfig,
  };

  // 3️⃣ Actualizar en Supabase
  const { error: updateError } = await supabase
    .from("auditorias")
    .update({ user_config: updatedConfig })
    .eq("id", agentId)
    .eq("user_id", user.id);

  if (updateError) throw new Error("Error al actualizar configuración del agente");
}

/**
 * ✅ Botón reutilizable para actualizar un agente existente
 * Puedes pasarle el ID del agente y los campos a actualizar
 */
export default function UpdateAgentConfigButton({ agentId, partialConfig }) {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setStatus("");

      await updateUserAgentConfig(agentId, partialConfig);
      setStatus("✅ Agente actualizado correctamente 🎯");
    } catch (err) {
      console.error(err.message);

      if (err.message.includes("no autenticado")) {
        setStatus("❌ Debes iniciar sesión para actualizar agentes.");
      } else if (err.message.includes("obtener configuración")) {
        setStatus("⚠️ No se encontró el agente especificado.");
      } else {
        setStatus("❌ Error al actualizar el agente.");
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={handleUpdate}
        disabled={updating}
        className={`px-4 py-2 rounded-lg font-semibold text-white ${
          updating ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {updating ? "Actualizando..." : "💾 Actualizar Configuración de Agente"}
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
