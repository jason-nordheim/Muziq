"use client";

import { Song } from "@/types";
import { FC } from "react";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

const PageContent: FC<{ songs: Song[] }> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No Songs Available </div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((s) => (
        <SongItem data={s} key={s.id} onClick={(id) => onPlay(id)} />
      ))}
    </div>
  );
};

export default PageContent;
