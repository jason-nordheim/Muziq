import { FC } from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton: FC = () => {
  return (
    <button className="flex items-center p-4 transition bg-green-500 rounded-full opacity-0 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" size={16} />
    </button>
  );
};

export default PlayButton;
