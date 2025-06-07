import { supabase } from "@/supabaseClient";

export const markAsWatered = async (plantId: number) => {
  const today = new Date().toISOString().slice(0, 10);

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

  if (data.last_watered === today) {
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
