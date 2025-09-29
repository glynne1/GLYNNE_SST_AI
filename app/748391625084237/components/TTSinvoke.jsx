'use client';

import React from 'react';

export default function DiscoverGlyAI() {
  const handleClick = () => {
    window.open('https://www.glynneai.com/integracion', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="text-xs md:text-sm underline underline-offset-2 hover:opacity-90 transition-opacity duration-150 focus:outline-none"
      aria-haspopup="false"
    >
      descubre ideas con GLYai
    </button>
  );
}
