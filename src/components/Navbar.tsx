"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePlantContext } from "./PlantContext";
import PlantForm from "./PlantForm";

const Navbar = () => {
  const { formVisible, setFormVisible } = usePlantContext();
  return (
    <>
      <nav className="z-100 fixed w-full bg-white border-10 p-3 grid grid-cols-4 uppercase font-bold text-[clamp(1rem,3vw,1.5rem)] whitespace-nowrap">
        <div className="col-span-1 flex justify-center transition-none">
          <Link
            href="/"
            className="hover:underline hover:text-black/70 hover:scale-105 transition-all"
          >
            Home
          </Link>
        </div>
        <div className="col-span-2 flex justify-center">
          <Link
            href="/myplants"
            className="hover:underline hover:text-black/70 hover:scale-105 transition-all"
          >
            Your Plants
          </Link>
        </div>
        <div className="col-span-1 flex justify-center">
          <button
            onClick={() => setFormVisible(true)}
            className="uppercase hover:underline hover:text-black/70 hover:scale-105 transition-all hover:cursor-pointer"
          >
            Add Plant
          </button>
        </div>
      </nav>
      <AnimatePresence>{formVisible && <PlantForm />}</AnimatePresence>
    </>
  );
};

export default Navbar;
