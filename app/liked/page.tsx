import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import LikedContent from "@/components/LikedContent";

import { FaHeart } from "react-icons/fa";

// disable caching
export const revalidate = 0;

const LikedSongs = async () => {
  const likedSongs = await getLikedSongs();
  console.log({ likedSongs });

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="flex flex-col items-center md:flex-row w gap-x-5">
          <div className="relative w-32 h-32 lg:h-44 lg:w-44">
            <FaHeart className="object-cover w-32 h-32 text-white lg:w-44 lg:h-44 p-7 bg-gradient-to-br from-purple-500" />
          </div>
          <div className="flex flex-col mt-4 gap-y-2 md:mt-0">
            <p className="hidden text-sm font-semibold md:block">Playlist</p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">Like Songs</h1>
          </div>
        </div>
      </Header>
      <LikedContent songs={likedSongs} />
    </div>
  );
};

export default LikedSongs;
