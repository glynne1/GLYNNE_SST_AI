'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatTTS() {
  const [input, setInput] = useState('');
  const [lastMessage, setLastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const API_URL = 'http://localhost:8000'; // tu backend
  const audioRef = useRef(null);

  useEffect(() => {
    const id = `user_${Math.floor(Math.random() * 90000) + 10000}`;
    setUserId(id);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const mensaje = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, user_id: userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const aiMsg = data.respuesta || 'No se recibió respuesta';
      setLastMessage(aiMsg);

      await playWithEdgeTTS(aiMsg);
    } catch (err) {
      console.error('Error enviando mensaje:', err);
      setLastMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const playWithEdgeTTS = async (text) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-CO';
      utterance.rate = 1;
      utterance.pitch = 1;

      const voices = speechSynthesis.getVoices();
      const colombian = voices.find((v) => v.lang === 'es-CO');
      if (colombian) utterance.voice = colombian;

      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error al reproducir con EdgeTTS:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full">
        <textarea
          className="w-full p-3 border rounded-lg text-sm"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="mt-3 w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>

        {lastMessage && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-sm text-gray-800">{lastMessage}</p>
          </div>
        )}
      </div>
      <audio ref={audioRef} hidden />
    </div>
  );
}
