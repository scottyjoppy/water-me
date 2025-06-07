import React from "react";

interface LastWateredProps {
  lastWatered: string; // expect ISO date string or null
}

const formatDate = (LastWatered: string) => {
  const date = new Date(LastWatered);
  console.log(date);
  return String(date.toUTCString().split(" ").slice(0, 4).join(" "));
};
const daysDifference = (lastWatered: string) => {
  const oldDate = new Date(lastWatered).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);

  return Math.floor((now - oldDate) / (1000 * 60 * 60 * 24));
};

const LastWatered: React.FC<LastWateredProps> = ({ lastWatered }) => {
  if (!lastWatered) {
    return <p>Last watered: Never</p>;
  }

  const diff = daysDifference(lastWatered);

  let message = "";

  if (diff === 0) {
    message = "(Today)";
  } else {
    // diff > 0 means lastWatered was days ago
    message = `(${diff} day${diff > 1 ? "s" : ""} ago)`;
  }

  return (
    <p className="border-4 px-3 py-1 bg-white rounded-xl">
      <span className="font-bold underline">Last watered: </span>{formatDate(lastWatered)} {message}
    </p>
  );
};

export default LastWatered;
