"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Plant = {
  id: number;
  plant_name: string;
  frequency: number;
  last_watered: Date;
};

const PlantList = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      const { data, error } = await supabase.from("plants").select("*");

      if (error) {
        console.error("Error fetching plants:", error.message);
        setError(error.message);
      } else {
        setPlants(data || []);
      }

      setLoading(false);
    };

    fetchPlants();
  }, []);

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Plant List</h2>
      <ul className="space-y-3">
        {plants.map((plant) => (
          <li
            key={plant.id}
            className="border border-gray-400 p-3 rounded bg-white"
          >
            <strong>{plant.plant_name}</strong> – every {plant.frequency} day(s)
            <p>Last watered: {new Date(plant.last_watered).toLocaleDateString()}</p>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default PlantList;
