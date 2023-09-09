"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

const LikedContent: FC<{ songs: Song[] }> = ({ songs }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">No Liked Songs</div>;
  }

  return (
    <div className="flex-col w-full p-6 flecx gap-y-2">
      {songs.map((song) => {
        return (
          <div className="flex items-center w-full gap-x-4" key={song.id}>
            <div className="flex-1">
              <MediaItem data={song} onClick={(id) => onPlay(id)} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
