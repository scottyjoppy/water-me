"use client";

import { usePlantContext } from "@/components/PlantContext";

const Home = () => {
  const { setFormVisible } = usePlantContext();

  return (
    <section className="flex flex-col gap-10 justify-center items-center h-[100dvh] border-10 bg-amber-300">
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
  );
};

export default Home;
