'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NewsRotator() {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/news/newsIa.json');
        if (!res.ok) throw new Error('Error al cargar newsIa.json');
        const data = await res.json();

        const items = Array.isArray(data) ? data : data.news || data.data || [];
        const lastFour = items.slice(-4);
        setNews(lastFour);
      } catch (error) {
        console.error('Error al leer noticias:', error);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [news]);

  return (
    <section className="flex flex-col items-center justify-between h-[200px] w-full bg-white/70 backdrop-blur-md rounded-xl shadow-sm p-3 overflow-hidden">
      {/* 🔹 Título */}
      <h2 className="text-[10px] font-semibold text-gray-800 tracking-widest uppercase mb-1">
        NEWS
      </h2>

      {/* 🔹 Texto animado */}
      <div className="relative h-[36px] flex flex-col items-center justify-center w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {news.length > 0 && (
            <motion.div
              key={news[index].id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="text-[10px] text-gray-600 px-2 leading-tight">
                {news[index].title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Imagen QR debajo del contenedor del texto */}
      <img
        src="/qrGLY.png"
        alt="Código QR"
        className="mt-2 w-17 h-17 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />

      {/* 🔹 Botón “Ver más” con efecto de barrido de luz */}
     
    </section>
  );
}
