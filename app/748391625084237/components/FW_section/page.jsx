'use client';

import Main from './componentes/main1';
import Main2 from './componentes/main2';
import Doc1 from './componentes/doc1';
import Card from './componentes/cards';
import ChatMod from './componentes/ChatModal'
export default function DocsPage() {
  return (
    <div className="flex flex-col">
      {/* 🔹 Primera sección - Main */}
      <section className="h-screen w-full">
        <Main />
      </section>

      {/* 🔹 Segunda sección - Main2 al lado de Doc1 */}
      <section className="w-full h-70 flex">
        {/* Contenido principal */}
        <div className="flex-1">
          <Main2 />
        </div>

        {/* Barra lateral con Doc1 y cards más cerca */}
        <div className="flex flex-col gap-2"> {/* <--- gap controla la separación */}
          <Doc1 />
          <ChatMod />
          {/* 🔹 Cards justo debajo de Doc1 */}
          <Card />
            {/* 🔹 Mensaje alusivo a GLYNNE Framework */}
  <div className="w-full text-center mt-4 text-gray-400 text-xs md:text-sm">
    © GLYNNE 2025 - Innovación impulsada por inteligencia artificial
  </div>
        </div>
      </section>
    </div>
  );
}
