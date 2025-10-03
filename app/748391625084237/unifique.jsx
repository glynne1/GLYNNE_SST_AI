'use client';

import ChatSimple from './components/ChatLLM'; // 👈 Importamos el chat
import AlertRotator from './components/alert'; // 👈 Importamos el alerta

export default function MainApp() {
  return (
    <div className="w-full h-screen bg-white flex justify-center">
      {/* Contenedor del chat que ocupa todo el viewport */}
      <div className="w-full max-w-4xl h-screen">
        <ChatSimple />
      </div>
      
      {/* Componente de alerta rotatorio */}
      <AlertRotator />
    </div>
  );
}