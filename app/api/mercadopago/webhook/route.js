import { NextResponse } from 'next/server';
export const runtime = 'nodejs'; // 👈 agrega esto también

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('📩 Webhook recibido:', data);

    if (data.type === 'payment' && data.data?.id) {
      console.log('💰 Pago confirmado con ID:', data.data.id);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error en webhook Mercado Pago:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
