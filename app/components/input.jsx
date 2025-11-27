'use client';

import { motion } from 'framer-motion';
import { Mic, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { LoginPopup } from './LoginPopup';
import ServiceCards from './cards'; // 👈 Componente de tarjetas
import Carrucel from './carrucelDf';
import ExText from './textoHme'
import ExText2 from './textoHome2'
import CardTec from './cardsTecnlgias'
import Diagrama from './diagrama'

export default function VoiceInput() {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInput(transcript);
        };

        recognition.onerror = (event) => {
          console.error('Error de reconocimiento de voz:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('⚠️ SpeechRecognition no es compatible con este navegador.');
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (!isRecording) {
      setInput('');
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    localStorage.removeItem('glyiaChatClosed');
    setShowLoginModal(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center mt-10 px-4 space-y-6">
  

     

   

          {/* 🔹 TÍTULO */}
          <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900 uppercase"
      >
        CONOCE NUESTRAS HERRAMIENTAS
      </motion.h2>
       {/* 🔹 INPUT con grabador funcional */}
       <div className="w-full max-w-3xl relative flex items-center gap-2 mt-4 z-10">
        <div className="relative flex-1 z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hablemos de IA"
            className="w-full px-4 py-4 rounded-full text-lg bg-white outline-none relative z-10 placeholder-gray-500 text-gray-900"
            style={{ border: '2px solid transparent', backgroundClip: 'padding-box' }}
          />

          {/* 🔹 Borde animado */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none z-0"
            style={{
              background:
                'linear-gradient(90deg, #0f172a, #312e81, #ffffff, #2563eb, #0891b2, #064e3b)',
              backgroundSize: '300% 300%',
              animation: 'shine 2.5s linear infinite',
              borderRadius: '9999px',
              padding: '2px',
            }}
          />

          {/* 🔹 Botón dinámico (Mic / Send) */}
          {input.trim() ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 bg-black text-white transition-colors"
            >
              <Send size={18} />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleRecording}
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 transition-colors ${
                isRecording ? 'bg-red-600 text-white' : 'bg-black text-white'
              }`}
            >
              <Mic size={18} />
            </motion.button>
          )}
        </div>

        <style jsx>{`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>

     {/* 🔹 TEXTO DESCRIPTIVO */}
<motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="max-w-2xl text-gray-400 text-[0.75rem] sm:text-sm leading-snug mt-3 lowercase tracking-wide"
>
Explicar tu negocio a una IA es lento y frustrante. Nuestros agentes entienden tu operación en minutos, hacen las preguntas correctas y ejecutan tareas autónomas. <span className="font-semibold text-gray-600"> Automatización que funciona desde el día uno</span>  sin código, sin sorpresas.
</motion.p>



{/* ===================================================================================== */}
{/* 🔥 SECCIÓN 1: CARRUSEL + EXTEXT (AGRUPACIÓN VISUAL) */}
{/* ===================================================================================== */}

<div className="w-[80%] mt-10 relative z-0 isolate space-y-10">

  {/* Carrusel */}
  <div className="relative w-full">
    <Carrucel />
  </div>

  {/* Texto inferior del carrusel */}
  <div className="relative w-full">
    <ExText />
  </div>

</div>



{/* ===================================================================================== */}
{/* 🔥 SECCIÓN 2: DIAGRAMA PRINCIPAL */}
{/* ===================================================================================== */}

<div className="w-full mt-10 relative z-0 isolate">
  <Diagrama />
</div>



{/* ===================================================================================== */}
{/* 🔥 SECCIÓN 3: CARDS DE SERVICIOS */}
{/* ===================================================================================== */}

<div className="w-full mt-10 relative z-10">
  <ServiceCards />
</div>



{/* ===================================================================================== */}
{/* 🔥 SECCIÓN 4: TEXTO ADICIONAL (ExText2) */}
{/* ===================================================================================== */}

<div className="w-[80%] mt-10 relative z-0 isolate">
  <ExText2 />
</div>



{/* ===================================================================================== */}
{/* 🔥 SECCIÓN 5: CARDS DE TECNOLOGÍAS */}
{/* ===================================================================================== */}

<div className="w-[80%] mt-10 relative z-0 isolate">
  <CardTec />
</div>


      {/* 🔹 MODAL DE LOGIN */}
      <LoginPopup visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
