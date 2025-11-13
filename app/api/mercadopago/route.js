import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

export const runtime = 'nodejs'; // 👈 evita el error de compilación

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const preference = {
      items: [
        {
          title: body.title || 'Suscripción SaaS Plan Pro',
          quantity: 1,
          unit_price: body.price || 30000,
          currency_id: 'COP',
        },
      ],
      payer: { email: body.email || 'cliente@test.com' },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
    };

    const result = await mercadopago.preferences.create(preference);
    return NextResponse.json({ init_point: result.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json({ error: 'Error al crear preferencia' }, { status: 500 });
  }
}
