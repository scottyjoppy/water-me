"use client";

import { usePlantContext } from "@/components/PlantContext";
import { AnimatePresence } from "framer-motion";
import PlantForm from "../components/PlantForm";

export type Plant = {
  id: number;
  plant_name: string;
  frequency: number;
  last_watered: string | null;
};

const Home = () => {
  const { formVisible, setFormVisible } = usePlantContext();
  return (
    <>
      <AnimatePresence>{formVisible && <PlantForm />}</AnimatePresence>
      <section className="flex flex-col gap-10 justify-center items-center h-screen border-10 bg-amber-300">
        <h1 className="text-7xl text-max font-bold text-center whitespace-nowrap underline">
          Water Me!
        </h1>
        <button
          className="uppercase w-[250px] font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
          onClick={() => setFormVisible(true)}
        >
          Create plant
        </button>
      </section>
    </>
  );
};

export default Home;
