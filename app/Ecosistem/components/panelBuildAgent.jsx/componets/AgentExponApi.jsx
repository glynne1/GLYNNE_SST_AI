"use client";

import { useEffect, useState } from "react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";
import { KeyRound } from "lucide-react";

export default function AgentReadPanel() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return console.warn("Usuario no autenticado");

        const { data, error } = await supabase
          .from("auditorias")
          .select("id, user_config")
          .eq("user_id", user.id)
          .not("user_config", "is", null);

        if (error) throw error;

        const parsed = data
          .filter((row) => row.user_config?.api_key)
          .map((row) => ({
            id: row.id,
            name: row.user_config.agent_name || "Sin nombre",
            role: row.user_config.rol || "Sin rol",
            apiKey: row.user_config.api_key,
          }));

        setAgents(parsed);
      } catch (err) {
        console.error("Error cargando agentes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const hideKey = (key) => {
    if (!key || key.length < 8) return "••••••••";
    return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-4">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Modelos configurados
      </h2>

      {loading && (
        <p className="text-sm text-gray-400 italic">Cargando datos...</p>
      )}

      {!loading && agents.length === 0 && (
        <p className="text-sm text-gray-400 italic">No hay agentes registrados</p>
      )}

      <div className="flex flex-col gap-3">
        {agents.map((a) => (
          <div
            key={a.id}
            className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
          >
            {/* Información izquierda */}
            <div className="flex flex-col">
              <span className="text-md font-medium text-gray-900">
                {a.name}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">
                {a.role}
              </span>
            </div>

            {/* API KEY derecha */}
            <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
              <KeyRound size={14} />
              {hideKey(a.apiKey)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
