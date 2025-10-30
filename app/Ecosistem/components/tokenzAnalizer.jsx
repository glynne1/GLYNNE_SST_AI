"use client";
import { useState } from "react";

export default function TokenzAnalizer() {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [tokens, setTokens] = useState({ usuario: 0, llm: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/conversar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: input }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      setRespuesta(data.respuesta_asistente || "");
      setTokens(data.tokens || { usuario: 0, llm: 0, total: 0 });
    } catch (err) {
      console.error("Error enviando al backend:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📊 Analizador de Tokens</h2>

      <textarea
        className="border rounded p-2 w-full"
        rows="3"
        placeholder="Escribe algo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={enviar}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {respuesta && (
        <div className="border p-3 rounded">
          <h3 className="font-semibold">🤖 Respuesta:</h3>
          <p>{respuesta}</p>
        </div>
      )}

      <div className="border p-3 rounded bg-gray-50">
        <h3 className="font-semibold">📈 Tokens usados</h3>
        <ul>
          <li>Usuario: {tokens.usuario}</li>
          <li>LLM: {tokens.llm}</li>
          <li>Total: {tokens.total}</li>
        </ul>
      </div>
    </div>
  );
}
