'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function PerfilUsuario() {
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    avatarUrl: '',
    correo: '',
  });
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  // Obtener información del usuario
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

  // Cerrar sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-8 animate-pulse">
        Cargando perfil...
      </div>
    );
  }

  return (
    <>
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
            {/* Logo debajo del texto */}
  <div className="mt-3 flex justify-center">
    <img
      src="/logo2.png" // 🔹 reemplaza con la ruta de tu logo
      alt="Logo GLY-AI"
      className="h-12 w-auto" // 🔹 ajusta altura según lo necesites
    />
  </div>
          <p className="text-xs text-gray-400 mt-1">
            Tu espacio para descubrir cómo integramos IA en los procesos de tu empresa.
          </p>


        </div>

        {/* Línea decorativa */}
        <div className="mt-5 border-t border-gray-200 pt-3 text-xs text-gray-400">
          Perfil conectado con Google
        </div>

        {/* Botón cerrar sesión con efecto de barrido */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="relative inline-block px-5 py-2 text-sm font-semibold bg-black text-white rounded-md shadow-sm overflow-hidden group transition-all duration-300"
          >
            {/* ✨ Barrido de luz */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Cerrar sesión</span>
          </button>
        </div>
      </motion.div>

      {/* Modal de confirmación de logout */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl max-w-md w-full mx-4 p-6 relative"
            >
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800">¿Cerrar sesión?</h2>
              <p className="text-gray-700 text-sm mb-6">
                Estás a punto de cerrar tu sesión. ¿Deseas continuar?
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="relative inline-block px-4 py-2 text-sm font-semibold bg-black text-white rounded-md shadow-sm overflow-hidden group transition-all duration-300"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">Cerrar sesión</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
