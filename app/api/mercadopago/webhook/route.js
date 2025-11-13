import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('📩 Webhook recibido:', data);

    // Aquí puedes guardar en Supabase o actualizar el estado del usuario
    // Ejemplo: si el pago fue aprobado, activar suscripción
    if (data.type === 'payment' && data.data?.id) {
      console.log('💰 Pago confirmado con ID:', data.data.id);
      // Puedes consultar el pago con el SDK si quieres validar más
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error en webhook Mercado Pago:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
