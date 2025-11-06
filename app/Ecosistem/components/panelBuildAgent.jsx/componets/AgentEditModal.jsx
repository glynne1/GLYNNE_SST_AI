"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentForm({ agentData, onSave, onCancel }) {
  const [formData, setFormData] = useState(agentData || {});
  const [charCounts, setCharCounts] = useState({});
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // 🧠 Actualiza el formulario si cambia el agente seleccionado
  useEffect(() => {
    if (agentData) {
      setFormData(agentData);
      const initialCounts = {};
      Object.keys(agentData).forEach((key) => {
        initialCounts[key] = agentData[key]?.length || 0;
      });
      setCharCounts(initialCounts);
    }
  }, [agentData]);

  // 📦 Control de cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCharCounts((prev) => ({ ...prev, [name]: value.length }));
  };

  // 💾 Guardar cambios en Supabase
  const handleSubmit = async () => {
    setSaving(true);
    setStatus("");

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      // 🔍 Obtener el registro correspondiente del usuario
      const { data: userRows, error: fetchError } = await supabase
        .from("auditorias")
        .select("id, user_config")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (fetchError) throw fetchError;
      if (!userRows || userRows.length === 0)
        throw new Error("No se encontró ningún registro para este usuario.");

      // 🔹 Buscar el registro que contiene el agente a editar
      const record = userRows.find((row) => {
        const config = row.user_config;
        return (
          config?.agent_name === agentData.agent_name &&
          config?.rol === agentData.rol
        );
      });

      if (!record) throw new Error("No se encontró el agente en la base de datos.");

      // 🧱 Actualizar ese campo user_config
      const { error: updateError } = await supabase
        .from("auditorias")
        .update({ user_config: formData })
        .eq("id", record.id);

      if (updateError) throw updateError;

      setStatus("✅ Cambios guardados exitosamente");
      if (onSave) onSave(formData);
    } catch (err) {
      console.error("Error al guardar:", err);
      setStatus("❌ Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="p-8 w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Información del Agente
      </h3>

      {formData && Object.keys(formData).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData)
            // 🚫 Excluir campos que no quieres mostrar
            .filter((key) => key !== "model")
            .map((key) => (
              <div
                key={key}
                className="bg-white p-4 border border-gray-200 shadow-sm rounded-xl relative"
              >
                <label className="text-xs font-semibold text-gray-700 mb-2 block capitalize">
                  {key.replace(/_/g, " ")}
                </label>

                <div className="relative">
                  <input
                    type={
                      key === "api_key"
                        ? showApiKey
                          ? "text"
                          : "password"
                        : "text"
                    }
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    placeholder={`Editar ${key.replace(/_/g, " ")}`}
                    className="w-full p-3 text-xs bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-800 rounded-lg pr-10"
                  />

                  {key === "api_key" && (
                    <button
                      type="button"
                      onClick={() => setShowApiKey((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>

                <div className="text-right mt-1 text-xs">
                  <span
                    className={
                      (charCounts[key] || 0) > 700
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  >
                    {charCounts[key] || 0}/700
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center">
          No se encontró información del agente.
        </p>
      )}

      {/* 🔹 Estado y botones */}
      <div className="flex justify-end mt-6 space-x-3 items-center">
        {status && (
          <span
            className={`text-xs ${
              status.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {status}
          </span>
        )}

        <button
          onClick={onCancel}
          className="px-5 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          disabled={saving}
        >
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className={`px-5 py-2 text-sm rounded-lg transition ${
            saving
              ? "bg-gray-400 text-white"
              : "bg-blue-600 text-white hover:bg-black"
          }`}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </motion.div>
  );
}
