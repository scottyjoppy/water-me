import { days, Plant } from "@/types/databaseValues";

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

      nextWater = new Date(today.getTime() + dayMs);
      break;
    default:
      nextWater = lastWatered;
  }

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    )
  }

  if (isSameDay(nextWater, today)) {
    return "Today";
  }
  return nextWater;
};
export default getNextWaterDate;
