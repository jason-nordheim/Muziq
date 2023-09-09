"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSong(song);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return <div className="fixed bottom-0 w-full py-2 bg-black h-[80px] px-4">Player</div>;
};

export default Player;
