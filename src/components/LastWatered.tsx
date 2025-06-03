import React from "react";

interface LastWateredProps {
  lastWatered: string | null; // expect ISO date string or null
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB").replace(/\//g, "-"); // DD-MM-YYYY
};

const daysDifference = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Strip time to midnight
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - now.getTime(); // flipped for sign
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const LastWatered: React.FC<LastWateredProps> = ({ lastWatered }) => {
  if (!lastWatered) {
    return <p>Last watered: Never</p>;
  }

  const diff = daysDifference(lastWatered);

  let message = "";

  if (diff === 0) {
    message = "(Today)";
  } else if (diff > 0) {
    message = `(in ${diff} day${diff > 1 ? "s" : ""})`;
  } else {
    message = `(${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""} ago)`;
  }

  return (
    <p>
      Last watered: {formatDate(lastWatered)} {message}
    </p>
  );
};

export default LastWatered;
