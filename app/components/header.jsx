'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState('/logo.png');

  useEffect(() => {
    const main1 = document.querySelector('#main1');
    const main2 = document.querySelector('#main2');

    if (!main1 || !main2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'main2' && entry.isIntersecting) {
            // ✅ Cuando Main2 entra
            setCurrentLogo('/logo2.png');
          } else if (entry.target.id === 'main1' && entry.isIntersecting) {
            // ✅ Cuando Main1 entra nuevamente
            setCurrentLogo('/logo.png');
          }
        });
      },
      { threshold: 0.5 } // 50% visible para hacer el cambio
    );

    observer.observe(main1);
    observer.observe(main2);

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-500`}
    >
      <img
        src={currentLogo}
        alt="Logo"
        className="h-10 sm:h-12 md:h-14 cursor-pointer transition-all duration-500"
        onClick={() => (window.location.href = 'https://www.glynneai.com/')}
      />
    </header>
  );
}
