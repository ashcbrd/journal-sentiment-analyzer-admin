"use client";

import { FaChartSimple } from "react-icons/fa6";
import { FaTable } from "react-icons/fa6";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Sentiment {
  label: string;
  score: number;
}

interface SentimentProps {
  sentiments: Sentiment[];
}

const JournalClient = ({ sentiments }: { sentiments: SentimentProps }) => {
  const [layout, setLayout] = useState("table");

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between w-full mt-20 mb-4">
        <h3 className="text-2xl font-semibold">Sentiment Scores</h3>
        <div className="flex items-center bg-white w-max rounded-lg">
          <FaTable
            onClick={() => setLayout("table")}
            size={40}
            className={`cursor-pointer p-2 ${
              layout === "table"
                ? "bg-primary text-secondary  rounded-md"
                : "bg-none text-zinc-800"
            }`}
          />
          <FaChartSimple
            size={40}
            onClick={() => setLayout("chart")}
            className={`cursor-pointer p-2 ${
              layout === "chart"
                ? "bg-primary text-secondary  rounded-md"
                : "bg-none text-zinc-800"
            }`}
          />
        </div>
      </div>
      {sentiments && layout === "table" ? (
        // @ts-ignore
        <SentimentScoreTable sentiments={sentiments} />
      ) : (
        // @ts-ignore
        sentiments && <SentimentBarChart sentiments={sentiments} />
      )}
    </div>
  );
};

export default JournalClient;

const SentimentBarChart: React.FC<SentimentProps> = ({ sentiments }) => {
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

const sliceNumbers = [
  {
    first: 0,
    second: 7,
  },
  {
    first: 7,
    second: 14,
  },
  {
    first: 14,
    second: 21,
  },
  {
    first: 21,
    second: 28,
  },
];

const SentimentScoreTable: React.FC<SentimentProps> = ({ sentiments }) => {
  return (
    <div className="flex flex-col space-y-6">
      {sliceNumbers.map((item, index) => (
        <Table key={index} className="border">
          <TableHeader>
            <TableRow className="bg-zinc-200">
              {sentiments
                .slice(item.first, item.second)
                .map((sentiment, index) => (
                  <TableHead key={index} className="capitalize font-md">
                    {sentiment.label}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {sentiments
                .slice(item.first, item.second)
                .map((sentiment, index) => (
                  <TableCell key={index} className="text-xs">
                    {sentiment.score}
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
};
