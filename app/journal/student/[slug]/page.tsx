"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import BackButtonClient from "@/components/back-button-client";
import JournalClient from "@/components/journal-client";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

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

  useEffect(() => {
    getData(params.slug).then((data) => {
      console.log(data);
      setJournal(data.data);
    });
  }, []);

  usePublicRouteRedirect();

  return (
    <div>
      <BackButtonClient variant="outline" />
      <div className="flex flex-col w-full mt-10">
        <div className="flex w-full justify-between items-center">
          <div className="">
            <h2 className="font-semibold text-4xl">{journal?.title}</h2>
            <p className="mt-2 text-zinc-600 text-lg">
              Author:{" "}
              {journal?.student_details?.userName
                ? journal.student_details?.userName
                : `${journal?.student_details?.firstName} ${journal?.student_details?.lastName}`}
            </p>
          </div>
          <Link href={`/message/student/${journal?.student_id}`}>
            <Button className="px-10">Message</Button>
          </Link>
        </div>
        <p className="mt-4">{journal?.entry}</p>
      </div>
      {/* @ts-ignore */}
      <JournalClient sentiments={journal?.sentiment_score} />
    </div>
  );
};

export default JournalPage;
