import React from "react";

interface LastWateredProps {
  lastWatered: string; // expect ISO date string or null
  className?: string;
  className2?: string;
}

const formatDate = (lastWatered: string) => {
  const date = new Date(lastWatered);
  return String(date.toUTCString().split(" ").slice(0, 4).join(" "));
};

const daysDifference = (lastWatered: string) => {
  const oldDate = new Date(lastWatered).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  return Math.floor((now - oldDate) / (1000 * 60 * 60 * 24));
};

const getDangerLevel = (diff: number): string => {
  if (diff <= 0) return "green";
  if (diff < 3) return "yellow";
  if (diff < 5) return "orange";
  return "red";
};

const bgColorMap: Record<string, string> = {
  white: "bg-white",
  "green": "bg-green-400",
  "yellow": "bg-yellow-400",
  "orange": "bg-orange-400",
  "red": "bg-red-400",
};

const LastWatered: React.FC<LastWateredProps> = ({
  lastWatered,
  className,
  className2,
}) => {
  if (!lastWatered) {
    return (
      <>
        <p className={className}>Last watered</p>
        <p className={`${className2} bg-white`}>Never</p>
      </>
    );
  }

  const diff = daysDifference(lastWatered);
  const dangerLevel = getDangerLevel(diff);
  const message =
    diff === 0 ? "- Today" : `(${diff} day${diff > 1 ? "s" : ""} ago)`;

  return (
    <div>
      <p className={className}>Last watered</p>
      <p className={`${className2} ${bgColorMap[dangerLevel]}`}>
        {formatDate(lastWatered)} {message}
      </p>
    </div>
  );
};

export default LastWatered;
