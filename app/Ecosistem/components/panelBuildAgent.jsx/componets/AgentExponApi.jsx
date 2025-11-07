"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Activity } from "lucide-react";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentPanel() {
  const [agents, setAgents] = useState([]);
  const [showKey, setShowKey] = useState({});
  const [loading, setLoading] = useState(true);

  const maskApiKey = (key) => {
    if (!key) return "••••••";
    return key.slice(0, 4) + "••••••";
  };

  const toggleKey = (index) => {
    setShowKey((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // ✅ traer datos SOLO LECTURA desde Supabase
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("auditorias")
        .select("user_config")
        .eq("user_id", user.id);

      if (error) throw error;

      // ✅ Extraemos el JSON guardado en user_config
      const formattedAgents =
        data?.map((item) => ({
          ...item.user_config,
        })) || [];

      setAgents(formattedAgents);
    } catch (err) {
      console.error("Error cargando agentes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          API Keys por Agente
        </h2>
        <p className="text-sm text-gray-400">Solo lectura</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : (
        <div className="space-y-5">

          {agents.map((agent, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
            >

              {/* IZQUIERDA */}
              <div className="flex items-center gap-3 overflow-hidden">

                {/* ✅ ICONO LIVE PULSANTE */}
                <div className="flex items-center gap-1">
                  <Activity className="text-green-500 animate-pulse" size={16} />
                  <span className="text-xs font-medium text-green-600 animate-pulse">
                    Live
                  </span>
                </div>

                {/* Nombre y rol */}
                <div>
                  <p className="text-lg font-semibold text-gray-800 truncate">
                    {agent.agent_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Rol:</strong> {agent.rol}
                  </p>
                </div>
              </div>

              {/* DERECHA */}
              <div className="flex items-center gap-4 w-[55%] justify-end">
                <div className="text-xs bg-gray-50 px-4 py-2 rounded-full text-gray-600 font-mono border border-gray-100 w-full text-left overflow-hidden">
                  {showKey[i] ? agent.api_key : maskApiKey(agent.api_key)}
                </div>

                <button
                  onClick={() => toggleKey(i)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showKey[i] ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
