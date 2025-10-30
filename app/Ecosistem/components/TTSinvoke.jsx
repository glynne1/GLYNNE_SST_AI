'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function DiscoverGlyAI() {
  const handleClick = () => {
    window.open('https://www.linkedin.com/in/alexander-quiroga-a992452b4/', '_blank');
  };

  return (
    <div className="w-full flex justify-center mt-3">
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-800 rounded-full text-[11px] md:text-xs shadow-sm border border-gray-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 ease-out backdrop-blur-sm"
      >
        {/* ICONO CON EFECTO TORNASOL */}
        <span className="relative flex items-center justify-center">
          <Star
            size={12}
            className="text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text animate-gradient"
          />
          {/* Halo tornasolado */}
          <span className="absolute inset-0 blur-[2px] bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 opacity-60 animate-gradient rounded-full"></span>
        </span>

        <span className="font-medium">Descubre quién es GLYNNE!</span>
      </button>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
