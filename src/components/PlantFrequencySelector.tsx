import { Day, days } from "@/types/databaseValues";
import React from "react";

type FrequencySelectorProps = {
  type: string;
  setType: (type: string) => void;
  interval: number;
  setInterval: (val: number) => void;
  selectedDays: Day[];
  setSelectedDays: React.Dispatch<React.SetStateAction<Day[]>>;
};

const PlantFrequencySelector: React.FC<FrequencySelectorProps> = ({
  type,
  setType,
  interval,
  setInterval,
  selectedDays,
  setSelectedDays,
}) => {
  const toggleDay = (day: Day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="w-full flex items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl">
      <label className="font-bold uppercase underline">Frequency</label>

      <div className="flex flex-col gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-1 rounded-xl h-10 border-4 bg-white font-bold uppercase outline-none"
        >
          <option value="daily">Daily</option>
          <option value="multiple-weekly">Multiple days per week</option>
          <option value="every-week">Every # weeks</option>
          <option value="every-month">Every # months</option>
        </select>

        {type === "multiple-weekly" && (
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
            {days.map((day) => (
              <label
                key={day}
                htmlFor={day}
                className={`select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer border-4 rounded-xl flex justify-center items-center px-3 py-1 transition-all ${
                  selectedDays.includes(day) ? "bg-amber-300" : "bg-white"
                }`}
              >
                <input
                  id={day}
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="hidden"
                />
                {day.slice(0, 3)}
              </label>
            ))}
          </div>
        )}

        {(type === "every-week" || type === "every-month") && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min={1}
              max={type === "every-week" ? 4 : 36}
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="h-10 w-16 px-3 py-1 rounded-xl border-4 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantFrequencySelector;
