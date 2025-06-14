import { supabase } from "@/utils/supabase/client";

export const normalizePositions = async () => {
  // Use correct table name consistently
  const { data, error } = await supabase
    .from("plants") // make sure this matches your DB table
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch plants:", error);
    return;
  }

  if (!data) return;

  const updates = data.map((plant, index) =>
    supabase
      .from("plants")
      .update({ sort_order: index + 1 }) // start at 1
      .eq("id", plant.id)
  );

  const results = await Promise.all(updates);

  // Optionally check for update errors
  results.forEach(({ error }, i) => {
    if (error) {
      console.error(
        `Failed to update sort_order for plant id ${data[i].id}:`,
        error
      );
    }
  });
};
