export type Frequency =
  | { type: "daily" }
  | { type: "multiple-weekly"; days: string[] }
  | { type: "every-week"; interval: number }
  | { type: "every-month"; interval: number };

export type Plant = {
  id: number;
  plant_name: string;
  frequency: Frequency;
  last_watered: string;
  sort_order: number;
};