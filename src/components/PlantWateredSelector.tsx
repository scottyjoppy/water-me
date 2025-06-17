import React from "react";

type Props = {
  lastWatered: string;
  setLastWatered: (date: string) => void;
};

const PlantWateredSelector: React.FC<Props> = ({
  lastWatered,
  setLastWatered,
}) => {
  const formatLastWatered = lastWatered.split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  return (
    <label
      htmlFor="last-watered"
      className="uppercase w-full font-bold underline sgap-4 flex flex-col sm:flex-row items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl"
    >
      <p>Last Watered</p>
      <input
        id="last-watered"
        type="date"
        className="bg-white w-[clamp(180px,50%,300px)] border-4 rounded-xl px-3 py-1 outline-none"
        required
        max={today}
        value={formatLastWatered}
        onChange={(e) => setLastWatered(e.target.value)}
      />
    </label>
  );
};

export default PlantWateredSelector;
