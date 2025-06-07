import React from "react";

import { Frequency } from "@/types/databaseValues";
import { days } from "./PlantFrequencySelector"; // assuming you export Day too

interface NextWateredProps {
  lastWatered: string;
  frequency: Frequency;
}

const formatDate = (date: Date) =>
  date.toUTCString().split(" ").slice(0, 4).join(" ");

const getNextWateringDate = (
  lastWatered: string,
  frequency: Frequency
): Date => {
  const baseDate = new Date(lastWatered);
  baseDate.setHours(0, 0, 0, 0);
  const dayMs = 1000 * 60 * 60 * 24;

  switch (frequency.type) {
    case "daily":
      return new Date(baseDate.getTime() + dayMs);

    case "every-week":
      return new Date(baseDate.getTime() + dayMs * 7 * frequency.interval);

    case "every-month": {
      const nextDate = new Date(baseDate);
      nextDate.setMonth(baseDate.getMonth() + frequency.interval);
      return nextDate;
    }

    case "multiple-weekly": {
      const baseDayIndex = baseDate.getDay(); // Sunday = 0
      const selectedIndexes = frequency.days.map((day) =>
        days.indexOf(day as any)
      );

      // Find the next selected day *after* baseDayIndex
      const nextDiff =
        selectedIndexes
          .map((i) => (i - baseDayIndex + 7) % 7)
          .filter((d) => d > 0) // Only *after* the last watered day
          .sort((a, b) => a - b)[0] ?? 7; // Default: same day next week

      return new Date(baseDate.getTime() + nextDiff * dayMs);
    }

    default:
      return baseDate;
  }
};

const NextWatered: React.FC<NextWateredProps> = ({
  lastWatered,
  frequency,
}) => {
  if (!lastWatered) return <p>Next watering: Unknown (never watered)</p>;

  const nextDate = getNextWateringDate(lastWatered, frequency);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let message = "";
  if (diff === 0) message = "(Today)";
  else if (diff > 0) message = `in ${diff} day${diff > 1 ? "s" : ""}`;
  else message = `${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""} ago`;

  return (
    <p>
      Next watering: {formatDate(nextDate)} {message}
    </p>
  );
};

export default NextWatered;
