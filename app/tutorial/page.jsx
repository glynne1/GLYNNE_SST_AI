// app/contact/page.jsx
"use client";

import Header from "./components/header";
import ContactHero from "./components/mainn1";
import Pub1 from './components/pub1'
import Card from './components/cards'
export default function Page() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-white">

      {/* === HEADER / NAVBAR === */}
      <header className="w-full  fixed left-0 z-50">
        <Header />
      </header>

      {/* Espacio para que el header no tape el contenido */}
      <div className="h-10 md:h-16"></div>

      {/* === PAGE CONTENT WRAPPER === */}
      <div className="flex-1 w-full flex justify-center px-4 md:px-8">
           
        {/* === CONTACT HERO SECTION === */}
        <section className="w-full max-w-[1600px] py-10 md:py-16">
          <ContactHero />
        </section>

        
    
      </div>

       {/* === CONTACT HERO SECTION === */}
<section className="w-full max-w-[1600px] py-10 md:py-16 mx-auto px-4 text-center">
  
  {/* TÍTULO */}
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
    Tutoriales Básicos de GLYNNE IA
  </h2>

  {/* DESCRIPCIÓN */}
  <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
    Aquí encontrarás una colección de tutoriales esenciales que te explican el contexto general 
    y los conceptos fundamentales para usar correctamente el ecosistema de GLYNNE IA.
  </p>

  <Card />

</section>


      <section className="w-full max-w-[1800px] py-10 md:py-16">
          <Pub1 />
        </section>

          
      {/* === OPTIONAL FOOTER SPACE (si lo necesitas en el futuro) === */}
      {/* <footer className="w-full py-6 text-center text-gray-500 text-sm">
        Footer content here...
      </footer> */}
    </main>
  );
}
