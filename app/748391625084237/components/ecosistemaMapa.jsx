'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MapaRutaAlert({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [ecosistema, setEcosistema] = useState(null);
  const API_URL = 'https://gly-chat-v1-2.onrender.com';

  const generarEcosistema = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/generar_ecosistema`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setEcosistema(data.ecosistema || 'No se pudo generar el ecosistema');
    } catch (err) {
      setEcosistema(`⚠️ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center"
      >
        {!ecosistema ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🚀 Generar mapa de ruta empresarial
            </h2>
            <p className="text-gray-600 mb-6">
              GLY-AI ya tiene suficiente contexto para crear una visualización estratégica
              de tu ecosistema empresarial.
            </p>

            <div className="flex justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={generarEcosistema}
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-full font-semibold shadow-md"
              >
                {loading ? 'Generando...' : 'Crear'}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-black rounded-full font-semibold"
              >
                Cancelar
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🌐 Ecosistema generado
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg text-left max-h-96 overflow-y-auto text-sm text-gray-800 border">
              <pre className="whitespace-pre-wrap">{JSON.stringify(ecosistema, null, 2)}</pre>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-black text-white rounded-full font-semibold"
            >
              Cerrar
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
