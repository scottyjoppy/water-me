"use client";

import { createContext, useContext, useState } from "react";

type PlantContextType = {
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
  const [formVisible, setFormVisible] = useState(false);

  return (
    <PlantContext.Provider value={{ formVisible, setFormVisible }}>
      {children}
    </PlantContext.Provider>
  );
};
