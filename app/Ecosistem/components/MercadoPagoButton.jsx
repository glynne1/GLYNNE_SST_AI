'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function MercadoPagoButton({ title, price, email }) {
  useEffect(() => {
    const loadCheckout = async () => {
      const res = await fetch('/api/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, email }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point; // Redirige al checkout de MP
      }
    };

    loadCheckout();
  }, []);

  return (
    <>
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="lazyOnload" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Ir a pagar con Mercado Pago
      </button>
    </>
  );
}
