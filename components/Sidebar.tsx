"use client";

import { FC, PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

const Sidebar: FC<PropsWithChildren<{ songs: Song[] }>> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ];
  }, [pathname]);

  return (
    <div id="sidebar-container" className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col px-5 py-4 gap-y-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="flex-1 h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="flex-1 h-full py-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
