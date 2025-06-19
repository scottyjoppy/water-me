import { useUserPlants } from "@/hooks/useUserPlants";
import { Plant } from "@/types/databaseValues";
import { movePlant } from "@/utils/movePlants";

type ButtonProps = {
  plantToEdit: Plant | null;
};

const MoveButton: React.FC<ButtonProps> = ({ plantToEdit }) => {
  const { plants, refresh } = useUserPlants();

  if (!plantToEdit) return null;

  // Calculate index here once per render
  const index = plants.findIndex((p) => p.id === plantToEdit.id);

  const handleMove = async (direction: "up" | "down") => {
    await movePlant(plants, index, direction);

    await new Promise((r) => setTimeout(r, 300));

    await refresh();
  };

  return (
    <div className="w-full flex h-full">
      <button
        type="button"
        onClick={() => handleMove("up")}
        disabled={index <= 0}
        className={`uppercase font-bold text-sm rounded-l-2xl border-4 border-r-0 transition-all px-2 py-1 whitespace-nowrap ${
          index <= 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-400 hover:brightness-120 hover:[&>*]:scale-110 hover:cursor-pointer"
        }`}
      >
        <svg className="w-full h-full transition-all" viewBox="0 0 512 512">
          <path d="m256 213.7 174.2 167.2c4.3 4.2 11.4 4.1 15.8-.2l30.6-29.9c4.4-4.3 4.5-11.3.2-15.5L264.1 131.1c-2.2-2.2-5.2-3.2-8.1-3-3-.1-5.9.9-8.1 3L35.2 335.3c-4.3 4.2-4.2 11.2.2 15.5L66 380.7c4.4 4.3 11.5 4.4 15.8.2L256 213.7z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => handleMove("down")}
        disabled={index === -1 || index >= plants.length - 1}
        className={`uppercase font-bold text-sm rounded-r-2xl border-4  transition-all px-2 py-1 whitespace-nowrap ${
          index === -1 || index >= plants.length - 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-400 hover:brightness-120 hover:[&>*]:scale-110 hover:cursor-pointer"
        }`}
      >
        <svg className="w-full h-full transition-all rotate-180" viewBox="0 0 512 512">
          <path d="m256 213.7 174.2 167.2c4.3 4.2 11.4 4.1 15.8-.2l30.6-29.9c4.4-4.3 4.5-11.3.2-15.5L264.1 131.1c-2.2-2.2-5.2-3.2-8.1-3-3-.1-5.9.9-8.1 3L35.2 335.3c-4.3 4.2-4.2 11.2.2 15.5L66 380.7c4.4 4.3 11.5 4.4 15.8.2L256 213.7z" />
        </svg>
      </button>
    </div>
  );
};

export default MoveButton;
