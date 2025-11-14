"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Copy } from "lucide-react";

export default function IntroCodeSection({
  show = true,
  API_URL = "https://generative-glynne-motor.onrender.com",
}) {
  if (!show) return null;

  // ========================
  // EJEMPLOS DE CÓDIGO
  // ========================
  const examples = [
    // -------------------------------------------------------------
    // JAVASCRIPT
    // -------------------------------------------------------------
    {
      lang: "JavaScript",
      code: [
        { text: "// Cargar JSON del agente\n" },
        { type: "keyword", text: "import" },
        { text: " cfg " },
        { type: "keyword", text: "from" },
        { text: " './NORA.json';\n\n" },

        { type: "keyword", text: "const" },
        { text: " chat = (m) => fetch(" },
        { type: "string", text: `"${API_URL}/dynamic/agent/chat/full"` },
        { text: ", {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n" },
        { text: "  body: JSON.stringify({ agent_config: cfg, mensaje: m })\n}).then(r=>r.json()).then(d=>console.log(d.reply));" },
      ],
    },

    // -------------------------------------------------------------
    // TYPESCRIPT
    // -------------------------------------------------------------
    {
      lang: "TypeScript",
      code: [
        { text: "// Cargar JSON del agente\n" },
        { type: "keyword", text: "import" },
        { text: " cfg " },
        { type: "keyword", text: "from" },
        { text: " './agent.json';\n\n" },

        { type: "keyword", text: "const" },
        { text: " chat = async (m: string): Promise<void> => {\n" },
        { type: "keyword", text: "const" },
        { text: " r = await fetch(" },
        { type: "string", text: `"${API_URL}/dynamic/agent/chat/full"` },
        { text: ", {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ agent_config: cfg, mensaje: m })\n});\n" },
        { type: "keyword", text: "const" },
        { text: " d = await r.json();\nconsole.log(d.reply);\n};" },
      ],
    },

    // -------------------------------------------------------------
    // PYTHON
    // -------------------------------------------------------------
    {
      lang: "Python",
      code: [
        { text: "# Cargar JSON del agente\n" },
        { type: "keyword", text: "import" },
        { text: " json\n" },
        { type: "keyword", text: "import" },
        { text: " requests\n\n" },

        { text: "cfg = json.load(open('agent.json'))\n\n" },
        { type: "keyword", text: "def" },
        { text: " chat(msg):\n" },
        { text: "    r = requests.post(\n" },
        { text: `        "${API_URL}/dynamic/agent/chat/full",\n` },
        { text: "        json={'agent_config': cfg, 'mensaje': msg}\n" },
        { text: "    )\n" },
        { text: "    print(r.json()['reply'])" },
      ],
    },

    // -------------------------------------------------------------
    // NODE.JS
    // -------------------------------------------------------------
    {
      lang: "Node.js",
      code: [
        { text: "// Cargar JSON del agente\n" },
        { type: "keyword", text: "const" },
        { text: " cfg = require('./agent.json');\n\n" },

        { type: "keyword", text: "const" },
        { text: " chat = (m) => fetch(" },
        { type: "string", text: `"${API_URL}/dynamic/agent/chat/full"` },
        { text: ", {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n" },
        { text: "  body: JSON.stringify({ agent_config: cfg, mensaje: m })\n})\n" },
        { text: "  .then(r => r.json())\n  .then(d => console.log(d.reply));" },
      ],
    },

    // -------------------------------------------------------------
    // RUBY
    // -------------------------------------------------------------
    {
      lang: "Ruby",
      code: [
        { text: "# Cargar JSON del agente\n" },
        { type: "keyword", text: "require" },
        { text: " 'json'\n" },
        { type: "keyword", text: "require" },
        { text: " 'net/http'\n\n" },

        { text: "cfg = JSON.parse(File.read('agent.json'))\n\n" },

        { type: "keyword", text: "def" },
        { text: " chat(cfg, msg)\n" },
        { text: "  uri = URI('" },
        { type: "string", text: `${API_URL}/dynamic/agent/chat/full` },
        { text: "')\n" },
        { text: "  r = Net::HTTP.post(uri, {agent_config: cfg, mensaje: msg}.to_json, 'Content-Type' => 'application/json')\n" },
        { text: "  puts JSON.parse(r.body)['reply']\n" },
        { type: "keyword", text: "end" },
      ],
    },

    // -------------------------------------------------------------
    // C#
    // -------------------------------------------------------------
    {
      lang: "C#",
      code: [
        { text: "// Cargar JSON del agente\n" },
        { type: "keyword", text: "var" },
        { text: " cfg = Newtonsoft.Json.JsonConvert.DeserializeObject(System.IO.File.ReadAllText(\"agent.json\"));\n\n" },

        { type: "keyword", text: "var" },
        { text: " body = Newtonsoft.Json.JsonConvert.SerializeObject(new { agent_config = cfg, mensaje = \"Hola\" });\n\n" },

        { type: "keyword", text: "var" },
        { text: " client = new System.Net.Http.HttpClient();\n" },
        { type: "keyword", text: "var" },
        { text: " res = await client.PostAsync(\"" },
        { type: "string", text: `${API_URL}/dynamic/agent/chat/full` },
        { text: "\", new StringContent(body, System.Text.Encoding.UTF8, \"application/json\"));\n" },
        { text: "Console.WriteLine(await res.Content.ReadAsStringAsync());" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevExample = () =>
    setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));

  const nextExample = () =>
    setCurrentIndex((prev) =>
      prev === examples.length - 1 ? 0 : prev + 1
    );

  const copyToClipboard = () =>
    navigator.clipboard.writeText(
      examples[currentIndex].code.map((c) => c.text).join("")
    );

  const renderCode = (codeArray) =>
    codeArray.map((c, i) => {
      let color = "text-neutral-800";
      if (c.type === "keyword") color = "text-sky-600";
      if (c.type === "string") color = "text-emerald-600";
      return (
        <span key={i} className={color}>
          {c.text}
        </span>
      );
    });

  return (
    <div className="flex justify-center items-start w-full bg-white p-4 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-[80%] bg-white shadow-md rounded-2xl p-4 border border-gray-100">
        <div className="flex-1 text-left md:pr-6 w-[30%] flex flex-col justify-center">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Conecta tu agente con GLYNNE AI
          </h2>
          <p className="text-xs text-gray-500 leading-snug">
            Descarga la api JSON de el modelo que debas usar y el archivo ponlo en la misma carpeta que este script, las claves dentro de nuestra API JSON que descargas se conecta a nuesto servicio y permite que exportes los agentes a tus proyectos
          </p>
        </div>

        <div className="flex flex-col w-full md:w-[70%] mt-3 md:mt-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>

              <span className="ml-2 font-semibold text-neutral-600 text-xs">
                {examples[currentIndex].lang}
              </span>

              <button
                onClick={prevExample}
                className="ml-2 p-1 rounded hover:bg-gray-200 transition"
              >
                <ArrowLeft className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={nextExample}
                className="p-1 rounded hover:bg-gray-200 transition"
              >
                <ArrowRight className="w-3 h-3 text-gray-600" />
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className="p-1 rounded hover:bg-gray-200 transition"
            >
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          <div className="w-full bg-neutral-50 text-neutral-800 rounded-lg p-3 font-mono text-xs shadow-inner border border-gray-200 overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-snug text-left">
              <code>{renderCode(examples[currentIndex].code)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
