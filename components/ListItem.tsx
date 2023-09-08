"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaHeart, FaPlay } from "react-icons/fa";

type ListItemProps = {
  icon: IconType;
  name: string;
  href: string;
};

const ICON_SIZE = 60;

const ListItem: FC<ListItemProps> = ({ icon: Icon, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    // todo: add authentication before push
    router.push(href);
  };
  return (
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
      onClick={() => onClick()}
    >
      <div className={`relative main-h-[${ICON_SIZE}px] min-w-[${ICON_SIZE}px]`}>
        <Icon className="bg-gradient-to-br from-purple-500 object-cover p-4" size={ICON_SIZE + 2} />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export const LikedListItem: FC = () => {
  return <ListItem icon={FaHeart} href="liked" name="Liked Songs" />;
};

export default ListItem;
