import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title?: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  if (!title) {
    return getSongs();
  }

  const result = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (result.error) {
    console.error(result.error.message);
  }

  return result.data || [];
};

export default getSongsByTitle;
