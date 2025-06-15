"use client";

import { Day, days } from "@/types/databaseValues";
import { supabase } from "@/utils/supabase/client";
import { easeInOut, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { usePlantContext } from "./PlantContext";

const PlantForm: React.FC = () => {
  const { formVisible, setFormVisible } = usePlantContext();
  const [plantName, setPlantName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("daily");
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

    setPlantName("");
    setFormVisible(false);

    if (pathname === "/") {
      router.push("/myplants");
    }
  };

  return (
    <motion.form
      ref={formRef}
      id="plant-form"
      onSubmit={handleSubmit}
      initial={{ y: 10, scale: 0.9 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: easeInOut }}
      className="fixed flex-col z-100 flex gap-3 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-10 p-10 bg-[#c0564a] w-[600px] h-fit"
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

      <div className="w-full bg-[#e0998e] px-3 py-5 rounded-2xl">
        <label
          htmlFor="plant-name"
          className="flex items-center justify-between"
        >
          <span className="uppercase font-bold underline">Plant name</span>
          <input
            id="plant-name"
            maxLength={15}
            autoFocus
            type="text"
            className="bg-white w-2/3 h-10 border-4 rounded-xl px-3 py-1 outline-none"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="w-full flex items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl">
        <label className="font-bold uppercase underline">Frequency</label>

        <div className="flex flex-col gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-1 rounded-xl h-10 border-4 bg-white font-bold uppercase outline-none"
          >
            <option value="multiple-weekly">Multiple days per week</option>
            <option value="every-day">Every # days</option>
            <option value="every-week">Every # weeks</option>
            <option value="every-month">Every # months</option>
          </select>
          {/* Conditional Inputs */}
          {type === "multiple-weekly" && (
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
              {days.map((day) => (
                <label
                  key={day}
                  htmlFor={day}
                  className={`select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer border-4 rounded-xl flex justify-center items-center px-3 py-1 transition-all ${
                    selectedDays.includes(day) ? "bg-amber-300" : "bg-white"
                  }`}
                >
                  <input
                    id={day}
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="hidden"
                  />
                  {day.slice(0, 3)}
                </label>
              ))}
            </div>
          )}
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
      </div>
      <button
        type="submit"
        className="uppercase w-1/2 font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && (
        <p className="mt-4 text-red-700 font-bold text-center">{error}</p>
      )}
    </motion.form>
  );
};

export default PlantForm;
