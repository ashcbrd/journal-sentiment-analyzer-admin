import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";

async function getData() {
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

const JournalPage = async () => {
  const journals = await getData();

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-10">
        {journals &&
          journals.data.map((journal, index) => (
            <Link href={`/journal/student/${journal._id}`} key={index}>
              <Card className="hover:bg-zinc-50">
                <CardHeader>
                  <CardTitle>{journal.title}</CardTitle>
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
