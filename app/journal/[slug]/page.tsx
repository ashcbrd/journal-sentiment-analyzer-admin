import { Button } from "@/components/ui/button";
import response from "../../../data/journals.json";
import BackButtonClient from "@/components/back-button-client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function JournalPage({ params }: { params: { slug: string } }) {
  const journal = response.data.find((item) => item._id === params.slug);

  return (
    <div>
      <BackButtonClient />
      <div className="flex w-full justify-between items-center mt-10">
        <div>
          <h2 className="font-semibold text-4xl">{journal?.title}</h2>
          <p className="mt-4">{journal?.entry}</p>
        </div>
        <Link href={`/chat/${journal?.student_id}`}>
          <Button className="px-10">Message</Button>
        </Link>
      </div>
      <h3 className="mt-20 text-2xl font-semibold mb-4">Sentiment Scores</h3>
      <SentimentBarChart sentiments={journal?.sentiment_score} />
    </div>
  );
}

interface Sentiment {
  label: string;
  score: number;
}

interface SentimentBarChartProps {
  sentiments: Sentiment[];
}

const SentimentBarChart: React.FC<SentimentBarChartProps> = ({
  sentiments,
}) => {
  const maxValue = Math.max(...sentiments.map((sentiment) => sentiment.score));

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center space-y-2 bg-secondary rounded p-4 border bg-white">
      {sentiments.map((sentiment, index) => (
        <div key={index} className="w-full flex items-center gap-x-4">
          <span className="min-w-32 capitalize font-medium">
            {sentiment.label}
          </span>
          <div
            style={{ width: `${(sentiment.score / maxValue) * 100}%` }}
            className="h-4 bg-blue-500 transition-all rounded duration-300 ml-4"
            title={`Score: ${sentiment.score}`}
          />
          <span className="text-xs">{sentiment.score}</span>
        </div>
      ))}
    </div>
  );
};
