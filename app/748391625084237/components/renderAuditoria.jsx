'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuditoriaModal({ userId }) {
  const [open, setOpen] = useState(false);
  const [auditoria, setAuditoria] = useState(null);
  const [loading, setLoading] = useState(false);

  const generarAuditoria = async () => {
    try {
      setLoading(true);
      const res = await fetch(` https://gly-csv-v2.onrender.com/generar_auditoria?user_id=${userId}`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Error al generar la auditoría");
      }

      const data = await res.json();
      setAuditoria(data);
      setOpen(true);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Hubo un problema generando la auditoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Botón que dispara la auditoría */}
      <button
        onClick={generarAuditoria}
        className="px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar Auditoría"}
      </button>

      {/* Popup con la salida */}
      {open && auditoria && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">📑 Informe de Auditoría</h2>

            {/* Render dinámico de la auditoría */}
            <div className="space-y-6 text-gray-700 text-justify">
              {auditoria.titulo && (
                <div>
                  <h3 className="text-lg font-semibold">Título</h3>
                  <p>{auditoria.titulo}</p>
                </div>
              )}

              {auditoria.empresa && (
                <div>
                  <h3 className="text-lg font-semibold">Empresa</h3>
                  <p>{auditoria.empresa}</p>
                </div>
              )}

              {auditoria.resumen && (
                <div>
                  <h3 className="text-lg font-semibold">Resumen</h3>
                  <p>{auditoria.resumen}</p>
                </div>
              )}

              {auditoria.recomendaciones && Array.isArray(auditoria.recomendaciones) && (
                <div>
                  <h3 className="text-lg font-semibold">Recomendaciones</h3>
                  <ul className="list-disc list-inside">
                    {auditoria.recomendaciones.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {auditoria.procesos && (
                <div>
                  <h3 className="text-lg font-semibold">Procesos Evaluados</h3>
                  <ul className="list-disc list-inside">
                    {Object.entries(auditoria.procesos).map(([proceso, detalle], i) => (
                      <li key={i}>
                        <span className="font-medium">{proceso}:</span> {detalle}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Botón de cierre */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
