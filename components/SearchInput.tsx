"use client";

import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  console.log(debouncedValue);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input placeholder="What do you want to search for?" value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

export default SearchInput;
