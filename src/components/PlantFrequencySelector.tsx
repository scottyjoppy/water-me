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
    <div className="w-full gap-4 flex flex-col sm:flex-row items-center justify-between bg-[#e0998e] px-3 py-5 rounded-2xl">
      <label className="font-bold uppercase underline">Frequency</label>

      <div className="flex w-[clamp(180px,50%,300px)] flex-col gap-2 items-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-1 rounded-xl h-10 border-4 w-full bg-white font-bold uppercase outline-none"
        >
          <option value="every-month">Every # months</option>
          <option value="multiple-weekly">Multiple days per week</option>
          <option value="every-day">Every # days</option>
          <option value="every-week">Every # weeks</option>
        </select>

        {type === "multiple-weekly" && (
          <div className="flex flex-col items-center">
            {/* Top row: days 0–3 */}
            <div className="flex">
              {days.slice(0, 4).map((day, index) => {
                const isSelected = selectedDays.includes(day);
                const baseClasses =
                  "select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer flex justify-center items-center px-2 py-1 transition-all";
                const selectedClass = isSelected ? "bg-amber-300" : "bg-white";
                const borderAndRounding =
                  index === 0
                    ? "border-l-4 border-y-4 rounded-l-xl"
                    : index === 3
                    ? "border-r-4 border-y-4 border-l-4 rounded-r-xl"
                    : "border-y-4 border-l-4";

                return (
                  <label
                    key={day}
                    htmlFor={day}
                    className={`${baseClasses} ${selectedClass} ${borderAndRounding}`}
                  >
                    <input
                      id={day}
                      type="checkbox"
                      value={day}
                      checked={isSelected}
                      onChange={() => toggleDay(day)}
                      className="hidden"
                    />
                    <>
                      <span className="sm:hidden">{day.slice(0, 2)}</span>
                      <span className="hidden sm:inline">
                        {day.slice(0, 3)}
                      </span>
                    </>
                  </label>
                );
              })}
            </div>

            {/* Bottom row: days 4–6 */}
            <div className="flex">
              {days.slice(4).map((day, i) => {
                const index = i + 4;
                const isSelected = selectedDays.includes(day);
                const baseClasses =
                  "select-none uppercase hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 font-bold hover:cursor-pointer flex justify-center items-center px-2 py-1 transition-all";
                const selectedClass = isSelected ? "bg-amber-300" : "bg-white";
                const borderAndRounding =
                  index === 4
                    ? "border-l-4 border-b-4 rounded-bl-xl"
                    : index === 6
                    ? "border-r-4 border-b-4 border-l-4 rounded-br-xl"
                    : "border-b-4 border-l-4";

                return (
                  <label
                    key={day}
                    htmlFor={day}
                    className={`${baseClasses} ${selectedClass} ${borderAndRounding}`}
                  >
                    <input
                      id={day}
                      type="checkbox"
                      value={day}
                      checked={isSelected}
                      onChange={() => toggleDay(day)}
                      className="hidden"
                    />
                    <>
                      <span className="sm:hidden">{day.slice(0, 2)}</span>
                      <span className="hidden sm:inline">
                        {day.slice(0, 3)}
                      </span>
                    </>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {(type === "every-day" ||
          type === "every-week" ||
          type === "every-month") && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min={1}
              max={50}
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
