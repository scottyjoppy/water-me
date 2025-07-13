/* eslint-disable */

import { days, Plant } from "@/types/databaseValues";

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

    const userList: { [userId: string]: Plant[] } = {};
    data.plants.forEach((el: Plant) => {
      if (!needsWatering(el)) {
        return;
      }

      const userId = el.user_id;
      if (userList[userId]) {
        userList[userId].push(el);
      } else {
        userList[userId] = [el];
      }
    });
    console.log("userList: ", userList);
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

const getNextWaterDate = (plant: Plant) => {
  const lastWatered = new Date(plant.last_watered);
  const today = new Date();

  const dayMs = 1000 * 60 * 60 * 24;

  let nextWater: Date;

  switch (plant.frequency.type) {
    case "every-day":
      nextWater = new Date(
        lastWatered.getTime() + dayMs * plant.frequency.interval
      );
      break;
    case "every-week":
      nextWater = new Date(
        lastWatered.getTime() + dayMs * 7 * plant.frequency.interval
      );
      break;
    case "every-month":
      nextWater = new Date(lastWatered);
      nextWater.setMonth(lastWatered.getMonth() + plant.frequency.interval);
      break;
    case "multiple-weekly":
      today.setHours(12, 0, 0, 0);
      lastWatered.setHours(12, 0, 0, 0);

      const selectedIndexes = plant.frequency.days
        .map((day) => days.indexOf(day))
        .sort((a, b) => a - b);

      for (
        let d = new Date(lastWatered.getTime() + dayMs);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        if (selectedIndexes.includes(d.getDay())) {
          return d;
        }
      }

      for (let i = 1; i <= 7; i++) {
        const candidate = new Date(today);
        candidate.setDate(today.getDate() + i);
        if (selectedIndexes.includes(candidate.getDay())) {
          return candidate;
        }
      }
    default:
      nextWater = lastWatered;
  }
  return nextWater;
};

const needsWatering = (plant: Plant): boolean => {
  const next = getNextWaterDate(plant);

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const nextWater = new Date(next);
  nextWater.setHours(12, 0, 0, 0);

  return nextWater.getTime() <= today.getTime();
};
