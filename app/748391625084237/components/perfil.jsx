'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';

export default function PerfilUsuario() {
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    avatarUrl: '',
    correo: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error obteniendo usuario:', userError);
        setLoading(false);
        return;
      }

      const { email, user_metadata } = user;

      setUserInfo({
        nombre: user_metadata?.full_name || 'Usuario',
        avatarUrl: user_metadata?.avatar_url || '/default-avatar.png',
        correo: email,
      });

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-8 animate-pulse">
        Cargando perfil...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[400px] mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center"
    >
      {/* Imagen del usuario */}
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={userInfo.avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
        />
      </div>

      {/* Nombre y correo */}
      <h2 className="mt-4 text-xl font-bold text-gray-800">{userInfo.nombre}</h2>
      <p className="text-sm text-gray-500">{userInfo.correo}</p>

      {/* Caja informativa */}
      <div className="mt-5 bg-white border border-gray-300 rounded-xl p-4 hover:shadow-md transition">
        <p className="text-gray-700 text-sm">
          ¡Bienvenido a <span className="font-bold text-[#0f172a]">GLY-AI</span>!
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Tu espacio para descubrir cómo integramos IA en los procesos de tu empresa.
        </p>
      </div>

      {/* Línea decorativa */}
      <div className="mt-5 border-t border-gray-200 pt-3 text-xs text-gray-400">
        Perfil conectado GOOGLE
      </div>
    </motion.div>
  );
}
