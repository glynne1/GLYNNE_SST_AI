'use client';

import { useState } from 'react';
import ModalInicio from './components/madalInicio';
import ChatLLM from './unifique';
import Header from './components/header';
import SideMenu from './components/menuLateral'; // <-- Importamos el SideMenu

export default function Diagnostico() {
  const [datosEmpresa, setDatosEmpresa] = useState(null);

  return (
    <div className="relative h-screen bg-white flex ">
      {/* Menú lateral */}
      <div className="relative top-[40px]">
        <SideMenu />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header fijo en la parte superior */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Contenedor del chat ajustado al resto del espacio */}
        <div className="flex-1">
          <div className="w-full h-full flex flex-col">
            {!datosEmpresa && <ModalInicio onComplete={setDatosEmpresa} />}
            {datosEmpresa && <ChatLLM empresa={datosEmpresa} />}
          </div>
        </div>
      </div>
    </div>
  );
}
