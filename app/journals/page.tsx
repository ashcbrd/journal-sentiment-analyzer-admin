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
import { useEffect, useState } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

function getData() {
  const response = axiosInstance
    .get(`/journal`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const JournalPage = () => {
  // const journals = await getData();

  const journals = await getData();
  const [journals, setJournals] = useState(null);

  usePublicRouteRedirect();

  useEffect(() => {
    getData().then((data) => {
      setJournals(data);
    });
  }, []);

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-10">
        {journals &&
          journals.data.map((journal, index) => (
            <Link href={`/journal/student/${journal._id}`} key={index}>
              <Card className="hover:bg-zinc-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {journal.title}{" "}
                    <span className="text-zinc-700 flex items-center gap-x-1 text-sm font-normal bg-zinc-200 py-1 px-2 rounded ml-4">
                      <FaUser size={12} />{" "}
                      {journal.student_details.userName
                        ? journal.student_details.userName
                        : `${journal.student_details.firstName} ${journal.student_details.lastName}`}
                    </span>
                  </CardTitle>
                  <CardDescription className="truncate">
                    {journal.entry}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default JournalPage;
