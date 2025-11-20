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

export default function StaticServicesGrid() {
  return (
    <div className="w-full py-12">

      {/* ======== TÍTULO ARRIBA ======== */}
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-10">
        Conecta con tus servicios favoritos
      </h2>

      {/* ======== GRID ESTÁTICO ======== */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-4 
          gap-6
          px-4
        "
      >
        {logos.map((item, i) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            key={i}
            className="
              flex flex-col items-center justify-center 
              bg-white border border-gray-200 
              rounded-xl p-4 shadow-sm
            "
          >
            <Image
              src={item.src}
              alt={item.name}
              width={55}
              height={55}
              className="object-contain"
            />
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {item.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ======== DESCRIPCIÓN ABAJO ======== */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Este panel muestra algunos de los servicios compatibles con Glynne AI.
      </p>

    </div>
  );
}
