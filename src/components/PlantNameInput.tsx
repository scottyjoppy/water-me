import React from "react";

type Props = {
  plantName: string;
  setPlantName: (name: string) => void;
};

const PlantNameInput: React.FC<Props> = ({ plantName, setPlantName }) => (
  <div className="grid grid-cols-2 items-center bg-[#e0998e] px-3 py-5 rounded-2xl">
    <label htmlFor="plant-name" className="uppercase font-bold underline">
      Plant name
    </label>
    <input
      id="plant-name"
      type="text"
      className="bg-white w-full border-4 rounded-xl px-3 py-1 outline-none"
      value={plantName}
      onChange={(e) => setPlantName(e.target.value)}
      required
      maxLength={15}
      autoFocus
    />
  </div>
);

export default PlantNameInput;
