import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import response from "../../data/journals.json";

const JournalPage = () => {
  const journals = response.data;

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-10">
        {journals.map((journal, index) => (
          <Link href={`/journal/${journal._id}`} key={index}>
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
