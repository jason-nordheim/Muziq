import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const result = await supabase.from("songs").select("*").order("created_at", { ascending: false });

  if (result.error) {
    console.error(result.error.message);
  }

  return result.data || [];
};

export default getSongs;
