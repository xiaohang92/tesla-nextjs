// src/components/NavBar.tsx
"use client";
import Image from "next/image";
import logo from "/public/teslalogo.svg";
import { useRouter, usePathname } from "next/navigation"; // Import NextRouter
import React, { useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // Import VariantLabels and TargetAndTransition
import { getCookie } from "cookies-next";

const Sidenav = React.lazy(() => import("./Sidenav")); // Lazy-load the Sidenav component

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
    // If the user does not have cookies, redirect to the login page
    if (!getCookie("id")) router.push("/login");
    // If the user has cookies, redirect to the account page
    else router.push("/account");
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
          <motion.div
            onClick={handleAccountClick}
            className="mx-2 cursor-pointer p-1 rounded-lg "
            variants={hoverVariant}
            whileHover="hover">
            Account
          </motion.div>
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
