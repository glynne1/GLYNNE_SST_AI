import { supabase } from "../../lib/supabaseClient";

export async function POST(req) {
  try {
    const { api_key, mensaje } = await req.json();

    if (!api_key || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Faltan api_key o mensaje" }),
        { status: 400 }
      );
    }

    // 🔹 Buscar agente por API key pública
    const { data, error } = await supabase
      .from("auditorias")
      .select("user_config")
      .ilike("user_config->>public_api_key", api_key)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: "API key inválida" }),
        { status: 401 }
      );
    }

    const agentConfig = data.user_config;

    // 🔹 Recuperar conversación previa si quieres
    const conversation = agentConfig.conversation || [];

    // 🔹 Agregar mensaje del usuario al historial temporal
    conversation.push({ from: "user", text: mensaje });

    // 🔹 Aquí puedes llamar a la misma función que procesa el mensaje
    // Por ejemplo, si antes hacías fetch a tu motor interno:
    const apiURL =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://generative-glynne-motor.onrender.com";

    const res = await fetch(`${apiURL}/dynamic/agent/chat/full`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensaje,
        agent_config: agentConfig,
      }),
    });

    const dataBot = await res.json();
    const botReply = dataBot.reply || "No recibí respuesta";

    // 🔹 Actualizar conversación temporal (opcional)
    conversation.push({ from: "bot", text: botReply });

    // 🔹 Guardar en Supabase si quieres mantener el historial
    await supabase
      .from("auditorias")
      .update({ user_config: { ...agentConfig, conversation } })
      .eq("user_config->>public_api_key", api_key);

    return new Response(JSON.stringify({ reply: botReply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error en /external-agent:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
