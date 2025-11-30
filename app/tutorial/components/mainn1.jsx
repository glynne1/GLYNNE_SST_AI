import React from 'react';

export default function ContactHero() {
  return (
    <div className="min-h-[80vh] bg-white flex items-center justify-center p-4 sm:p-6 md:p-10">

      {/* Frame responsivo */}
      <div className="relative w-full max-w-[1200px] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">

        <div className="flex flex-col h-full">

          {/* CONTENIDO */}
          <div className="flex flex-col lg:flex-row flex-1">

            {/* PANEL IZQUIERDO */}
            <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-6">

              {/* top bar */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>TOOLS SECTION</span>
                <span>GLYNNE FRAMEWORK</span>
              </div>

              {/* Title + Intro */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
                  FRAGMENTS
                </h1>
              </div>

              {/* Contact columns */}
              <div className="mt-4 flex flex-col md:flex-row gap-10 text-sm text-gray-700">

                {/* Column 1 */}
                <div className="flex-1">
                  <p className="font-semibold">Fragmentos disponibles</p>
                  <p className="text-xs text-gray-500">Componentes, herramientas y funciones listas</p>

                  <div className="mt-4">
                    <p className="font-semibold">Documentación</p>
                    <p className="text-xs text-gray-500">
                      Tutoriales completos y guías paso a paso
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold">Recursos extra</p>
                    <p className="text-xs text-gray-500">Ejemplos, plantillas, integraciones</p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex-1">
                  <p className="font-semibold">Instagram</p>
                  <p className="text-xs text-gray-500">https://www.instagram.com/glynneai/</p>

                  <div className="mt-4">
                    <p className="font-semibold">YouTube</p>
                    <p className="text-xs text-gray-500">
                      https://www.youtube.com/@AXGLYNNE
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold">Soporte</p>
                    <p className="text-xs text-gray-500">Tutoriales · Explicaciones · Actualizaciones</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 md:mt-auto text-xs text-gray-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <div>Acceso a fragmentos y documentación oficial</div>
                <div>Instagram · YouTube · Comunidad</div>
              </div>
            </div>

            {/* IMAGEN DERECHA */}
            <div className="w-full lg:w-2/3 flex items-center justify-center">

              <div
                className="
                  w-full
                  h-auto
                  sm:h-[35vh]
                  md:h-[40vh]
                  lg:h-full
                "
              >
                <img
                  src="/mocup/macGlynne.png"
                  alt="Interior"
                  className="
                    w-full
                    h-full
                    object-contain
                    sm:object-cover
                    rounded-none
                  "
                />
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div className="h-16 sm:h-20 bg-gray-900 w-full" />
        </div>
      </div>
    </div>
  );
}
