'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';

export default function IntroCodeSection({ show = true, API_URL = 'https://gly-chat-v1-2.onrender.com' }) {
  if (!show) return null;

  const examples = [
    {
      lang: 'JavaScript',
      code: [
        { type: 'keyword', text: 'const' }, { text: ' sendMessage = ' }, { type: 'keyword', text: 'async' }, { text: ' () => {' },
        { text: '\n  ' },
        { type: 'keyword', text: 'const' }, { text: ' r = ' }, { type: 'keyword', text: 'await' }, { text: ' fetch(' },
        { type: 'string', text: `\`${API_URL}/chat\`` }, { text: ', {' },
        { text: '\n    method: ' }, { type: 'string', text: `'POST'` }, { text: ',' },
        { text: '\n    headers: { ' }, { type: 'string', text: `'Content-Type'` }, { text: ': ' }, { type: 'string', text: `'application/json'` }, { text: ' },' },
        { text: '\n    body: JSON.stringify({ mensaje: input })\n  });' },
        { text: '\n  ' }, { type: 'keyword', text: 'const' }, { text: ' d = ' }, { type: 'keyword', text: 'await' }, { text: ' r.json();' },
        { text: '\n  console.log(d);\n};' },
      ]
    },
    {
      lang: 'TypeScript',
      code: [
        { type: 'keyword', text: 'const' }, { text: ' sendMessage = ' }, { type: 'keyword', text: 'async' }, { text: ' (): Promise<void> => {' },
        { text: '\n  ' },
        { type: 'keyword', text: 'const' }, { text: ' r = ' }, { type: 'keyword', text: 'await' }, { text: ' fetch(' },
        { type: 'string', text: `\`${API_URL}/chat\`` }, { text: ', {' },
        { text: '\n    method: ' }, { type: 'string', text: `'POST'` }, { text: ',' },
        { text: '\n    headers: { ' }, { type: 'string', text: `'Content-Type'` }, { text: ': ' }, { type: 'string', text: `'application/json'` }, { text: ' },' },
        { text: '\n    body: JSON.stringify({ mensaje: input })\n  });' },
        { text: '\n  ' }, { type: 'keyword', text: 'const' }, { text: ' d: any = ' }, { type: 'keyword', text: 'await' }, { text: ' r.json();' },
        { text: '\n  console.log(d);\n};' },
      ]
    },
    {
      lang: 'Python',
      code: [
        { type: 'keyword', text: 'import' }, { text: ' requests\n' },
        { type: 'keyword', text: 'import' }, { text: ' json\n\n' },
        { type: 'keyword', text: 'def' }, { text: ' send_message(mensaje):\n' },
        { text: '    response = requests.post(\n' },
        { text: '        f"' }, { type: 'string', text: `${API_URL}/chat` }, { text: '",\n' },
        { text: '        headers={ ' }, { type: 'string', text: `'Content-Type'` }, { text: ': ' }, { type: 'string', text: `'application/json'` }, { text: ' },\n' },
        { text: '        data=json.dumps({\'mensaje\': mensaje})\n' },
        { text: '    )\n' },
        { text: '    d = response.json()\n' },
        { text: '    print(d)' },
      ]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevExample = () => setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  const nextExample = () => setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  const copyToClipboard = () => navigator.clipboard.writeText(examples[currentIndex].code.map(c => c.text).join(''));

  const renderCode = (codeArray) => codeArray.map((c, i) => {
    let color = 'text-neutral-800';
    if (c.type === 'keyword') color = 'text-sky-600';
    if (c.type === 'string') color = 'text-emerald-600';
    return <span key={i} className={color}>{c.text}</span>;
  });

  return (
    <div className="flex justify-center items-start w-full bg-white p-4 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-center w-[80%] bg-white shadow-md rounded-2xl p-4 border border-gray-100">

        {/* Texto descriptivo */}
<div className="flex-1 text-left md:pr-6 w-[30%] flex flex-col justify-center">
  <h2 className="text-base font-semibold text-gray-800 mb-1">
    Conecta tu Framework con GLYNNE AI
  </h2>
  <p className="text-xs text-gray-500 leading-snug">
    Usa este fragmento para vincular tu cliente con el backend del chat
    y comenzar a procesar mensajes de manera inteligente.
  </p>
</div>

        {/* Contenedor del código */}
        <div className="flex flex-col w-full md:w-[70%] mt-3 md:mt-0">
          
          {/* Header estilo ventana Mac */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="ml-2 font-semibold text-neutral-600 text-xs">{examples[currentIndex].lang}</span>
              <button onClick={prevExample} className="ml-2 p-1 rounded hover:bg-gray-200 transition"><ArrowLeft className="w-3 h-3 text-gray-600" /></button>
              <button onClick={nextExample} className="p-1 rounded hover:bg-gray-200 transition"><ArrowRight className="w-3 h-3 text-gray-600" /></button>
            </div>
            <button onClick={copyToClipboard} className="p-1 rounded hover:bg-gray-200 transition">
              <Copy className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* Bloque de código */}
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
