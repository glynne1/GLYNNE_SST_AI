'use client';

import ChatSimple from './components/ChatLLM';
import TechTools from './components/menuColumna';
import BlockNavProvider from "../providers/BlockNavProvider";

export default function MainApp() {
  return (
    <BlockNavProvider>
      <div className="w-full h-screen bg-white flex justify-center items-center">
        
        {/* Contenedor FLEX para colocar TechTools + ChatSimple */}
        <div className="flex flex-col md:flex-row w-full max-w-7xl h-screen gap-6 p-4">

          {/* 👉 Sección izquierda: Tools */}
          <div className="w-full md:w-[40%] h-full overflow-y-auto md:block hidden">
            <TechTools />
          </div>

          {/* 👉 Sección derecha: Chat */}
          <div className="w-full md:w-[90%] h-[90vh]">
            <ChatSimple />
          </div>

        </div>

      </div>
    </BlockNavProvider>
  );
}
