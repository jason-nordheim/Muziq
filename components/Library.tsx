"use client";

import { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModel";

const Library: FC<{ songs: Song[] }> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { user, subscription } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // require subscription
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="font-medium text-neutral-400 text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
        />
      </div>
      <div className="flex flex-col px-3 mt-4 gap-y-2">
        {songs &&
          Array.isArray(songs) &&
          songs.map((song) => {
            return <MediaItem key={song.id} data={song} onClick={(id) => onPlay(id)} />;
          })}
      </div>
    </div>
  );
};

export default Library;
