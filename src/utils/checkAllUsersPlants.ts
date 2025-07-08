import { Plant } from "@/types/databaseValues";

export default async function checkAllUsersPlants() {
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
      getNextWaterDate(el);
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

const getNextWaterDate = (plant: Plant) => {
  const lastWatered = new Date(plant.last_watered).setHours(12, 0, 0, 0);
  const today = new Date().setHours(12, 0, 0, 0);
  console.log(lastWatered, today);
  if (lastWatered > today) {
    console.log("long ago:", lastWatered, today);
  } else if (lastWatered < today) {
    console.log("in the future:", lastWatered, today);
  } else {
    console.log("today!: ", lastWatered, today);
  }

  switch (plant.frequency.type) {
    case "every-day":
      break;
    case "multiple-weekly":
      return plant.frequency.days;
    default:
      return plant.frequency.interval;
  }
};
