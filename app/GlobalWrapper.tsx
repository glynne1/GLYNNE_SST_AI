"use client";

import { useEffect } from "react";

export default function GlobalWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Estado fantasma inicial
    window.history.pushState(null, "", window.location.href);

    // Captura la navegación atrás
    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);

  return <>{children}</>;
}
