'use client';
import { useState } from 'react';
import { getCurrentUser, saveAuditToSupabase } from '../../lib/supabaseClient';

export default function SaveAudit({ userId }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSaveAudit = async () => {
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 1️⃣ Solicitar auditoría al backend
      const res = await fetch(`https://gly-chat-v1-2.onrender.com/generar_auditoria?user_id=${userId}`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Error al generar la auditoría desde el backend.');

      const data = await res.json();

      // 2️⃣ Crear JSON temporal
      const auditJson = {
        userId: userId || 'desconocido',
        timestamp: new Date().toISOString(),
        contenido: {
          texto: data.auditoria,
          logo: '/logo2.png',
          sello: '/celloGLY.png',
          firma: '/firma.png',
        },
      };

      console.log('✅ JSON generado:', auditJson);

      // 3️⃣ Guardar en Supabase
      const user = await getCurrentUser();
      if (!user) throw new Error('Por favor, inicia sesión para guardar la auditoría.');

      const { data: savedData, error } = await saveAuditToSupabase({
        audit_content: auditJson,
        user_id: user.id,
      });

      if (error) throw new Error(error.message);

      console.log('✅ Auditoría guardada en Supabase:', savedData);
      setSuccessMsg('Auditoría guardada exitosamente en Supabase.');
    } catch (err) {
      console.error('❌ Error:', err);
      setErrorMsg(err.message || 'Hubo un problema al guardar la auditoría.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={handleSaveAudit}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? 'Guardando auditoría...' : 'Generar y Guardar Auditoría'}
      </button>

      {successMsg && <p className="mt-4 text-green-600 font-medium">{successMsg}</p>}
      {errorMsg && <p className="mt-4 text-red-600 font-medium">{errorMsg}</p>}
    </div>
  );
}
