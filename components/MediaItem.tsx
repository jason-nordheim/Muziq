"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { FC } from "react";

const MediaItem: FC<{ data: Song; onClick: (id: string) => void }> = ({ data, onClick }) => {
  const imgUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // todo: default turn on player
  };

  return (
    <div
      className="flex items-center w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50"
      onClick={handleClick}
    >
      <div className={`relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden`}>
        <Image fill src={imgUrl || ""} alt="media item" className="object-cover" />
      </div>
      <div className="flex flex-col overflow-hidden gap-y-1">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-sm truncate text-neutral-400">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
