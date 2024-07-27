"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value) {
      router.push(`?s=${value}`);
    }
  };

  useEffect(() => {
    if (!searchParams.get("s")) {
      setValue("");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center gap-x-4 w-full">
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      <Button onClick={handleSearch}> Search </Button>
    </div>
  );
};

export default Search;
