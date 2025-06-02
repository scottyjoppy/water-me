"use client";

import PlantList from "@/components/PlantList";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import PlantForm from "../components/PlantForm"; // adjust path as needed

const Home = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <PlantForm visible={true} onClose={() => setVisible(false)} />
        )}
      </AnimatePresence>
      <section className="flex flex-col gap-10 justify-center items-center h-screen border-10 bg-amber-300">
        <h1 className="text-7xl text-max font-bold text-center whitespace-nowrap underline">
          Water Me!
        </h1>
        <button
          className="uppercase w-[200px] font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
          onClick={() => setVisible(true)}
        >
          Click me
        </button>
      </section>
      <section>
        <PlantList />
      </section>
    </>
  );
};

export default Home;
