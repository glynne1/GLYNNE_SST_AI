"use client";

import { useEffect, useState } from "react";
import { Trash2, RotateCcw } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import AgentForm from "./AgentEditModal";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      const { data, error } = await supabase
        .from("auditorias")
        .select("id, user_config")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) throw error;

      const formattedAgents = data?.map((item) => ({
        id: item.id,
        ...item.user_config,
        full_config: item.user_config
      })) || [];

      setAgents(formattedAgents);
    } catch (err) {
      console.error("Error al cargar agentes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAgents();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleDelete = async (agentId) => {
    try {
      const confirmDelete = window.confirm(
        "¿Seguro que deseas eliminar este agente? Esta acción no se puede deshacer."
      );
      if (!confirmDelete) return;

      const { error } = await supabase
        .from("auditorias")
        .delete()
        .eq("id", agentId);

      if (error) throw error;
      setAgents((prev) => prev.filter((a) => a.id !== agentId));
    } catch (err) {
      console.error("❌ Error al eliminar agente:", err);
      alert("Hubo un error al eliminar el agente. Revisa la consola.");
    }
  };

  const handleEdit = (agent, index) => { setSelectedAgent({ index, agent }); };
  const handleSave = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a, i) => (i === selectedAgent.index ? updatedAgent : a))
    );
    setSelectedAgent(null);
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative h-[90vh] flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Agentes GLYNNE creados (Información Completa)
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
          title="Actualizar lista"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", repeat: isRefreshing ? Infinity : 0 }}
          >
            <RotateCcw className={`w-5 h-5 ${isRefreshing ? "text-blue-600" : "text-gray-600"}`} />
          </motion.div>
        </button>
      </div>

      {/* CONTENEDOR SCROLLABLE */}
      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic">Cargando agentes...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic">
              Aquí podrás visualizar tus modelos IA creados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <div
                key={agent.id || idx}
                className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col justify-between w-full hover:shadow-xl transition-all"
              >
                {/* INFORMACIÓN DEL AGENTE ORDENADA Y MÁS COMPACTA */}
                <div className="space-y-1 text-start text-xs text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-800">{agent.agent_name || "Agente sin nombre"}</h3>
                    <p><strong>Rol:</strong> {agent.rol || "-"}</p>
                    <p><strong>Modelo:</strong> {agent.model || "-"}</p>
                    {agent.api_key && <p><strong>API Key:</strong> {agent.api_key}</p>}
                  </div>

                  {/* CONFIGURACIÓN ADICIONAL */}
                  {agent.full_config && (
                    <div className="mt-1">
                      <h4 className="font-semibold text-gray-800">Configuración Adicional:</h4>
                      <ul className="list-disc list-inside space-y-0.5">
                        {Object.entries(agent.full_config).map(([key, value]) => {
                          if (["agent_name","rol","model","api_key"].includes(key)) return null;
                          return (
                            <li key={key}><strong>{key}:</strong> {JSON.stringify(value)}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* ICONO ELIMINAR */}
                <div className="mt-2 flex justify-end text-gray-400">
                  <Trash2
                    className="w-4 h-4 cursor-pointer stroke-red-500 hover:stroke-red-700 transition-all"
                    onClick={() => handleDelete(agent.id)}
                    strokeWidth={1.5}
                    title="Eliminar agente"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL EDITAR */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setSelectedAgent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl p-6 w-[85vw] h-[85vh] overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✖
              </button>
              <AgentForm
                agentData={selectedAgent.agent}
                onSave={handleSave}
                onCancel={() => setSelectedAgent(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
