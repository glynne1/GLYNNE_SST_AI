'use client'

import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import ListaAur from './ListaAuditorias'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 🔹 Botón hamburguesa fijo (no se mueve al hacer scroll) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 mt-[30px] rounded-md bg-white transition-transform duration-300 hover:scale-105"
        >
          <FaBars className="text-black text-xl" />
        </button>
      )}

      {/* 🔹 Menú lateral con animación */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 bg-white shadow-xl border-r border-gray-200
          transform transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-full sm:w-[30vw] sm:max-w-[400px] sm:min-w-[240px] overflow-y-auto`}
      >
        {/* Botón cerrar (fijo dentro del menú) */}
        <div className="flex mt-[50px] justify-start p-4 border-b border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 rounded-md bg-gray-500 text-white shadow hover:bg-gray-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="p-4">
          <ListaAur />
        </div>
      </div>
    </>
  )
}

export default SideMenu
