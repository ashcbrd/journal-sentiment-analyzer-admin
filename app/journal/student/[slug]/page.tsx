"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import BackButtonClient from "@/components/back-button-client";
import JournalClient from "@/components/journal-client";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import Spinner from "@/components/spinner";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

function getData(id: string) {
  const response = axiosInstance
    .get(`/journal/${id}`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const JournalPage = ({ params }: { params: { slug: string } }) => {
  // const journal = await getData(params.slug);

  const [journal, setJournal] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getData(params.slug)
      .then((data) => {
        console.log(data);
        setJournal(data?.data);
      })
      .finally(() => setIsloading(false));
  }, [params.slug]);

  usePublicRouteRedirect();

  console.log(journal);

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <BackButtonClient variant="outline" />
          <div className="flex flex-col w-full mt-10">
            <div className="flex w-full justify-between items-center">
              <div className="">
                <h2 className="font-semibold text-4xl">{journal?.title}</h2>
                <p className="mt-2 flex items-center gap-x-2 text-zinc-600 bg-zinc-200 w-max px-4 py-2 rounded-lg text-lg">
                  <FaUser size={15} />
                  {journal?.student_details?.userName
                    ? journal.student_details?.userName
                    : `${journal?.student_details?.firstName} ${journal?.student_details?.lastName}`
                    ? "Not indicated"
                    : ""}
                </p>
              </div>
              <Link href={`/message/student/${journal?.student_details?._id}`}>
                <Button className="px-10">Message</Button>
              </Link>
            </div>
            <p className="text-sm text-zinc-600 mt-4 flex gap-x-2 items-center">
              <MdDateRange size={20} />
              {new Date(journal?.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-4">{journal?.entry}</p>
          </div>
          {/* @ts-ignore */}
          <JournalClient sentiments={journal?.sentiment_score} />
        </div>
      )}
    </div>
  );
};

export default JournalPage;
