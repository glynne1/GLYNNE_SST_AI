'use client';

export default function GlynneFooter() {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-lg ring-1 ring-black/5 shadow-inner mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm text-gray-700">
        {/* Novedades */}
        <div>
          <h4 className="font-semibold text-black mb-4">Novedades</h4>
          <ul className="space-y-2">
            <li>GLY-IA Copilot</li>
            <li>Arquitecturas Autónomas</li>
            <li>Actualizaciones GLYNNE</li>
            <li>Casos de éxito</li>
          </ul>
        </div>

        {/* Soluciones */}
        <div>
          <h4 className="font-semibold text-black mb-4">Soluciones GLYNNE</h4>
          <ul className="space-y-2">
            <li>Automatización Inteligente</li>
            <li>Orquestación de Procesos</li>
            <li>Modelos LLM a medida</li>
            <li>Infraestructura a escala</li>
          </ul>
        </div>

        {/* Desarrolladores & IA */}
        <div>
          <h4 className="font-semibold text-black mb-4">Desarrolladores & IA</h4>
          <ul className="space-y-2">
            <li>GLYNNE Dev Tools</li>
            <li>Documentación de APIs</li>
            <li>Marketplace de IA</li>
            <li>LangChain + Supabase</li>
            <li>Visual Studio Code</li>
          </ul>
        </div>

        {/* Compañía */}
        <div>
          <h4 className="font-semibold text-black mb-4">Compañía</h4>
          <ul className="space-y-2">
            <li>Sobre GLYNNE</li>
            <li>Privacidad y Seguridad</li>
            <li>Oportunidades de Carrera</li>
            <li>GLYNNE Green (Sustentabilidad)</li>
            <li>Contacto y Soporte</li>
          </ul>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="border-t border-gray-200 text-xs text-gray-600 px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <span>Español (Colombia)</span>
        <div className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Tus opciones de privacidad</a>
          <a href="#" className="hover:underline">Aviso legal</a>
          <a href="#" className="hover:underline">Marcas Registradas</a>
          <a href="#" className="hover:underline">© GLYNNE 2025</a>
        </div>
      </div>
    </footer>
  );
}
