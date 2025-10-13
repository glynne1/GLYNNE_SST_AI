'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Calendar, User, ArrowUp, ExternalLink } from 'lucide-react';
import GlynneSidebar from './pblicidad';
import Main from './mainNews';

// 🧠 Función genérica para cargar noticias desde el JSON que se le pase
async function fetchNews(fileName = 'newsIa.json') {
  try {
    const response = await fetch(`/news/${fileName}`);
    if (!response.ok) throw new Error(`Error al cargar ${fileName}`);
    const data = await response.json();
    return data.news || [];
  } catch (error) {
    console.error('Error al leer noticias:', error);
    return [];
  }
}

export default function MuroNoticiasGlynne() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSource, setActiveSource] = useState('newsIa.json'); // 👈 para saber cuál JSON está activo

  // 🔹 Carga inicial (newsIa.json por defecto)
  useEffect(() => {
    fetchNews(activeSource).then((data) => {
      setArticles(data);
      setFilteredArticles(data);
    });
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSource]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleImageError = (e) => {
    e.target.src =
      'https://via.placeholder.com/1200x800/ffffff/666666?text=Imagen+no+disponible';
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredArticles(articles);
      return;
    }
    const results = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.summary.toLowerCase().includes(term) ||
        a.tags.some((tag) => tag.toLowerCase().includes(term))
    );
    setFilteredArticles(results);
  };

  return (
    <div className="flex">
      {/* 🔹 SECCIÓN PRINCIPAL */}
      <section className="w-[89%] min-h-screen bg-white text-gray-900 font-sans antialiased">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-white font-medium" />
              <div>
                <h1 className="text-xl font-light tracking-tight text-gray-900">
                  GLYNNE
                </h1>
                <p className="text-xs text-gray-500 font-light tracking-wide">
                  News
                </p>
              </div>
            </div>

            {/* 🔍 Buscador */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-56 pl-10 pr-4 py-2 bg-gray-100 rounded-xl outline-none text-sm placeholder-gray-400 transition-all focus:bg-white focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>
        </motion.header>

        {/* 🔹 Hero Section */}
        <Main />

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 text-sm">
              No se encontraron resultados para "{searchTerm}".
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, i) => (
                <motion.article
                  key={`${article.id}-${i}`} // 🔹 Cambiado para evitar keys duplicadas
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative overflow-hidden h-48 bg-gray-100">
                    <img
                      src={article.imageSmall}
                      alt={article.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-light">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                      <span>•</span>
                      <User className="w-3 h-3" />
                      <span className="font-medium">{article.source}</span>
                    </div>

                    <h3 className="text-base font-normal text-gray-900 mb-3 leading-tight tracking-tight line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 font-light tracking-wide mb-4">
                      {article.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-100">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200 font-light tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-400 font-light tracking-wide">
              © {new Date().getFullYear()} GLYNNE AI — PLATFORM FOR INTELLIGENCE
            </p>
          </div>
        </footer>

        {/* BOTÓN DE SCROLL */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all z-40"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* MODAL DE NOTICIA COMPLETA */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900">{selectedArticle.title}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedArticle.date} — {selectedArticle.source}
                </p>

                <img
                  src={selectedArticle.imageLarge || selectedArticle.imageSmall}
                  alt={selectedArticle.title}
                  className="rounded-lg mb-6 w-full h-64 object-cover"
                />

                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify mb-6">
                  {selectedArticle.fullText || selectedArticle.summary}
                </p>

                {selectedArticle.url && (
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    Ver fuente original <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 🔹 SIDEBAR */}
      <div className="w-[11%] h-screen sticky top-0 border-l border-gray-200 hidden-[max-850px]:hidden">
        <GlynneSidebar />
      </div>
    </div>
  );
}
