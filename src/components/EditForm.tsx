"use client";

import { Plant } from "@/app/page";
import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import { usePlantContext } from "./PlantContext";

type EditFormProps = {
  plantToEdit: Plant | null;
  onClose: () => void;
};

const EditForm: React.FC<EditFormProps> = ({ plantToEdit, onClose }) => {
  const [plantName, setPlantName] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchPlants } = usePlantContext();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (plantToEdit) {
      setPlantName(plantToEdit.plant_name);
      setFrequency(plantToEdit.frequency.toString());
    }
  }, [plantToEdit]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent | MouseEvent) => {
      if (
        (event instanceof KeyboardEvent && event.key === "Escape") ||
        (event instanceof MouseEvent &&
          formRef.current &&
          !formRef.current.contains(event.target as Node))
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleEscape);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleEscape);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from("plants")
      .update({ plant_name: plantName, frequency: Number(frequency) })
      .eq("id", plantToEdit?.id);

    setIsSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchPlants();
    onClose();
  };

  const handleDelete = async () => {
    if (!plantToEdit) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${plantToEdit.plant_name}"?`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setError(null);

    const { error } = await supabase
      .from("plants")
      .delete()
      .eq("id", plantToEdit.id);

    setIsDeleting(false);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchPlants();
    onClose();
  };

  if (!plantToEdit) return null;

  return (
    <motion.form
      ref={formRef}
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
          maxLength={15}
          autoFocus
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
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full flex gap-3">
        <button
          type="submit"
          className="uppercase w-1/2 font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
          disabled={isSubmitting || isDeleting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="uppercase w-1/2 font-bold text-2xl bg-red-600 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
          disabled={isDeleting || isSubmitting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && (
        <p className="mt-4 text-red-700 font-bold text-center">{error}</p>
      )}
    </motion.form>
  );
};

export default EditForm;
