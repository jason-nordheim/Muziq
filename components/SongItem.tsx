import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { FC } from "react";
import PlayButton from "./PlayButton";

const SongItem: FC<{ onClick: (id: string) => void; data: Song }> = ({ data, onClick }) => {
  const imgPath = useLoadImage(data);

  return (
    <div className="relative flex flex-col items-center justify-center p-3 overflow-hidden transition rounded-md cursor-pointer group gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10">
      <div className="relative w-full h-full overflow-hidden rounded-md aspect-square">
        <Image className="object-cover" src={imgPath || ""} fill alt="cover art" />
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-y-1">
        <p className="w-full font-semibold truncate">{data.title} </p>
        <p className="w-full pb-4 text-sm truncate text-neutral-400">By: {data.author}</p>
      </div>
      <div className="absolute bottom-28 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
