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

  return (
    <div className="grid grid-cols-2 items-center bg-[#e0998e] px-3 py-5 rounded-2xl">
      <label htmlFor="last-watered" className="uppercase font-bold underline">
        Last Watered
      </label>
      <input
        id="last-watered"
        type="date"
        className="bg-white w-full border-4 rounded-xl px-3 py-1 outline-none"
        required
        value={formatLastWatered}
        onChange={(e) => setLastWatered(e.target.value)}
      />
    </div>
  );
};

export default PlantWateredSelector;
