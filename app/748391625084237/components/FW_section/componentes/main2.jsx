// docs/page.jsx
'use client';
import Doc1 from './doc1'

import Doc from "./documentacion";
import Card from './cards'
export default function DocsPage2() {
  return (
    <div className="flex flex-col">


      {/* 🔹 Segunda sección - Documentación con barra lateral */}
      <section className="h-screen w-full">
        <Doc />
   
      </section>
    </div>
  );
}

