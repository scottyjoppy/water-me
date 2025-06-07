import { useState } from "react";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
type FrequencyType = "daily" | "multiple-weekly" | "every-week" | "every-month";

export const usePlantForm = (initialData?: {
  plantName: string;
  frequency: { type: FrequencyType; days?: Day[]; interval?: number };
}) => {
  const [plantName, setPlantName] = useState(initialData?.plantName ?? "");
  const [type, setType] = useState<FrequencyType>(
    initialData?.frequency.type ?? "daily"
  );
  const [interval, setInterval] = useState(
    initialData?.frequency.interval ?? 1
  );
  const [selectedDays, setSelectedDays] = useState<Day[]>(
    initialData?.frequency.days ?? []
  );

  return {
    plantName,
    setPlantName,
    type,
    setType,
    interval,
    setInterval,
    selectedDays,
    setSelectedDays,
    getFrequencyData: () =>
      type === "multiple-weekly"
        ? { type, days: selectedDays }
        : type === "daily"
        ? { type }
        : { type, interval },
  };
};
