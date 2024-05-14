// src/components/Sidenav.tsx
import React from "react";
import { MdClear } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { motion } from "framer-motion";

interface SidenavProps {
  setopen: (open: boolean) => void;
}

const Sidenav: React.FC<SidenavProps> = ({ setopen }) => {
  const maindivVarient = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const sidebarVarient = {
    hidden: {
      x: 100,
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      x: 100,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={maindivVarient}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={() => setopen(false)}
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[5.5px] z-50">
      <motion.div
        variants={sidebarVarient}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col fixed top-0 right-0 bg-white w-[300px] h-full z-50">
        <div
          onClick={() => setopen(false)}
          className="mt-5 pr-12 pl-50 cursor-pointer">
          <div className="float-right">
            {" "}
            <MdClear size={30} />
          </div>
        </div>
        {/* Each link here can be further improved or abstracted */}
        <a>Existing Inventory</a>
        <a> Used Inventory</a>
        <a>Trade-In</a>
        <a>Test Drive</a>
        <a> Cybertruck</a>
        <a> Roadster</a>
        <a> Semi</a>
        <a> Charging</a>
        <a> Powerwall</a>
        <a> Commercial Energy</a>
        <a> Utilities</a>
        <a> Find Us</a>
        <a> Support</a>
        <a> Investor Relations</a>
        <div className="py-2.5 px-12 cursor-pointer flex items-center text-sm">
          <AiOutlineGlobal size={30} className="pr-2.5" />
          United States
          <br />
          English
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidenav;
