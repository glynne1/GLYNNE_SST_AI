import { NextResponse } from 'next/server';
import Mercadopago from 'mercadopago';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔧 Crear una instancia del cliente de Mercado Pago
    const client = new Mercadopago.MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = {
      items: [
        {
          title: body.title || 'Suscripción SaaS Plan Pro',
          quantity: 1,
          unit_price: body.price || 30000,
          currency_id: 'COP',
        },
      ],
      payer: {
        email: body.email || 'cliente@test.com',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
    };

    // 🔧 Crear la preferencia usando el cliente moderno
    const preferenceClient = new Mercadopago.Preference(client);
    const result = await preferenceClient.create({ body: preference });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    );
  }
}
