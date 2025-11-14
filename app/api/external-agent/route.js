import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";

// URL del backend de tus agentes
const apiURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://generative-glynne-motor.onrender.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { agentId, message } = body;

    if (!agentId || !message) {
      return NextResponse.json(
        { error: "agentId y message son obligatorios" },
        { status: 400 }
      );
    }

    // 1️⃣ Obtener configuración del agente desde auditorias
    const { data: agentData, error: agentError } = await supabase
      .from("auditorias")
      .select("*")
      .eq("agent_id", agentId)
      .single();

    if (agentError || !agentData) {
      return NextResponse.json(
        { error: "Agente no encontrado" },
        { status: 404 }
      );
    }

    const agentConfig = agentData.user_config;

    // 2️⃣ Guardar mensaje del usuario
    const userMsg = { from: "external", text: message };

    agentConfig.conversation = [...(agentConfig.conversation || []), userMsg];

    await supabase
      .from("auditorias")
      .update({ user_config: agentConfig })
      .eq("id", agentData.id);

    // 3️⃣ Mandar mensaje al backend IA
    const res = await fetch(`${apiURL}/dynamic/agent/chat/full`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensaje: message,
        agent_config: agentConfig,
      }),
    });

    const data = await res.json();
    const reply = data?.reply || "No hubo respuesta";

    // 4️⃣ Guardar mensaje del BOT
    const botMsg = { from: "bot", text: reply };

    agentConfig.conversation.push(botMsg);

    await supabase
      .from("auditorias")
      .update({ user_config: agentConfig })
      .eq("id", agentData.id);

    // 5️⃣ Retornar la respuesta al cliente externo
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
