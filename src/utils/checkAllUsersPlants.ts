import { Plant } from "@/types/databaseValues";

export async function checkAllUsersPlants() {
  const fetchPlants = async () => {
    const res = await fetch("/api/check-all-user-plants");

    if (!res.ok) {
      throw new Error(`Failed to fetch plants: ${res.status}`);
    }

    return await res.json();
  };

  try {
    const data = await fetchPlants();
    data.plants.forEach((el: Plant) => {
      console.log(el.plant_name);
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}
