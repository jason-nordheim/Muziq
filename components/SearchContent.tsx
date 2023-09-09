"use client";

import { Song } from "@/types";
import { FC } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

const SearchContent: FC<{ songs: Song[] }> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className="flex flex-col w-full px-6 translate-x-1 gap-y-2 text-neutral-400">No Songs Found</div>;
  }
  return (
    <div className="flex flex-col w-full px-6 translate-x-1 gap-y-2">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center w-full gap-x-4">
            <div className="flex-1">
              <MediaItem onClick={(id) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
