import React from "react";

interface LastWateredProps {
  lastWatered: string; // expect ISO date string or null
  className?: string;
  className2?: string;
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

const LastWatered: React.FC<LastWateredProps> = ({
  lastWatered,
  className,
  className2,
}) => {
  if (!lastWatered) {
    return (
      <>
        <p className={`${className}`}>Last watered</p>
        <p className={`${className2}`}>Never</p>
      </>
    );
  }

  const diff = daysDifference(lastWatered);

  let message = "";

  if (diff === 0) {
    message = "- Today";
  } else {
    message = `(${diff} day${diff > 1 ? "s" : ""} ago)`;
  }

  return (
    <div>
      <p className={`${className}`}>Last watered</p>
      <p className={`${className2}`}>
        {formatDate(lastWatered)} {message}
      </p>
    </div>
  );
};

export default LastWatered;
