import React from "react";

import { days, Frequency } from "@/types/databaseValues";

interface NextWateredProps {
  lastWatered: string;
  frequency: Frequency;
  className?: string;
  className2?: string;
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
    case "every-day":
      return new Date(baseDate.getTime() + dayMs * frequency.interval);

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
  className,
  className2,
}) => {
  if (!lastWatered) return;

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
    <div>
      <p className={`${className}`}>Next watering</p>
      <p className={`${className2}`}>
        {formatDate(nextDate)} {message}
      </p>
    </div>
  );
};

export default NextWatered;
