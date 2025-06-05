"use client";

import { Plant } from "@/app/page";
import { supabase } from "@/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

type PlantContextType = {
  plants: Plant[];
  fetchPlants: () => Promise<void>;
  formVisible: boolean;
  setFormVisible: (value: boolean) => void;
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);
export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlantContext must be used within a PlantProvider");
  }
  return context;
};

export const PlantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [formVisible, setFormVisible] = useState(false);

  const fetchPlants = async () => {
    const { data, error } = await supabase.from("plants").select("*").order("sort_order", { ascending: true });
    if (!error) {
      setPlants(data as Plant[]);
    } else {
      console.error("Failed to fetch plants:", error.message);
    }
  };
  useEffect(() => {
    fetchPlants();
  }, []);
  return (
    <PlantContext.Provider
      value={{ plants, fetchPlants, formVisible, setFormVisible }}
    >
      {children}
    </PlantContext.Provider>
  );
};
