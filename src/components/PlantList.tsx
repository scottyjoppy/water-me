"use client";

import { markAsWatered } from "@/utils/markAsWatered";
import { useState } from "react";
import { Plant } from "../types/databaseValues";
import EditForm from "./EditForm";
import LastWatered from "./LastWatered";
import NextWatered from "./NextWatered";
import { usePlantContext } from "./PlantContext";

const PlantList = () => {
  const { plants, fetchPlants } = usePlantContext();
  const [page, setPage] = useState(0);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [plantToEdit, setPlantToEdit] = useState<Plant | null>(null);

  const toggleEditForm = (plant: Plant) => {
    setPlantToEdit((prev) => (prev?.id === plant.id ? null : plant));
  };

  const itemsPerPage = 6;
  const pageCount = Math.ceil(plants.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPlants = plants.slice(startIndex, endIndex);

  const isToday = (date: string) => {
    if (!date) return false;
    const today = new Date().toISOString().slice(0, 10);
    return new Date(date).toISOString().slice(0, 10) === today;
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, pageCount - 1));
  };

  const handleWater = async (id: number) => {
    setLoadingId(id);
    await markAsWatered(id);
    await fetchPlants();
    setLoadingId(null);
  };

  return (
    <>
      <section className="p-4 w-full flex flex-col gap-6">
        <h2 className="text-7xl font-bold text-center underline">Plant List</h2>

        <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-3 mx-auto">
          {currentPlants.length > 0 ? (
            currentPlants.map((plant) => {
              const wateredToday = isToday(plant.last_watered);
              return (
                <li
                  key={plant.id}
                  className="flex relative sm:flex-col sm:justify-between  justify-center border-4 p-3 rounded-xl bg-green-300 col-span-1 sm:h-[300px] sm:w-[300px]"
                >
                  <button
                    onClick={() => {
                      toggleEditForm(plant);
                    }}
                    className="absolute rounded-bl-2xl rounded-tr-lg top-0 right-0 text-white bg-black h-8 w-8 hover:cursor-pointer hover:scale-105 translate-x-0.5 -translate-y-0.5 origin-top-right hover:[&>*]:-rotate-5 transition-all"
                  >
                    <div className="translate-x-[2px] -translate-y-[2px] transition-all">
                      ✎
                    </div>
                  </button>
                  <h2 className="uppercase font-bold text-3xl underline leading-4">
                    {plant.plant_name}
                  </h2>
                  <LastWatered
                    lastWatered={plant.last_watered}
                    className="font-bold text-center uppercase"
                    className2="border-4 rounded-xl px-3 py-1 bg-white text-center"
                  />
                  <NextWatered
                    lastWatered={plant.last_watered}
                    frequency={plant.frequency}
                    className="font-bold text-center uppercase"
                    className2="border-4 rounded-xl px-3 py-1 bg-white text-center"
                  />
                  <div className="flex justify-between mx-auto">
                    <button
                      onClick={() => handleWater(plant.id)}
                      disabled={loadingId === plant.id || wateredToday}
                      className={`uppercase w-fit px-2 font-bold text-2xl rounded-2xl border-4 transition-all
                      ${
                        wateredToday
                          ? "bg-gray-400 hover hover:brightness-90"
                          : "bg-blue-400 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer"
                      }`}
                    >
                      {wateredToday ? "Watered" : "Water"}
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="border-4 col-span-full p-5 uppercase rounded-xl text-5xl font-bold bg-white">
              No plants yet, add some!
            </p>
          )}
        </ul>

        {/* SUPER UGLY MAKE PRETTY */}

        {plants.length > itemsPerPage && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center">
              Page {page + 1} of {pageCount}
            </span>
            <button
              onClick={handleNext}
              disabled={page >= pageCount - 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
      <div>
        {plantToEdit && (
          <EditForm
            plantToEdit={plantToEdit}
            onClose={() => setPlantToEdit(null)}
          />
        )}
      </div>
    </>
  );
};

export default PlantList;
