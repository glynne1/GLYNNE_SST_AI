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
    <div className="w-full overflow-hidden py-8">
      <div className="relative w-full">

        {/* CARRUSEL */}
        <motion.div
          className="flex gap-6"
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
              className="flex flex-col items-center justify-center min-w-[130px] 
                         bg-[#fff] rounded-xl p-4 shadow-sm "
            >
              <Image
                src={item.src}
                alt={item.name}
                width={70}   
                height={70}
                className="object-contain"
              />
              <p className="text-sm font-semibold mt-2 text-gray-500">
                {item.name}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
