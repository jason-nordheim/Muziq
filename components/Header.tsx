"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome, HiSearch } from "react-icons/hi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Header: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    // todo: implement logout functionality
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    // todo: reset any playing songs

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out");
    }
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className="flex items-center justify-between w-full mb-4">
        {/** desktop */}
        <div className="items-center hidden md:flex gap-x-2">
          <button
            className="flex items-center justify-center transition bg-black rounded-full hover:opacity-75"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            className="flex items-center justify-center transition bg-black rounded-full hover:opacity-75"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        {/** mobile */}
        <div className="flex items-center md:hidden gap-x-2">
          <button className="flex items-center justify-center p-2 bg-white rounded-full hover:opacity-75">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flex items-center justify-center p-2 bg-white rounded-full hover:opacity-75">
            <HiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button className="px-6 py-2 bg-white" onClick={handleLogout}>
                Logout
              </Button>
              <Button className="bg-white" onClick={() => router.push("/account")}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button className="font-medium bg-transparent text-neutral-300" onClick={authModal.onOpen}>
                  Sign Up
                </Button>
              </div>
              <div>
                <Button className="px-6 py-2 bg-white" onClick={authModal.onOpen}>
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
