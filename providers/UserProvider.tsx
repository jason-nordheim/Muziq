"use client";

import { MyUserProvider } from "@/hooks/useUser";
import { FC, PropsWithChildren } from "react";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  return <MyUserProvider>{children}</MyUserProvider>;
};

export default UserProvider;
