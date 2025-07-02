import { supabaseAdmin } from "./supabase/service";

export async function checkAllUsersPlants() {
  const { data: plants, error } = await supabaseAdmin
    .from("plants")
    .select("*, user:users(id, email)");

    if (error) throw new Error(error.message);
  return console.log(plants)

  // const today = new Date();

  // const needsWater = plants.filter((plant) => {
  //   if (!plant.last_watered || !plant.frequency) return false;

  //   const last = new Date(plant.last_watered);
  //   const daysSince = Math.floor(
  //     (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  //   );

    // return daysSince >= plant.frequency;
  // });

  // return needsWater;
}
