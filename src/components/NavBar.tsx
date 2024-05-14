// src/components/NavBar.tsx
"use client";
import Image from "next/image";
import logo from "/public/teslalogo.svg";
import { useRouter, usePathname } from "next/navigation"; // Import NextRouter
import React, { useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // Import VariantLabels and TargetAndTransition

const Sidenav = React.lazy(() => import("./Sidenav")); // Lazy-load the Sidenav component

// interface HoverVariants {
//   hover: {
//     backgroundColor: string;
//     borderRadius: string;
//     transition: {
//       type: "spring";
//       stiffness: number;
//       duration: number;
//     };
//   };
// }

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const data = [
    { model: "Model S", key: "model-s" },
    { model: "Model Y", key: "model-y" },
    { model: "Model 3", key: "model-3" },
    { model: "Model X", key: "model-x" },
    { model: "Solar Panels", key: "solar-panels" },
    { model: "Solar Roof", key: "solar-roof" },
    { model: "Accessories", key: "accessories" },
  ];

  const router = useRouter(); // Update the type of router
  const pathname = usePathname();

  const hoverVariant = {
    hover: {
      backgroundColor: "#393c4115",
      borderRadius: "10px",
      transition: {
        type: "spring",
        stiffness: 110,
        duration: 0.4,
      },
    },
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAccountClick = () => {
    // if (isLoggedIn()) {
    //   router.push("/account");
    // } else {
    router.push("/login");
    // }
  };

  return (
    <>
      <nav className="fixed top-0 z-10 flex w-full items-center justify-between bg-transparent py-5 px-5">
        <Link href="/">
          <div className="cursor-pointer">
            <Image src={logo} width={120} alt="logo" />
          </div>
        </Link>
        {pathname === "/" && (
          <div className="hidden ml-20 md:flex">
            {data.map((item) => (
              <motion.div
                key={item.key}
                // onClick={() => router.push(`#${item.key}`)}
                onClick={() => scrollToElement(item.key)}
                className="mx-2 cursor-pointer p-1 rounded-lg transition duration-150 ease-in-out"
                whileHover="hover"
                variants={hoverVariant}>
                {item.model}
              </motion.div>
            ))}
          </div>
        )}
        <div className="flex items-center">
          {/* <div className="hidden md:flex">
            <motion.div
              onClick={() => {}}
              className="mx-2 cursor-pointer p-1 rounded-lg "
              variants={hoverVariant}
              whileHover="hover">
              Shop
            </motion.div>
          </div> */}
          <motion.div
            onClick={handleAccountClick}
            className="mx-2 cursor-pointer p-1 rounded-lg "
            variants={hoverVariant}
            whileHover="hover">
            Account
          </motion.div>

          {/* <motion.div
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-1 rounded-lg"
            variants={hoverVariant}
            whileHover="hover">
            {" "}
          </motion.div> */}
        </div>
      </nav>
      {open && (
        <Suspense fallback={<div>Loading...</div>}>
          <Sidenav setopen={setOpen} />
        </Suspense>
      )}
    </>
  );
};

export default NavBar;
