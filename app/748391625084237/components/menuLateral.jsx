'use client'

import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import ListaAur from './ListaAuditorias'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative h-screen">
      {/* Botón hamburguesa (apertura - arriba izquierda) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-50 p-3 rounded-md bg-white shadow transition-colors duration-300"
        >
          <FaBars className="text-black text-xl" />
        </button>
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 bg-white transition-all duration-500 ease-in-out
          ${isOpen ? 'block' : 'hidden'} 
          w-full sm:w-[30vw] sm:max-w-[400px] sm:min-w-[240px] overflow-y-auto`}
      >
        {/* Botón cerrar (en espejo - arriba derecha del menú) */}
        <div className="flex mt-[50px] justify-start p-4 border-b border-gray-200">
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 rounded-md bg-gray-500 text-white shadow hover:bg-gray-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4">
          <ListaAur />
        </div>
      </div>
    </div>
  )
}

export default SideMenu
