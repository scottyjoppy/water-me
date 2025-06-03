import { supabase } from "../../supabaseClient";

export const markAsWatered = async (plantId: number) => {
  // Get today's date in YYYY-MM-DD format (without time)
  const today = new Date().toISOString().slice(0, 10);

  // Fetch the current last_watered date from the DB for this plant
  const { data, error: fetchError } = await supabase
    .from("plants")
    .select("last_watered")
    .eq("id", plantId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch plant data:", fetchError.message);
    return;
  }

  if (!data) {
    console.error("Plant not found");
    return;
  }

  // Convert last_watered to string YYYY-MM-DD if it exists
  const lastWateredDate = data.last_watered
    ? data.last_watered.slice(0, 10)
    : null;

  // If last_watered is already today, no need to update
  if (lastWateredDate === today) {
    console.log("Plant already marked as watered today");
    return;
  }

  // Otherwise, update last_watered to today
  const { error: updateError } = await supabase
    .from("plants")
    .update({ last_watered: today })
    .eq("id", plantId);

  if (updateError) {
    console.error("Failed to mark as watered:", updateError.message);
  } else {
    console.log("Plant marked as watered today");
  }
};
