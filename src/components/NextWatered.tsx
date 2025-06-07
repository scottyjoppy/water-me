import React from "react";

import { days, Frequency } from "@/types/databaseValues";

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
  baseDate.setHours(12, 0, 0, 0);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
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
      const selectedIndexes = frequency.days
        .map((day) => days.indexOf(day))
        .sort((a, b) => a - b);

      for (let i = 1; i <= 7; i++) {
        const candidate = new Date(today);
        candidate.setDate(today.getDate() + i);
        const candidateDay = candidate.getDay();

        if (selectedIndexes.includes(candidateDay)) {
          return candidate;
        }
      }

      // fallback (shouldn't happen)
      return new Date(today.getTime() + 7 * dayMs);
    }

    default:
      return baseDate;
  }
};

const NextWatered: React.FC<NextWateredProps> = ({
  lastWatered,
  frequency,
}) => {
  if (!lastWatered) return <p>Next watering: (never watered)</p>;

  const nextDate = getNextWateringDate(lastWatered, frequency);
  nextDate.setHours(12, 0, 0, 0);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diff = Math.floor(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let message = "";
  if (diff === 0) message = "(Today)";
  else if (diff > 0) message = `in ${diff} day${diff > 1 ? "s" : ""}`;
  else message = `${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""} ago`;

  return (
    <p className="border-4 px-3 py-1 bg-white rounded-xl">
      <span className="font-bold underline">Next watering: </span>{formatDate(nextDate)} {message}
    </p>
  );
};

export default NextWatered;
