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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">API Keys por Agente</h2>
        <p className="text-xs text-gray-400">Solo lectura</p>
      </div>

      {/* SCROLL */}
      <div className="h-[75vh] overflow-y-auto pr-2">

        {loading ? (
          <p className="text-center text-gray-400 text-sm">Cargando...</p>
        ) : (
          <div className="space-y-4">

            {agents.map((agent, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >

                {/* IZQUIERDA */}
                <div className="flex items-center gap-2 overflow-hidden">
                  
                  <div className="flex items-center gap-1">
                    <Activity className="text-green-500 animate-pulse" size={12} />
                    <span className="text-[10px] font-medium text-green-600 animate-pulse">
                      Live
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {agent.agent_name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      <strong>Rol:</strong> {agent.rol}
                    </p>
                  </div>
                </div>

                {/* DERECHA */}
                <div className="flex items-center gap-3 w-[55%] justify-end">
                  <div className="text-[10px] bg-gray-50 px-3 py-1.5 rounded-full text-gray-600 font-mono border border-gray-100 w-full text-left overflow-hidden">
                    {showKey[i] ? agent.api_key : maskApiKey(agent.api_key)}
                  </div>

                  <button
                    onClick={() => toggleKey(i)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    {showKey[i] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}
