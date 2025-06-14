import { Plant } from "../types/databaseValues";
import { supabase } from "@/utils/supabase/client"

export const swapPositions = async (a: Plant, b: Plant) => {
  if (a.id === b.id || a.sort_order === b.sort_order) return;

  const updates = [
    supabase.from("plants").update({ sort_order: b.sort_order }).eq("id", a.id),
    supabase.from("plants").update({ sort_order: a.sort_order }).eq("id", b.id),
  ];

  const [res1, res2] = await Promise.all(updates);

  if (res1.error || res2.error) {
    console.error("Failed to swap plants:", res1.error || res2.error);
    throw new Error("Failed to swap plants");
  }
};

export const movePlant = async (
  plants: Plant[],
  index: number,
  direction: "up" | "down"
) => {
  if (direction === "up" && index > 0) {
    await swapPositions(plants[index], plants[index - 1]);
  } else if (direction === "down" && index < plants.length - 1) {
    await swapPositions(plants[index], plants[index + 1]);
  }
};
