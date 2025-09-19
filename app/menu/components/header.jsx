'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-2 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'bg-black shadow-md' : 'bg-black'
        }`}
      >
        {/* Logo */}
        <img
          src="/logo2.png"
          alt="Logo"
          className="h-6 sm:h-7 md:h-8 cursor-pointer invert"
          // 👆 invert para que se vea blanco si tu logo es negro
        />

        {/* Botón cerrar sesión */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-xs sm:text-sm text-white border border-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Modal de confirmación de logout */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]">
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
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                >
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
