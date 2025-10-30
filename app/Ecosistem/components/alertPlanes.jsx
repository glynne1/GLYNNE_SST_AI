'use client';

export default function AlertUpgrade() {
  return (
    <div className="absolute bottom-4 w-full flex justify-center">
      <div className="relative max-w-xs text-[11px] text-black bg-[#fff] px-3 py-2 rounded-lg shadow-sm overflow-hidden border border-gray-200 flex items-center justify-between gap-2">
        <p className="relative z-10 whitespace-nowrap">
          <strong>Optimiza tu negocio</strong>
        </p>

        <a
          href="https://www.glynneai.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block px-3 py-[4px] text-[10px] font-semibold bg-black text-white rounded-md shadow-sm overflow-hidden group transition-all duration-300"
        >
          {/* ✨ Barrido solo en hover */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10">Abrir</span>
        </a>
      </div>
    </div>
  );
}
