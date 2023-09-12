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
    router.push(href);
  };

  return (
    <button
      className="relative flex items-center pr-4 overflow-hidden transition rounded-md group gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20"
      onClick={() => onClick()}
    >
      <div className={`relative min-h-[${ICON_SIZE}px] min-w-[${ICON_SIZE}px]`}>
        <Icon className="object-cover p-4 bg-gradient-to-br from-purple-500" size={ICON_SIZE + 2} />
      </div>
      <p className="py-5 font-medium truncate">{name}</p>
      <div className="absolute flex items-center justify-center p-4 transition bg-green-500 rounded-full opacity-0 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export const LikedListItem: FC = () => {
  return <ListItem icon={FaHeart} href="liked" name="Liked Songs" />;
};

export default ListItem;
