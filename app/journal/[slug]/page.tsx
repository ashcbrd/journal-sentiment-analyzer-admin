import Link from "next/link";

import { Button } from "@/components/ui/button";
import response from "../../../data/journals.json";
import BackButtonClient from "@/components/back-button-client";
import JournalClient from "@/components/journal-client";

export default function JournalPage({ params }: { params: { slug: string } }) {
  const journal = response.data.find((item) => item._id === params.slug);

  return (
    <div>
      <BackButtonClient />
      <div className="flex flex-col w-full mt-10">
        <div className="flex w-full justify-between items-center">
          <h2 className="font-semibold text-4xl">{journal?.title}</h2>
          <Link href={`/message/${journal?.student_id}`}>
            <Button className="px-10">Message</Button>
          </Link>
        </div>
        <p className="mt-4">{journal?.entry}</p>
      </div>
      <JournalClient sentiments={journal?.sentiment_score} />
    </div>
  );
}
