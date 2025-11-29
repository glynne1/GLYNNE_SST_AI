'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AlertUpgrade() {
  const [openModal, setOpenModal] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    avatarUrl: '/logo2.png',
    telefono: '',
    empresa: '',
    asunto: '',
    ciudad: '',
    pais: '',
  });

  const paises = ['Colombia', 'México', 'Argentina', 'Chile', 'España', 'Estados Unidos'];
  const ciudades = ['Bogotá', 'Medellín', 'CDMX', 'Buenos Aires', 'Santiago', 'Madrid', 'Miami'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const enviarWhatsApp = () => {
    const mensaje = `
Hola 👋, soy ${formData.nombre} de ${formData.empresa}. 
Estoy interesado en conocer cómo su equipo puede ayudarme a automatizar procesos relacionados con "${formData.asunto}".

Actualmente me encuentro en ${formData.ciudad}, ${formData.pais}. 
Pueden contactarme al número ${formData.telefono} o al correo ${formData.correo}.

¡Quedo atento a su respuesta para agendar una conversación y analizar cómo podríamos trabajar juntos! 🚀
    `;

    const numero = '+573123455328';
    const url = `https://wa.me/${numero.replace('+', '')}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setLoadingScreen(true);

    setTimeout(() => {
      setLoadingScreen(false);
      enviarWhatsApp();
      router.push('/');
    }, 4000);
  };

  return (
    <>
      {/* ✅ Estilos globales para inputs blancos + brillo */}
      <style jsx global>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        select:-webkit-autofill {
          box-shadow: 0 0 0px 1000px white inset !important;
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          -webkit-text-fill-color: #000 !important;
        }

        input, select {
          background-color: white !important;
        }
      `}</style>

      {/* Banner inferior */}
      <div className="absolute mt-[50px] bottom-4 w-full flex justify-center z-[10]">
        <div className="relative max-w-xs text-[11px] text-black bg-white px-3 py-2 rounded-lg shadow-sm overflow-hidden border border-gray-200 flex items-center justify-between gap-2">
          <p className="relative z-10 whitespace-nowrap">
            <strong>Optimiza tu negocio</strong>
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="relative inline-block px-3 py-[4px] text-[10px] font-semibold bg-black text-white rounded-md shadow-sm overflow-hidden group"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"/>
            <span className="relative z-10">Abrir</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && !loadingScreen && (
          <motion.div
            className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl px-6 sm:px-10 py-8 text-gray-800 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Cerrar */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
              >
                ✕
              </button>

              <div className="flex flex-col items-center gap-4">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-center text-black text-sm sm:text-base"
                >
                  Estamos listos para acompañarte en el proceso de modernizar tu empresa.
                </motion.h2>

                <Image src="/logo2.png" alt="Logo" width={70} height={70} />

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {[
                    { name: 'nombre', placeholder: 'Nombre completo' },
                    { name: 'correo', placeholder: 'Correo electrónico', type: 'email' },
                    { name: 'telefono', placeholder: 'Teléfono', type: 'tel' },
                    { name: 'empresa', placeholder: 'Empresa o negocio' },
                    { name: 'asunto', placeholder: 'Asunto de automatización' },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        className="w-full p-3 rounded-xl text-sm bg-white border border-gray-300 focus:outline-none relative z-10"
                        required
                      />

                      {/* Borde animado */}
                      {focused === field.name && (
                        <span
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg,#4ade80,#3b82f6,#facc15,#ec4899)",
                            backgroundSize: "300% 300%",
                            animation: "shine 2.5s linear infinite",
                            maskImage: "linear-gradient(#fff 0 0)",
                            WebkitMaskImage: "linear-gradient(#fff 0 0)",
                          }}
                        />
                      )}
                    </div>
                  ))}

                  <select
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl text-sm bg-white border border-gray-300 focus:outline-none"
                    required
                  >
                    <option value="">Selecciona tu país</option>
                    {paises.map((p) => <option key={p}>{p}</option>)}
                  </select>

                  <select
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl text-sm bg-white border border-gray-300 focus:outline-none"
                    required
                  >
                    <option value="">Selecciona tu ciudad</option>
                    {ciudades.map((c) => <option key={c}>{c}</option>)}
                  </select>

                  {/* Botón con barrido */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03 }}
                    type="submit"
                    className="relative group col-span-full mt-4 px-8 py-3 rounded-full font-semibold text-white bg-black shadow-xl overflow-hidden text-sm"
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">Habla con nuestro equipo</span>
                  </motion.button>
                </form>

                <div className="text-xs text-gray-600 text-center mt-2">
                  El siguiente paso comienza aquí: evoluciona tu negocio hacia la nueva era de la automatización inteligente.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading / pantalla blanca */}
      <AnimatePresence>
        {loadingScreen && (
          <motion.div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            >
              <Image src="/logo2.png" width={160} height={160} alt="logo" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
