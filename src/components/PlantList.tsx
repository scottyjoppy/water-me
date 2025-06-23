"use client";

import { useUserPlants } from "@/hooks/useUserPlants";
import { markAsWatered } from "@/utils/markAsWatered";
import { useEffect, useState } from "react";
import { Plant } from "../types/databaseValues";
import EditForm from "./EditForm";
import LastWatered from "./LastWatered";
import MoveButton from "./MoveButton";
import NextWatered from "./NextWatered";

const PlantList = () => {
  const { plants, isLoading } = useUserPlants();
  const [page, setPage] = useState(0);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [plantToEdit, setPlantToEdit] = useState<Plant | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const pageCount = Math.ceil(plants.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPlants = plants.slice(startIndex, endIndex);

  const isToday = (date: string) => {
    if (!date) return false;
    const today = new Date().toISOString().slice(0, 10);
    return new Date(date).toISOString().slice(0, 10) === today;
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(3);
      } else if (width < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleWater = async (id: string) => {
    setLoadingId(id);
    await markAsWatered(id);
    setLoadingId(null);
  };

  const toggleEditForm = (plant: Plant) => {
    setPlantToEdit((prev) => (prev?.id === plant.id ? null : plant));
  };

  return (
    <div className="flex flex-col justify-between gap-3 h-full w-[clamp(300px,100%,1200px)]">
      <h2 className="mt-10 text-[clamp(2rem,5vw,3.5rem)] font-bold text-center underline">
        Plant List
      </h2>
      <section className="flex flex-col gap-10 justify-center h-auto">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 w-4/5 mx-auto">
          {isLoading ? (
            <p className="col-span-full p-5 uppercase rounded-xl text-2xl text-center font-bold bg-white border-4">
              Fetching your plants!
            </p>
          ) : currentPlants.length > 0 ? (
            currentPlants.map((plant) => {
              const wateredToday = isToday(plant.last_watered);

              return (
                <li
                  key={plant.id}
                  className="relative border-4 p-2 rounded-xl bg-green-300 flex flex-col justify-between h-auto w-full sm:w-auto"
                >
                  <button
                    onClick={() => toggleEditForm(plant)}
                    className="absolute top-0 right-0 text-white bg-black h-7 w-7 rounded-bl-lg rounded-tr-md hover:scale-105 translate-x-1 -translate-y-1 transition-all origin-top-right"
                  >
                    ✎
                  </button>

                  <h2 className="text-lg sm:text-xl font-bold uppercase underline text-center truncate">
                    {plant.plant_name}
                  </h2>

                  <LastWatered
                    lastWatered={plant.last_watered}
                    className="font-semibold text-center uppercase text-sm"
                    className2="border-4 rounded-md text-center px-1"
                  />

                  <NextWatered
                    lastWatered={plant.last_watered}
                    frequency={plant.frequency}
                    className="font-semibold text-center uppercase text-sm"
                    className2="border-4 rounded-md bg-white text-center px-1"
                  />

                  <div className="flex justify-center pt-1 relative h-11">
                    <MoveButton plantToEdit={plant} />
                    <button
                      onClick={() => handleWater(plant.id)}
                      disabled={loadingId === plant.id || wateredToday}
                      className={`uppercase px-2 py-1 text-sm font-bold rounded-xl border-4 transition-all ${
                        wateredToday
                          ? "bg-gray-400 hover:brightness-90"
                          : "bg-blue-400 hover:cursor-pointer hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:brightness-110"
                      }`}
                    >
                      {wateredToday ? "Watered" : "Water"}
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="col-span-full p-5 uppercase rounded-xl text-2xl text-center font-bold bg-white border-4">
              No plants yet, add some!
            </p>
          )}
        </ul>
      </section>
      <div className="pt-2 flex justify-center">
        {plants.length > itemsPerPage && (
          <div className="flex items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className={`px-3 py-1 border-t-4 border-l-4 border-b-4 rounded-tl-xl rounded-bl-xl font-bold uppercase text-sm transition-all ${
                page === 0
                  ? "bg-gray-400 hover:brightness-90"
                  : "bg-amber-500 hover:cursor-pointer hover:underline hover:brightness-120"
              }`}
            >
              Prev
            </button>
            <span className="text-sm font-semibold bg-white border-4 px-3 py-1">
              Page {page + 1} of {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
              disabled={page >= pageCount - 1}
              className={`px-3 py-1 border-t-4 border-r-4 border-b-4 rounded-tr-xl rounded-br-xl font-bold uppercase text-sm transition-all ${
                page >= pageCount - 1
                  ? "bg-gray-400 hover:brightness-90"
                  : "bg-amber-500 hover:cursor-pointer hover:underline hover:brightness-120"
              }`}
            >
              <span>Next</span>
            </button>
          </div>
        )}
      </div>

      {plantToEdit && (
        <EditForm
          plantToEdit={plantToEdit}
          onClose={() => setPlantToEdit(null)}
        />
      )}
    </div>
  );
};

export default PlantList;
