import React from "react";

type Props = {
  plantName: string;
  setPlantName: (name: string) => void;
};

const PlantNameInput: React.FC<Props> = ({ plantName, setPlantName }) => (
  <label
    htmlFor="plant-name"
    className="gap-4 flex flex-col sm:flex-row w-full items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl uppercase font-bold underline"
  >
    Plant name
    <input
      id="plant-name"
      type="text"
      className="bg-white w-[clamp(180px,50%,300px)] border-4 rounded-xl px-3 py-1 outline-none"
      value={plantName}
      onChange={(e) => setPlantName(e.target.value)}
      required
      maxLength={15}
      autoFocus
    />
  </label>
);

export default PlantNameInput;
