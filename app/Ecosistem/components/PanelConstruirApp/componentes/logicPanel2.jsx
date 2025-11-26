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
        {/* OSCURECER FONDO */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-6 right-6 text-right max-w-sm z-10">
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg text-white">
            NEXTJS + GLYNNE IA
          </h1>

          <p className="text-sm mt-2 text-gray-200">
            Te entregamos un proyecto base completamente preconfigurado para que
            empieces a construir tus propias aplicaciones y conectes los modelos
            de IA que hayas creado dentro de la plataforma GLYNNE.
          </p>

          {/* BOTÓN */}
          <a
            href="https://glynne-fornt1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Ver aplicacion base
          </a>
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
