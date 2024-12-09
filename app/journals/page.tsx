"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import Spinner from "@/components/spinner";
import { MdDateRange } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

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

  usePublicRouteRedirect();

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

  const searchFilteredJournals = useMemo(() => {
    return journals.filter(
      (item) =>
        item.title.toLowerCase().includes(search) &&
        (selectedCategory === "All Categories" ||
          item.sentiment_category.toLowerCase() === selectedCategory)
    );
  }, [journals, search, selectedCategory]);

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

  const handlePinChange = (value: string, journalId: string) => {
    setPin(value);
    if (value.length === 6) {
      handlePinSubmit(value, journalId);
    }
  };

  const handlePinSubmit = (enteredPin: string, journalId: string) => {
    if (enteredPin === "123456") {
      router.push(`/journal/student/${journalId}`);
    } else {
      toast.error("PIN is wrong! Please try again.");
    }
  };

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Spinner label="Loading Journals..." />
      ) : (
        <div className="h-full">
          <div className="px-6 py-2 mb-4 border w-max rounded-md shadow">
            <DropdownMenu>
              <DropdownMenuTrigger className="capitalize">
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
          </div>

          {searchResult && (
            <div className="flex items-center gap-x-2">
              <p>
                Showing {searchFilteredJournals.length}{" "}
                {searchFilteredJournals.length > 1 ? "results" : "result"} for{" "}
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

          {searchFilteredJournals.length ? (
            <div
              className={`w-full grid grid-cols-2 gap-10 pb-20 ${
                searchResult && "mt-6"
              }`}
            >
              {searchFilteredJournals.map((journal) => (
                <div key={journal._id}>
                  <Dialog
                    onOpenChange={() => {
                      if (!pin) setPin("");
                    }}
                  >
                    <DialogTrigger className="w-full">
                      <Card className="hover:bg-zinc-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-x-4">
                            <h2 className="truncate">{journal.title}</h2>
                            <span className="text-zinc-700 flex min-w-max items-center gap-x-1 text-sm font-normal bg-zinc-200 py-1 px-2 rounded">
                              <FaUser size={12} />
                              {journal.student_details?.userName
                                ? journal.student_details?.userName
                                : `${
                                    journal.student_details?.firstName || ""
                                  } ${
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
                    </DialogTrigger>
                    <DialogContent className="flex flex-col justify-center w-max p-10 bg-white">
                      <DialogTitle>
                        Enter pin to view journal entry.
                      </DialogTitle>
                      <DialogDescription className="mt-4">
                        <InputOTP
                          maxLength={6}
                          onChange={(value) =>
                            handlePinChange(value, journal._id)
                          }
                        >
                          <InputOTPGroup>
                            <InputOTPSlot className="bg-zinc-50" index={0} />
                            <InputOTPSlot className="bg-zinc-50" index={1} />
                            <InputOTPSlot className="bg-zinc-50" index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot className="bg-zinc-50" index={3} />
                            <InputOTPSlot className="bg-zinc-50" index={4} />
                            <InputOTPSlot className="bg-zinc-50" index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
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
