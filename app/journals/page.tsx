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
import { axiosInstance, cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import Spinner from "@/components/spinner";
import { MdDateRange } from "react-icons/md";
import Search from "@/components/search";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DateFilter from "@/components/date-filter";

const getData = async () => {
  try {
    const response = await axiosInstance.get(`/journal`);
    return response.data;
  } catch (error) {
    console.error("Error fetching journals:", error);
    return null;
  }
};

const JournalPage = () => {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const searchResult = searchParams.get("s");

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
    // @ts-ignore
    return journals.filter((item) => item.title.toLowerCase().includes(search));
  }, [journals, search]);

  const handleClearSearch = () => {
    router.push("/journals");
    setSearch("");
  };

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Spinner label="Loading Journals..." />
      ) : (
        <div className="h-full">
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
                <Link
                  /* @ts-ignore */
                  href={`/journal/student/${journal._id}`}
                  /* @ts-ignore */
                  key={journal._id}
                >
                  <Card className="hover:bg-zinc-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-x-4">
                        {/* @ts-ignore */}
                        <h2 className="truncate">{journal.title} </h2>
                        <span className="text-zinc-700 flex min-w-max items-center gap-x-1 text-sm font-normal bg-zinc-200 py-1 px-2 rounded">
                          <FaUser size={12} /> {/* @ts-ignore */}
                          {journal.student_details?.userName
                            ? /* @ts-ignore */
                              journal.student_details?.userName
                            : /* @ts-ignore */
                            `${journal.student_details?.firstName} ${journal.student_details?.lastName}`
                            ? "Not indicated"
                            : ""}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        <p className="text-sm text-zinc-600 flex gap-x-1 items-center">
                          <MdDateRange size={16} />
                          {/* @ts-ignore */}
                          {new Date(journal.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        {/* @ts-ignore */}
                        <p className="truncate mt-2">{journal.entry}</p>
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
