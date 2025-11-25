"use client";
import Card from './Card';
import Footer from '../../../../components/footer'
export default function GlynnePromo() {
  return (
    <>
      {/* --- HERO --- */}
      <section
        className="relative w-[100%] h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/NEXTAPPGLYNNE.png')",
        }}
      >
        <div className="absolute inset-0" />

        <div className="absolute bottom-6 right-6 text-right max-w-sm">
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg text-black">
            NEXTJS + GLYNNE IA
          </h1>

          <p className="text-sm mt-2 text-gray-400">
            Te entregamos un proyecto base completamente preconfigurado para que
            empieces a construir tus propias aplicaciones y conectes los modelos
            de IA que hayas creado dentro de la plataforma GLYNNE.
          </p>
        </div>
      </section>

      {/* --- CONTENEDOR CARD + TÍTULO + DESCRIPCIÓN (80vh) --- */}
      <section className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Interfaz Lista para Desplegar
        </h2>

        <p className="text-gray-600 max-w-2xl mb-10">
          Un repositorio completo en Next.js conectado a todo nuestro ecosistema de IA.
          Solo descárgalo, clónalo y empieza a construir tu aplicación. Puedes personalizar
          logos, estilos, textos y componentes a tu gusto.
        </p>

        <Card />
  
      </section>
    </>
  );
}
