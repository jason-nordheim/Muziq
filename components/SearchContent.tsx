"use client";

import { Song } from "@/types";
import { FC } from "react";
import MediaItem from "./MediaItem";

const SearchContent: FC<{ songs: Song[] }> = ({ songs }) => {
  if (songs.length === 0) {
    return <div className="flex flex-col w-full px-6 translate-x-1 gap-y-2 text-neutral-400">No Songs Found</div>;
  }
  return (
    <div className="flex flex-col w-full px-6 translate-x-1 gap-y-2">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center w-full gap-x-4">
            <div className="">
              <MediaItem onClick={() => {}} data={song} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
