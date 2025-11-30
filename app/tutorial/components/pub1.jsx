import React, { useState } from 'react';

export default function SocialPost() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Abrir solo si el ancho es mayor a 800px
  const handleImageClick = (src) => {
    if (window.innerWidth > 800) {
      setSelectedImage(src);
    }
  };

  const images = [
    { src: "/panelIACreate/agentPanel1.png", text: "Panel inicial de GLYNNE" },
    { src: "/panelIACreate/agentPanel2.png", text: "Un vistazo a nuestros modelos predefinidos." },
    { src: "/panelIACreate/agentPanel3.png", text: "Chatea con los modelos ia que creas en nuestro panel" },
    { src: "/panelIACreate/agentPanel4.png", text: "Exporta tus modelos creados y conectalos al ecosistema GLYNNE" },
    { src: "/panelIACreate/agentPanel5.png", text: "Controla y edita tus agentes" },
    { src: "/panelIACreate/redes.png", text: "Conectalos a tus herramientas o servicios" }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] overflow-hidden mt-12">

      {/* Texto arriba */}
      <div className="p-6 sm:p-8 md:p-10 bg-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none mb-4">
          Fragmentos & Herramientas
        </h2>
        <p className="text-gray-600 text-sm max-w-xl">
          Explora piezas visuales del ecosistema GLYNNE: fragmentos, herramientas, pantallas
          y prototipos que puedes integrar directamente en tus proyectos.  
          Este formato muestra ejemplos reales tal como se presentan en la plataforma.
        </p>
      </div>

      {/* Grilla */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 bg-gray-100">
        {images.map((item, index) => (
          <div key={index} className="relative h-[180px] sm:h-[200px] md:h-[220px] bg-gray-300 cursor-pointer">
            <img
              src={item.src}
              alt={item.text}
              className="w-full h-full object-cover"
              onClick={() => handleImageClick(item.src)}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xs p-2">
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* Modal imagen grande (solo desktop) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-[80%] max-h-[80%]">
            <img
              src={selectedImage}
              alt="preview"
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-5 bg-white flex items-center justify-between text-xs text-gray-500">
        <span>GLYNNE Tools Preview</span>
        <span>Instagram · YouTube</span>
      </div>

    </div>
  );
}
