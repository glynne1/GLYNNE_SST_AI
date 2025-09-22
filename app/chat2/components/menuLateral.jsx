'use client'

import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import ListaAur from './ListaAuditorias'

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative h-screen">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-4 left-4 z-50 p-3 rounded-md transition-colors duration-300 ${
          isOpen ? 'bg-gray-500' : 'bg-white'
        }`}
      >
        {isOpen ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaBars className="text-black text-xl" />
        )}
      </button>

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 bg-white transition-all duration-500 ease-in-out
          ${isOpen ? 'block' : 'hidden'} 
          w-full sm:w-[30vw] sm:max-w-[400px] sm:min-w-[240px] overflow-y-auto`}
      >
        <div className="mt-[40px]">
          <ListaAur />
        </div>

     
      </div>
    </div>
  )
}

export default SideMenu
