'use client';

import DocsSidebar from './componentes/documentacion';
import Main from './componentes/main1';
import Main2 from './componentes/main2';
import Doc1 from './componentes/doc1';
import Card from './componentes/cards';
import ChatMod from './componentes/ChatModal';
import Carpetas from './componentes/carpetasEJ'
import ApiGroq from './componentes/apiGroq'
import Modelos from './componentes/modelos'
import Ejeccucion from './componentes/ejecucion'
import MR from './componentes/mr'

export default function DocsPage() {
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* 🔹 Sidebar fija */}
      <DocsSidebar />

      {/* 🔹 Contenido principal */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-10 scroll-smooth">
        {/* ================= SECCIONES ================= */}

        <section id="Introducción" className="scroll-mt-24">
     
          <div className="space-y-4">
            <MR />
            <Doc1 />
          </div>
          <div className="space-y-4">
            <ChatMod />
          </div>
          <div className="space-y-4">
            <Card />
          </div>
        </section>

        <section id="Descarga del Framework" className="scroll-mt-24">
        
          <div className="space-y-4">
        <Main />
     
          </div>
        </section>

        <section id="Instalación y Estructura de Carpetas" className="scroll-mt-24">

          <div className="space-y-4">
          <Carpetas  />
          <ChatMod />
          </div>
        </section>


        <section id="Obtención de la API Key" className="scroll-mt-24">

          <div className="space-y-4">
          <ApiGroq />
          </div>
        </section>
   
        <section id="Selección de Modelos" className="scroll-mt-24">
        <div className="space-y-4">
        <Modelos />
        </div>
        </section>

        <section id="Ejecución Inicial" className="scroll-mt-24">

        <div className="space-y-4">
        <Ejeccucion />
        </div>
        </section>
      </main>
    </div>
  );
}
