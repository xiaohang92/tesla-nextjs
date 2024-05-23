// src/components/HomeSection.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import useWindowWidth from "@/hooks/useWindowWidth"; // Adjust the path
import { StaticImageData } from "next/image"; // Import type for static images
import Link from "next/link";

interface HomeSectionProps {
  model: string;
  order: string;
  orderlink: string;
  btn1?: string;
  btn2?: string;
  btn3?: string;
  btn4?: string;
  imgDesktop: StaticImageData;
  imgMobile: StaticImageData;
  alt: string;
  copyright?: boolean;
  textColor?: string;
  id: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  model,
  order,
  orderlink,
  btn1,
  btn2,
  btn3,
  btn4,
  imgDesktop,
  imgMobile,
  alt,
  copyright,
  textColor,
  id,
}) => {
  // Component logic remains the same
  // Define motion variants for the fade effect
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const screenWidth = useWindowWidth(); // Custom hook to get screen width
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imgSrc = screenWidth >= 768 ? imgDesktop : imgMobile; // Choose image based on screen width

  return (
    <div
      id={id}
      className="flex flex-col justify-around items-center snap-start h-screen w-full relative">
      {mounted && (
        <Image
          src={imgSrc}
          alt={alt}
          className="absolute z-[-1]"
          style={{ objectFit: "cover", objectPosition: "center" }}
          fill
        />
      )}

      <motion.div
        className="z-20 w-full flex flex-col items-center mt-auto pb-[5vh] text-center gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeUpVariants}>
        <div>
          <h2 className="text-2xl font-bold">{model}</h2>
          <p className="font-normal text-base">
            {order}
            <a className="underline" style={{ color: textColor }}>
              {orderlink}
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {btn1 && (
            <Link href={`/order/${id}`}>
              <button className="bg-[#171a20c9] text-white w-64 px-3 py-3 rounded-full uppercase font-bold cursor-pointer">
                {btn1}
              </button>
            </Link>
          )}
          {btn2 && (
            <Link href={`/drive/${id}`}>
              <button className="bg-white bg-opacity-60 text-[#393c41] w-64 px-3 py-3 rounded-full uppercase font-bold cursor-pointer transform hover:-translate-y-1 transition duration-400">
                {btn2}
              </button>
            </Link>
          )}
          {btn3 && (
            <button className="bg-white bg-opacity-60 text-[#393c41] w-64 px-3 py-3 rounded-full uppercase font-bold cursor-pointer transform hover:-translate-y-1 transition duration-400">
              {btn3}
            </button>
          )}
          {btn4 && (
            <button className="bg-[#171a20c9] text-white w-64 px-3 py-3 rounded-full uppercase font-bold cursor-pointer">
              {btn4}
            </button>
          )}
        </div>
      </motion.div>
      {copyright && (
        <p className="text-center mb-2.5 text-xs">
          Tesla &nbsp; ©&nbsp; {new Date().getFullYear()}&nbsp; Privacy&nbsp;
          &&nbsp; Legal&nbsp; Contact&nbsp; Careers&nbsp; News&nbsp; Engage
          &nbsp;Locations
        </p>
      )}
    </div>
  );
};

export default HomeSection;
