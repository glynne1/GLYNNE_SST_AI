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
import CLI from './componentes/CLIej'
import Instala from './componentes/instalarFW'
import VenvActivate from './componentes/venvActivate'
import CarpetaText from './componentes/carpetasEjTexto'
import ModelEj from './componentes/modelos'
import ModelEx from './componentes/modelosEx'
import CLIText from './componentes/ejmCLIText'
import Tabla from './componentes/TablaArchivosR'
import Logos from './componentes/mainlogos/mainlogos'
import GestionUser from './componentes/gesrionUser'
import GestionUserTX from './componentes/gestionUserTex'
import Panel from './componentes/panelEJ'
import Paneltext from './componentes/panelText'
import TablaPanel from './componentes/tablaPanel'
import DiagramaPanel from './componentes/diagramaPanel'
import Prompt from './componentes/promptsEJ'
import PromptText from './componentes/promptText'
import Fast from './componentes/FastApiText'
import Next from './componentes/NextText'
import NextT from './componentes/Next'
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
            <Logos />
          </div>
        </section>

        <section id="Descarga del Framework" className="scroll-mt-24">
        
          <div className="space-y-4">
            <Instala />
            <VenvActivate />
        <Main />
     
          </div>
        </section>

        <section id="Estructura de Carpetas" className="scroll-mt-24">

          <div className="space-y-4">
            
            <CarpetaText />
            <Tabla />
            <ChatMod />
          <Carpetas  />
         
          </div>
        </section>


        <section id="Obtención de la API Key" className="scroll-mt-24">

          <div className="space-y-4">
          <ApiGroq />
          </div>
        </section>
   
        <section id="Selección de Modelos" className="scroll-mt-24">
        <div className="space-y-4">
  
        <ModelEj />
        <ModelEx />
        </div>
        </section>


        <section id="Gestión de Código en /user" className="scroll-mt-24">

        <div className="space-y-4">
        <GestionUserTX />
        <GestionUser />
        <CLIText />
        <CLI />
   
        </div>
        </section>

        <section id="Automatización de Procesos" className="scroll-mt-24">

        <div className="space-y-4">
        <Paneltext />
        <Panel />
        <TablaPanel />
    
        </div>
      
        </section >
        <section id="Modificación de Agentes" className="scroll-mt-24">

        <div>
        < DiagramaPanel />

       
        </div>
</section >
<section id="Personalidad del Agente" className="scroll-mt-24">

<div>

<PromptText />
<Prompt />

</div>
</section >
<section id="Conexión con el Frontend" className="scroll-mt-24">

<div>

<Fast />
<CLI />
<Next />
<NextT />
</div>
</section >
      </main>
    </div>
  );
}
