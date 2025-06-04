"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePlantContext } from "./PlantContext";
import PlantForm from "./PlantForm";

const Navbar = () => {
  const { formVisible, setFormVisible } = usePlantContext();
  return (
    <>
      <nav className="fixed w-full bg-white border-10 p-3 grid grid-cols-4">
        <Link
          href="/"
          className="col-span-1 uppercase font-bold text-2xl hover:underline hover:text-black/70 hover:rotate-1 transition-all"
        >
          Home
        </Link>
        <Link
          href="/myplants"
          className="col-span-2 uppercase font-bold text-2xl hover:underline hover:text-black/70 hover:rotate-1 transition-all"
        >
          Your Plants
        </Link>
        <button
          onClick={() => setFormVisible(true)}
          className="col-span-1 uppercase font-bold text-2xl hover:underline hover:text-black/70 hover:rotate-1 transition-all hover:cursor-pointer"
        >
          Add Plant
        </button>
      </nav>
      <AnimatePresence>{formVisible && <PlantForm />}</AnimatePresence>
    </>
  );
};

export default Navbar;
