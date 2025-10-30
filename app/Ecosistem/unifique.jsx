'use client';

import ChatSimple from './components/ChatLLM'; // 👈 Importamos el chat


export default function MainApp() {
  return (
    <div className="w-full h-screen bg-white flex justify-center">
      {/* Contenedor del chat que ocupa todo el viewport */}
      <div className="w-full max-w-4xl h-screen">
        <ChatSimple />
      </div>
      
    

    </div>
  );
}