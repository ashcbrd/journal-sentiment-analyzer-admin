"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { MdDateRange } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

interface Journal {
  _id: string;
  title: string;
  entry: string;
  created_at: string;
  sentiment_category: string;
  student_details?: {
    userName?: string;
    firstName?: string;
    lastName?: string;
  };
}

const getData = async (): Promise<Journal[] | null> => {
  try {
    const response = await axiosInstance.get(`/journal`);
    return response.data;
  } catch (error) {
    console.error("Error fetching journals:", error);
    return null;
  }
};

const JournalPage = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchResult = searchParams.get("s");
  const [pin, setPin] = useState<string>("");

  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
      setIsLoading(true);
      const data = await getData();
      if (data) {
        setJournals(data);
      }
      setIsLoading(false);
    };
    fetchJournals();
  }, []);

  useEffect(() => {
    if (searchResult) {
      setSearch(searchResult.toLowerCase());
    }
  }, [searchResult]);

  useEffect(() => {
    if (pin.length === 6 && pin !== "123456") {
      toast.error("Incorrect PIN.");
    }
  }, [pin]);

  useEffect(() => {
    const filteredJournals = journals.filter(
      (item) =>
        (selectedCategory === "All Categories" ||
          item.sentiment_category.toLowerCase() === selectedCategory) &&
        item.title.toLowerCase().includes(search)
    );
    setFilteredJournals(filteredJournals);
  }, [journals, selectedCategory, search]);

  const handleClearSearch = () => {
    router.push("/journals");
    setSearch("");
    setSelectedCategory("All Categories");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const convertToAsterisks = (text: string) => {
    return text
      .split("")
      .map((char) => (char === " " ? " " : "*"))
      .join("");
  };

  const handlePinChange = (value: string) => {
    setPin(value);
  };

  return (
    <div>
      {pin.length !== 6 || pin !== "123456" ? (
        <div className="relative top-0 left-0 w-full bg-zinc-50 p-20 flex items-center justify-center m-auto flex-col gap-y-10">
          <h2 className="font-semibold text-2xl">Enter PIN to view Journals</h2>
          <InputOTP maxLength={6} onChange={(value) => handlePinChange(value)}>
            <InputOTPGroup className="bg-white p-10 rounded-md border">
              <InputOTPSlot className="bg-zinc-50" index={0} />
              <InputOTPSlot className="bg-zinc-50" index={1} />
              <InputOTPSlot className="bg-zinc-50" index={2} />
              <InputOTPSeparator />
              <InputOTPSlot className="bg-zinc-50 border" index={3} />
              <InputOTPSlot className="bg-zinc-50" index={4} />
              <InputOTPSlot className="bg-zinc-50" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      ) : (
        <div className="h-full relative">
          {searchResult && (
            <div className="flex items-center gap-x-2">
              <p>
                Showing {searchResult.length}{" "}
                {searchResult.length > 1 ? "results" : "result"} for{" "}
              </p>
              <Button
                variant="outline"
                className="flex font-semibold items-center gap-x-2"
              >
                {search}
                <IoMdClose onClick={handleClearSearch} size={14} />
              </Button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="capitalize py-2 px-4 border rounded-md shadow mt-2">
              {selectedCategory}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Choose a Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["All Categories", "positive", "negative"].map((category) => (
                <DropdownMenuItem
                  className={`${
                    selectedCategory === category && "bg-zinc-200"
                  }`}
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {filteredJournals.length ? (
            <div
              className={`w-full grid grid-cols-2 gap-10 pb-20 mt-6 ${
                searchResult && "mt-6"
              }`}
            >
              {filteredJournals.map((journal) => (
                <Link
                  href={`/journal/student/${journal._id}`}
                  key={journal._id}
                >
                  <Card className="hover:bg-zinc-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-x-4">
                        <h2 className="truncate">{journal.title}</h2>
                        <span className="text-zinc-700 flex min-w-max items-center gap-x-1 text-sm font-normal bg-zinc-200 py-1 px-2 rounded">
                          <FaUser size={12} />
                          {journal.student_details?.userName
                            ? journal.student_details?.userName
                            : `${journal.student_details?.firstName || ""} ${
                                journal.student_details?.lastName || ""
                              }` || "Not indicated"}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        <p className="text-sm text-zinc-600 flex gap-x-1 items-center">
                          <MdDateRange size={16} />
                          {new Date(journal.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="truncate mt-2 text-start">
                          {convertToAsterisks(journal.entry)}
                        </p>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-5xl text-zinc-800 font-medium">
                Journal {`"${search}"`} not found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalPage;
