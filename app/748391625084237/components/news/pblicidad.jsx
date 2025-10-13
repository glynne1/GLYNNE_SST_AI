'use client';

import Image from 'next/image';

export default function GlynneSidebar() {
  const backgroundImageUrl =
    'https://i.pinimg.com/1200x/18/dc/26/18dc26a2d817f311fd2b4e0f432da6b4.jpg';

  return (
    <aside
      aria-label="GLYNNE Sidebar"
      className="relative w-full h-screen flex flex-col items-center justify-center p-6 shadow-sm bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      {/* 🔹 Capa polarizada oscura */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* 🔹 Contenedor centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 text-white">
        {/* Logo */}
        <div className="relative w-20 h-20">
          <Image
            src="/logo.png"
            alt="GLYNNE logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Texto principal */}
        <div className="text-center max-w-[240px]">
          <h1 className="text-sm font-semibold leading-snug tracking-tight">
            Cómo GLYNNE revoluciona la IA
          </h1>
          <p className="mt-2 text-[11px] font-light leading-snug text-gray-300">
            ¿Qué esperas para que tu negocio y tu vida se adapten a la IA?
            <br />
            GLYNNE transforma procesos, acelera decisiones y libera tiempo
            <br />
            para lo que realmente importa.
          </p>
        </div>

        {/* QR y texto */}
        <div className="flex flex-col items-center text-center space-y-3 mt-4">
          <div className="w-28 h-28 relative">
            <Image
              src="/qrGLY.png"
              alt="Código QR GLYNNE"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <p className="text-[11px] text-gray-300 font-light leading-snug max-w-[180px]">
            Escanea este código QR para ingresar al <br />
            <strong className="text-white font-medium">
              ecosistema GLYNNE Mobile
            </strong>
          </p>
        </div>
      </div>
    </aside>
  );
}
