"use client";

import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface PlantFormProps {
  visible: boolean;
  onClose: () => void;
}

const PlantForm: React.FC<PlantFormProps> = ({ visible, onClose }) => {
  const [plantName, setPlantName] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [visible, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!plantName.trim()) {
      setError("Plant name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("plants")
      .insert([{ plant_name: plantName, frequency: Number(frequency) }]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setPlantName("");
    setFrequency("1");
    onClose();
  };

  return (
    <motion.form
      id="plant-form"
      onSubmit={handleSubmit}
      initial={{ y: 10, scale: 0.9 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: easeInOut }}
      className="fixed flex-col z-10 flex gap-3 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-10 p-10 bg-[#c0564a] w-[500px] h-fit"
    >
      <button
        type="button"
        className="absolute flex justify-center items-center w-10 h-10 bg-black rounded-md top-0 right-0 translate-x-1 -translate-y-1 text-white font-bold select-none text-4xl"
        onClick={onClose}
      >
        <span className="-translate-y-1 w-full h-full hover:rotate-10 transition-all origin-center">
          ×
        </span>
      </button>

      <div className="grid grid-cols-2 items-center bg-[#e0998e] px-3 py-5 rounded-2xl">
        <label htmlFor="plant-name" className="uppercase font-bold underline">
          Plant name
        </label>
        <input
          id="plant-name"
          type="text"
          className="bg-white w-full border-4 rounded-xl px-3 py-1 outline-none"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 w-full items-center bg-[#e0998e] px-3 py-5 rounded-2xl">
        <label htmlFor="frequency" className="uppercase font-bold underline">
          Frequency
        </label>
        <div className="flex gap-3 items-center">
          <h2>Days:</h2>
          <select
            id="frequency"
            name="Frequency"
            className="bg-white border-4 rounded-xl px-3 py-1 outline-none"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
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
