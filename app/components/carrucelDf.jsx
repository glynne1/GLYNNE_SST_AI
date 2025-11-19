"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/iconServises/Gmail_Logo.svg", name: "Gmail" },
  { src: "/iconServises/icons8-facebook (1).svg", name: "Facebook" },
  { src: "/iconServises/Google_Drive_Logo.svg", name: "Google Drive" },
  { src: "/iconServises/icons8-whatsapp-logo.svg", name: "WhatsApp" },
  { src: "/iconServises/icons8-google-calendar.svg", name: "Google Calendar" },
  { src: "/iconServises/icons8-instagram.svg", name: "Instagram" },
  { src: "/iconServises/icons8-google-meet.svg", name: "Google Meet" },
  { src: "/iconServises/icons8-threads.svg", name: "Threads" },
];

export default function CarouselLogos() {
  const loopLogos = [...logos, ...logos];

  return (
    <div className="carousel-glynne-container w-full overflow-hidden py-8">

      {/* ======== TÍTULO ARRIBA ======== */}
      <h2 className="carousel-title">Conecta con tus servicios favoritos</h2>

      <div className="carousel-glynne-wrapper relative w-full">

        <motion.div
          className="carousel-glynne-track flex flex-nowrap whitespace-nowrap gap-6 min-w-max"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 28,
            ease: "linear",
          }}
        >
          {loopLogos.map((item, i) => (
            <div
              key={i}
              className="carousel-glynne-item flex flex-col items-center justify-center min-w-[130px] bg-white rounded-xl p-4 shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.name}
                width={70}
                height={70}
                className="carousel-glynne-img object-contain"
              />
              <p className="carousel-glynne-text text-sm font-semibold mt-2 text-gray-500">
                {item.name}
              </p>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ======== DESCRIPCIÓN ABAJO ======== */}
      <p className="carousel-description">
        Este panel muestra algunos de los servicios compatibles con Glynne AI.
      </p>

      {/* ======== ESTILOS LOCALES (SIN GLOBAL) ======== */}
      <style jsx>{`
        .carousel-title {
          text-align: center;
          font-size: 2rem;         /* MÁS GRANDE */
          font-weight: 800;
          color: #222;
          margin-bottom: 30px;     /* MÁS ESPACIO CON LAS CARDS */
        }

        .carousel-description {
          text-align: center;
          font-size: 0.85rem;      /* UN POCO MÁS LEGIBLE */
          color: #777;
          margin-top: 25px;         /* ESPACIO DESPUÉS DEL CARRUSEL */
        }

        .carousel-glynne-container * {
          isolation: isolate;
        }

        .carousel-glynne-container,
        .carousel-glynne-wrapper,
        .carousel-glynne-track,
        .carousel-glynne-item {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
