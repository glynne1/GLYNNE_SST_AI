'use client';
import { useState } from 'react';
import { saveAuditToSupabase } from '../../lib/supabaseClient';

export default function SaveAudit({ userId, tempJson }) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSaveAudit = async () => {
    if (!tempJson) {
      setErrorMsg('No hay datos de auditoría para guardar.');
      return;
    }

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // Guardar en Supabase usando userId y tempJson pasados desde AuditAlert
      const { data: savedData, error } = await saveAuditToSupabase({
        audit_content: tempJson,
        user_id: userId,
      });

      if (error) throw new Error(error.message);

      console.log('✅ Auditoría guardada en Supabase:', savedData);
      setSuccessMsg('Auditoría guardada exitosamente en Supabase.');
    } catch (err) {
      console.error('❌ Error guardando auditoría:', err);
      setErrorMsg(err.message || 'Hubo un problema al guardar la auditoría.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={handleSaveAudit}
        disabled={loading || !tempJson}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? 'Guardando auditoría...' : 'Guardar Auditoría'}
      </button>

      {successMsg && <p className="mt-4 text-green-600 font-medium">{successMsg}</p>}
      {errorMsg && <p className="mt-4 text-red-600 font-medium">{errorMsg}</p>}
    </div>
  );
}
