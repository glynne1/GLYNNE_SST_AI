"use client";

import { useEffect, useState } from "react";
import { Settings2, Trash2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AgentForm from "./AgentEditModal";
import AgentsChatStyled from "./AgentEstado";
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [openChatPopup, setOpenChatPopup] = useState(false);
  const [chatAgent, setChatAgent] = useState(null);
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

      const formattedAgents =
        data?.map((item) => ({
          id: item.id,
          ...item.user_config,
        })) || [];

      setAgents(formattedAgents);
    } catch (err) {
      console.error("Error al cargar agentes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

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

  const handleEdit = (agent, index) => {
    setSelectedAgent({ index, agent });
  };

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
          Agentes GLYNNE creados
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
          title="Actualizar lista"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: isRefreshing ? Infinity : 0,
            }}
          >
            <RotateCcw
              className={`w-5 h-5 ${
                isRefreshing ? "text-blue-600" : "text-gray-600"
              }`}
            />
          </motion.div>
        </button>
      </div>

      {/* ZONA SCROLLABLE */}
      <div className="flex-1 overflow-y-auto pr-2">

        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic text-center">
              Cargando agentes...
            </p>
          </div>
        ) : !agents || agents.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-sm text-gray-400 italic text-center">
              Aquí podrás visualizar tus modelos IA creados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <div
                key={agent.id || idx}
                className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col justify-between w-full h-[200px] hover:shadow-2xl transition-all duration-300 text-left"
              >
                <div className="space-y-1 overflow-hidden">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {agent.agent_name || "Agente sin nombre"}
                  </h2>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Rol:</strong> {agent.rol || "-"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Objetivo:</strong> {agent.objective || "-"}
                  </p>
                  {agent.specialty && (
                    <p className="text-xs text-gray-500 truncate">
                      <strong>Especialidad:</strong> {agent.specialty}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Información del negocio:</strong>{" "}
                    {agent.business_info || "-"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    <strong>Mensaje adicional:</strong>{" "}
                    {agent.additional_msg || "-"}
                  </p>
                </div>

                {/* ICONOS - Sin el de mensaje */}
                <div className="mt-3 flex justify-end space-x-4 text-gray-400">

                  <Settings2
                    className="w-5 h-5 cursor-pointer hover:text-gray-700 transition-colors duration-200"
                    onClick={() => handleEdit(agent, idx)}
                  />

                  <Trash2
                    className="w-5 h-5 cursor-pointer stroke-red-500 hover:stroke-red-700 transition-all duration-200"
                    onClick={() => handleDelete(agent.id)}
                    strokeWidth={1.8}
                  />

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      {/* FIN scrollable */}

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
              className="relative bg-white rounded-2xl shadow-xl p-8 w-[85vw] h-[85vh] overflow-y-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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

      {/* MODAL CHAT — sigue existiendo por si luego lo reactivas */}
      <AnimatePresence>
        {openChatPopup && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setOpenChatPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl w-[90vw] h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setOpenChatPopup(false)}
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-xl z-50"
              >
                ✖
              </button>

              <div className="flex-1 w-full h-full overflow-y-auto">
                <AgentsChatStyled agent={chatAgent} />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
