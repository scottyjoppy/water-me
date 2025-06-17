"use client";

import { Day, days } from "@/types/databaseValues";
import { supabase } from "@/utils/supabase/client";
import { easeInOut, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { usePlantContext } from "./PlantContext";
import { useUserPlants } from "@/hooks/useUserPlants"

const PlantForm: React.FC = () => {
  const { formVisible, setFormVisible } = usePlantContext();
  const { refresh } = useUserPlants();
  const [plantName, setPlantName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("every-day");
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);

  const toggleDay = (day: Day) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(day)
        ? prevSelected.filter((d) => d !== day)
        : [...prevSelected, day]
    );
  };

  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formVisible) return;

    const handleEscape = (event: KeyboardEvent | MouseEvent) => {
      if (
        (event instanceof KeyboardEvent && event.key === "Escape") ||
        (event instanceof MouseEvent &&
          formRef.current &&
          !formRef.current.contains(event.target as Node))
      ) {
        console.log("closing");
        setFormVisible(false);
      }
    };

    document.addEventListener("click", handleEscape);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleEscape);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [formVisible, setFormVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    // 1. Get the current max sort_order
    const { data: maxSortData, error: maxError } = await supabase
      .from("plants")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    if (maxError) {
      setLoading(false);
      setError(maxError.message);
      return;
    }

    // 2. Calculate next sort order
    const nextSortOrder =
      maxSortData && maxSortData.length > 0
        ? (maxSortData[0].sort_order ?? 0) + 1
        : 1;

    // 3. Insert plant with sort_order
    const frequencyData =
      type === "multiple-weekly"
        ? { type, days: selectedDays }
        : type === "daily"
        ? { type }
        : { type, interval };

    const { error } = await supabase.from("plants").insert([
      {
        plant_name: plantName,
        frequency: frequencyData, // <- JSON inserted into frequency column
        sort_order: nextSortOrder,
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    refresh();
    setPlantName("");
    setFormVisible(false);

    if (pathname === "/") {
      router.push("/myplants");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
      className="fixed w-full h-screen bg-white/20 z-50 backdrop-blur-sm flex justify-center items-center inset-0"
    >
      <motion.form
        ref={formRef}
        id="plant-form"
        onSubmit={handleSubmit}
        initial={{ y: 10, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: easeInOut }}
        className="flex-col relative flex gap-3 items-center rounded-2xl border-10 p-10 bg-[#c0564a] w-[clamp(300px,90%,700px)]"
      >
        <button
          type="button"
          className="absolute flex justify-center items-center w-10 h-10 bg-black rounded-bl-md top-0 right-0 translate-x-1 -translate-y-1 text-white font-bold select-none text-4xl"
          onClick={() => setFormVisible(false)}
        >
          <span className="-translate-y-1 w-full h-full hover:rotate-10 transition-all origin-center">
            ×
          </span>
        </button>
        <label
          htmlFor="plant-name"
          className="gap-4 flex flex-col sm:flex-row bg-[#e0998e] px-3 py-5 rounded-2xl items-center justify-between w-full"
        >
          <span className="uppercase font-bold underline whitespace-nowrap">
            Plant name
          </span>
          <input
            id="plant-name"
            maxLength={15}
            autoFocus
            type="text"
            className="bg-white w-[clamp(180px,50%,300px)] h-10 border-4 rounded-xl px-3 py-1 outline-none"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            required
          />
        </label>
        <div className="w-full gap-4 flex flex-col sm:flex-row items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl">
          <label htmlFor="frequency" className="font-bold uppercase underline">
            Frequency
          </label>
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <select
              id="frequency"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-1 rounded-xl h-10 border-4 w-[clamp(180px,50%,300px)] bg-white font-bold uppercase outline-none "
            >
              <option value="every-day">Every # days</option>
              <option value="every-week">Every # weeks</option>
              <option value="every-month">Every # months</option>
              <option value="multiple-weekly">Multiple days per week</option>
            </select>
            {/* Conditional Inputs */}
            {type === "multiple-weekly" && (
              <div className="flex flex-col items-center">
                {/* Top row: days 0–3 */}
                <div className="flex">
                  {days.slice(0, 4).map((day, index) => {
                    const isSelected = selectedDays.includes(day);
                    const baseClasses =
                      "select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer flex justify-center items-center px-2 py-1 transition-all";
                    const selectedClass = isSelected
                      ? "bg-amber-300"
                      : "bg-white";
                    const borderAndRounding =
                      index === 0
                        ? "border-l-4 border-y-4 rounded-l-xl"
                        : index === 3
                        ? "border-r-4 border-y-4 border-l-4 rounded-r-xl"
                        : "border-y-4 border-l-4";

                    return (
                      <label
                        key={day}
                        htmlFor={day}
                        className={`${baseClasses} ${selectedClass} ${borderAndRounding}`}
                      >
                        <input
                          id={day}
                          type="checkbox"
                          value={day}
                          checked={isSelected}
                          onChange={() => toggleDay(day)}
                          className="hidden"
                        />
                        <>
                          <span className="sm:hidden">{day.slice(0, 2)}</span>
                          <span className="hidden sm:inline">
                            {day.slice(0, 3)}
                          </span>
                        </>
                      </label>
                    );
                  })}
                </div>

                {/* Bottom row: days 4–6 */}
                <div className="flex">
                  {days.slice(4).map((day, i) => {
                    const index = i + 4; // actual index in full array
                    const isSelected = selectedDays.includes(day);
                    const baseClasses =
                      "select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer flex justify-center items-center px-2 py-1 transition-all";
                    const selectedClass = isSelected
                      ? "bg-amber-300"
                      : "bg-white";
                    const borderAndRounding =
                      index === 4
                        ? "border-l-4 border-b-4 rounded-bl-xl"
                        : index === 6
                        ? "border-r-4 border-b-4 border-l-4 rounded-br-xl"
                        : "border-b-4 border-l-4";

                    return (
                      <label
                        key={day}
                        htmlFor={day}
                        className={`${baseClasses} ${selectedClass} ${borderAndRounding}`}
                      >
                        <input
                          id={day}
                          type="checkbox"
                          value={day}
                          checked={isSelected}
                          onChange={() => toggleDay(day)}
                          className="hidden"
                        />
                        <>
                          <span className="sm:hidden">{day.slice(0, 2)}</span>
                          <span className="hidden sm:inline">
                            {day.slice(0, 3)}
                          </span>
                        </>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {(type === "every-day" ||
            type === "every-week" ||
            type === "every-month") && (
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={1}
                max={50}
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="h-10 w-16 px-3 py-1 rounded-xl border-4 bg-white"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="uppercase w-[clamp(100px,100%,200px)] font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && (
          <p className="mt-4 text-red-700 font-bold text-center">{error}</p>
        )}
      </motion.form>
    </motion.section>
  );
};

export default PlantForm;
