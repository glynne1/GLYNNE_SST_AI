'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatSimple() {
  const [input, setInput] = useState('');
  const [lastMessage, setLastMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  const [showCaptions, setShowCaptions] = useState(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const canvasRef = useRef(null);
  const frequencyData = useRef(null);
  const analyserRef = useRef(null);
  const animationIdRef = useRef(null);
  const audioCtxRef = useRef(null);

  const API_URL = 'http://localhost:8000';

  // 🔊 Reproducir audio y alimentar el AnalyserNode (del segundo código)
  const reproducirAudio = (audioBase64) => {
    return new Promise((resolve) => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 128;
        frequencyData.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }

      const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.crossOrigin = 'anonymous';

      // Conectar al AnalyserNode
      const source = audioCtxRef.current.createMediaElementSource(audio);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);

      audio.onended = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };

      audio.play().catch(() => resolve());
    });
  };

  // 🎨 Animación del canvas (manteniendo del primer código)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();

    const draw = () => {
      if (analyserRef.current && frequencyData.current) {
        analyserRef.current.getByteFrequencyData(frequencyData.current);
      }

      const width = canvas.width;
      const height = canvas.height;
      const numBars = frequencyData.current ? frequencyData.current.length : 0;
      const spacing = 4;
      const totalSpacing = spacing * (numBars - 1);
      const barWidth = numBars > 0 ? (width - totalSpacing) / numBars : 0;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < numBars; i++) {
        const value = frequencyData.current?.[i] || 0;
        const barHeight = (value / 255) * height;
        const x = i * (barWidth + spacing);
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, 'rgba(255, 240, 200, 0.1)');
        gradient.addColorStop(0.3, 'rgba(255, 120, 39, 0.5)');
        gradient.addColorStop(0.6, 'rgba(255, 159, 94, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 80, 0, 1)');

        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(255, 120, 40, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // 🎙️ Configurar SpeechRecognition (manteniendo del primer código)
  useEffect(() => {
    const id = `user_${Math.floor(Math.random() * 90000) + 10000}`;
    setUserId(id);

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setIsRecording(false);
        setIconVisible(true);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lastMessage]);

  useEffect(() => {
    if (input.trim() && !isLoading) {
      sendMessage();
    }
  }, [input, isLoading]);

  const animateMessage = (text, audioBase64) => {
    setDisplayedMessage([]);
    const cleanText = text
      .replace(/\s+/g, ' ')
      .replace(/\s([.,!?])/g, '$1')
      .replace(/([.,!?])(\w)/g, '$1 $2')
      .trim();

    const words = cleanText.split(' ');
    let currentIndex = 0;

    // 🔊 Reproducir el audio usando la función del segundo código
    if (audioBase64) {
      reproducirAudio(audioBase64);
    }

    const addWord = () => {
      if (currentIndex < words.length) {
        setDisplayedMessage((prev) => [...prev, words[currentIndex]]);
        currentIndex++;
        const delay = words[currentIndex - 1].length > 8 ? 100 : 70;
        setTimeout(addWord, delay);
      }
    };
    addWord();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const mensaje = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/conversar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: mensaje, user_id: userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const aiMsg = data.respuesta_asistente || 'No se recibió respuesta';
      const audioBase64 = data.audio_base64;
      
      setLastMessage(aiMsg);
      animateMessage(aiMsg, audioBase64);
    } catch (err) {
      const errorMsg = `Error: ${err.message}`;
      setLastMessage(errorMsg);
      animateMessage(errorMsg);
      console.error('Error enviando mensaje:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleConversation = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIconVisible(true);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      setIconVisible(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      <div className="flex-1 px-4 py-2 flex flex-col justify-end overflow-y-auto">
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ Contenido ajustado al contenedor (manteniendo estilos exactos del primer código) */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative rounded-full px-4 py-3 shadow-lg w-[250px] h-[250px] flex items-center justify-center cursor-pointer transition-opacity duration-1000 ease-in-out ${
              isRecording ? 'bg-cover bg-center' : 'bg-[100] bg-center'
            }`}
            onClick={toggleConversation}
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/originals/24/e1/b5/24e1b51dcfaf8b9d7aeb5d49e91be623.gif')",
            }}
          >
            <div className="rounded-full overflow-hidden w-[200px] h-[200px] backdrop-blur-md relative">
              <canvas ref={canvasRef} className="w-full h-full block" />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  iconVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                }`}
              >
                <img src="/logo.png" alt="Logo" className="w-15 h-15 object-contain" />
              </div>
            </div>
          </div>

          {isRecording && (
            <div className="mt-6 text-xs text-gray-500 font-light relative overflow-hidden">
              <span className="relative z-10">Escuchando...</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide" />
            </div>
          )}

          {/* 🚀 Botón subtítulos */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowCaptions((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <span className="text-[10px] text-gray-700">subtítulos</span>
            </button>
          </div>
        </div>

        {/* 🎬 Subtítulos (manteniendo estilos exactos) */}
        {showCaptions && displayedMessage.length > 0 && (
          <div className="mt-4 w-full flex justify-center">
            <div className="bg-white/90 p-8 rounded-2xl shadow-lg max-w-[50vw] text-center">
              <div className="flex flex-wrap justify-center gap-2 text-gray-900 text-sm md:text-base leading-snug">
                {displayedMessage.map((word, index) => (
                  <span
                    key={index}
                    className="inline-block opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.08}s`, marginRight: '0.3rem' }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.4s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
        .animate-slide {
          animation: slide 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}