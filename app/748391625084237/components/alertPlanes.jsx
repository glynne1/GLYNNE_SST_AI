'use client';

export default function AlertUpgrade() {
  return (
    <div className="absolute bottom-6 w-full flex justify-center">
      <div className="relative max-w-xl text-sm text-black bg-white px-4 py-3 rounded-xl shadow-md overflow-hidden">
        {/* ✨ Barrido automático en el contenedor */}
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent animate-shine" />

        <p className="relative z-10">
          Para soluciones personalizadas, te invitamos a <strong>comunicarte con GLYNNE </strong>.
        </p>

        <a
          href="https://www.glynneai.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="relative ml-2 inline-block px-4 py-2 text-xs font-semibold bg-black text-white rounded-lg shadow-md overflow-hidden group transition-all duration-300"
        >
          {/* ✨ Barrido solo en hover */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10">Contactar</span>
        </a>
      </div>
    </div>
  );
}
