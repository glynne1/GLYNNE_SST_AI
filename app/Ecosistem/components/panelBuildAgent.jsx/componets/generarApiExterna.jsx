"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, 
  RotateCcw, 
  MessageSquareText // Importamos el ícono de chat
} from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import AgentForm from "./AgentEditModal";
// IMPORTAR EL MODAL DE CHAT
import AgentChatModal from "./AgentChatModal"; 
import { supabase, getCurrentUser } from "../../../../lib/supabaseClient";

// ⚠️ NOTA: El componente AgentChatModal debe estar definido en AgentChatModal.jsx 
// como se mostró en la respuesta anterior para que esta importación funcione.

export default function AgentCards() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  // 🔥 ESTADOS PARA EL CHAT MODAL
  const [openChatPopup, setOpenChatPopup] = useState(false);
  const [chatAgent, setChatAgent] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) throw new Error("Usuario no autenticado");

      // La consulta sigue siendo la misma, trayendo id y el user_config (JSON)
      const { data, error } = await supabase
        .from("auditorias")
        .select("id, user_config")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) throw error;

      // Formateamos los datos para tener la configuración directamente en el agente
      const formattedAgents =
        data?.map((item) => ({
          id: item.id,
          // Almacenamos todo el objeto user_config (el JSON) en el agente
          ...item.user_config, 
          // Guardamos el objeto user_config original completo para usarlo en el fetch del chat
          full_config: item.user_config 
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

  // 🔥 Función para abrir el chat
  const handleOpenChat = (agent) => {
      setChatAgent(agent);
      setOpenChatPopup(true);
  }

  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-gray-300 shadow-md relative h-[90vh] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Agentes GLYNNE creados (Configuración Completa)
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
            <p className="text-sm text-gray-400 italic">Cargando agentes...</p>
          </div>
        ) : !agents || agents.length === 0 ? (
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
                className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col justify-between w-full hover:shadow-2xl transition-all"
              >
                {/* NOMBRE Y ROL */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {agent.agent_name || "Agente sin nombre"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Rol:</strong> {agent.rol || "-"}
                  </p>

                  <hr className="my-2" />

                  {/* MOSTRAR EL JSON COMPLETO (user_config) */}
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">
                      Configuración Completa (JSON Supabase):
                    </h3>
                    <pre className="bg-gray-50 border border-gray-200 p-3 rounded-lg overflow-x-auto text-xs font-mono text-gray-700 max-h-[250px] whitespace-pre-wrap">
                      {/* Usamos JSON.stringify para mostrar el objeto completo legiblemente */}
                      {JSON.stringify(agent.full_config, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* ICONOS */}
                <div className="mt-3 flex justify-end space-x-4 text-gray-400">
                    
                    {/* BOTÓN DE CHAT */}
                    <MessageSquareText
                        className="w-5 h-5 cursor-pointer hover:text-green-600 transition-colors"
                        onClick={() => handleOpenChat(agent)}
                        title="Abrir Chat con el agente"
                        strokeWidth={1.8}
                    />
                    
                    {/* BOTÓN DE ELIMINAR */}
                    <Trash2
                        className="w-5 h-5 cursor-pointer stroke-red-500 hover:stroke-red-700 transition-all"
                        onClick={() => handleDelete(agent.id)}
                        strokeWidth={1.8}
                        title="Eliminar agente"
                    />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ⚠️ Se eliminó MODAL API KEY */}

      {/* MODAL EDITAR (Se mantiene) */}
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

      {/* 🔥 MODAL CHAT (Integración de AgentChatModal) */}
      <AnimatePresence>
        {openChatPopup && chatAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50"
            onClick={() => setOpenChatPopup(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl w-[90vw] max-w-xl h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
                <AgentChatModal 
                    agent={chatAgent} 
                    onClose={() => setOpenChatPopup(false)} 
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}