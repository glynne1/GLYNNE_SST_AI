'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MapaRutaAlert({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [dataRaw, setDataRaw] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = 'http://0.0.0.0:8000'; // Cambia esto según tu backend (producción o local)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/generar_ecosistema`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);

        const result = await response.json();
        setDataRaw(result);
      } catch (err) {
        console.error('❌ Error al obtener datos del backend:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🚀 Cargando datos del ecosistema...
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Espera mientras se obtiene la información directamente desde el backend.
            </p>
            <motion.div
              className="loader mb-4 text-3xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              🔄
            </motion.div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-black rounded-full font-semibold hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">
            ❌ Error: {error}
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              🌐 Respuesta del Backend (Ecosistema)
            </h3>

            {dataRaw ? (
              <pre className="bg-gray-100 p-4 rounded-lg text-xs text-gray-800 overflow-auto max-h-[70vh] whitespace-pre-wrap break-all border">
                {JSON.stringify(dataRaw, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500 text-center">
                No se recibió información del backend.
              </p>
            )}

            <div className="flex justify-center mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onClose}
                className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800"
              >
                Cerrar
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
