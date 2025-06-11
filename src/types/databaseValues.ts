export type Frequency =
  | { type: "multiple-weekly"; days: Day[] }
  | { type: "every-day"; interval: number }
  | { type: "every-week"; interval: number }
  | { type: "every-month"; interval: number };

export type Plant = {
  id: string;
  plant_name: string;
  frequency: Frequency;
  last_watered: string;
  sort_order: number;
};

export type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const days: Day[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
