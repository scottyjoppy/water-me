"use client";

import { useUserPlants } from "@/hooks/useUserPlants";
import { normalizePositions } from "@/utils/normalizeOrder";
import { supabase } from "@/utils/supabase/client";
import { easeInOut, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Day, Plant } from "../types/databaseValues";
import PlantFrequencySelector from "./PlantFrequencySelector";
import PlantNameInput from "./PlantNameInput";
import PlantWateredSelector from "./PlantWateredSelector";

type EditFormProps = {
  plantToEdit: Plant | null;
  onClose: () => void;
};

const EditForm: React.FC<EditFormProps> = ({ plantToEdit, onClose }) => {
  const [plantName, setPlantName] = useState("");
  const [lastWatered, setLastWatered] = useState("");
  const [type, setType] = useState("daily");
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refresh } = useUserPlants();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (plantToEdit) {
      setPlantName(plantToEdit.plant_name);

      const initialLastWatered =
        plantToEdit.last_watered || new Date().toISOString();
      setLastWatered(initialLastWatered);

      const freq = plantToEdit.frequency;
      setType(freq.type);

      if (freq.type === "multiple-weekly") {
        setSelectedDays(freq.days || []);
      } else if (
        freq.type === "every-day" ||
        "every-week" ||
        freq.type === "every-month"
      ) {
        setInterval(freq.interval);
      }
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

    document.addEventListener("click", handleEscape);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleEscape);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    const frequencyData =
      type === "multiple-weekly"
        ? { type, days: selectedDays }
        : { type, interval };

    if (!plantToEdit) return;

    const { error } = await supabase
      .from("plants")
      .update({
        plant_name: plantName,
        frequency: frequencyData,
        last_watered: lastWatered,
      })
      .eq("id", plantToEdit.id);

    refresh();
    setIsSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    await normalizePositions();
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

    await normalizePositions();
    refresh();
    onClose();
  };

  if (!plantToEdit) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
      className="fixed w-screen h-[100dvh] bg-white/20 z-50 backdrop-blur-sm flex justify-center items-center inset-0"
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
          onClick={onClose}
        >
          <span className="-translate-y-1 w-full h-full hover:rotate-10 transition-all origin-center">
            ×
          </span>
        </button>
        {/* Plant Name Input Section */}
        <PlantNameInput plantName={plantName} setPlantName={setPlantName} />
        {/* Frequency Section */}
        <PlantFrequencySelector
          type={type}
          setType={setType}
          interval={interval}
          setInterval={setInterval}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
        <PlantWateredSelector
          lastWatered={lastWatered}
          setLastWatered={setLastWatered}
        />
        <div className="w-full flex gap-3">
          <button
            type="submit"
            className="uppercase w-1/2 font-bold text-2xl bg-red-400 rounded-2xl border-4 hover:brightness-150 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:cursor-pointer transition-all"
            disabled={isSubmitting || isDeleting}
          >
            {isSubmitting ? "Saving..." : "Save"}
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
    </motion.section>
  );
};

export default EditForm;
