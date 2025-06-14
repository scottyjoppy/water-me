"use client";

import { Plant } from "@/types/databaseValues";
import { supabase } from "@/utils/supabase/client";
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
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user on mount
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        setUserId(null);
      }
    };

    getUser();
  }, []);

  const fetchPlants = async () => {
    if (!userId) {
      setPlants([]);
      return;
    }

    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order", { ascending: true });

    if (!error) {
      setPlants(data as Plant[]);
    } else {
      console.error("Failed to fetch plants:", error.message);
    }
  };

  // Refetch plants when userId is set
  useEffect(() => {
    if (userId) {
      fetchPlants();
    }
  }, [userId]);

  return (
    <PlantContext.Provider
      value={{ plants, fetchPlants, formVisible, setFormVisible }}
    >
      {children}
    </PlantContext.Provider>
  );
};
