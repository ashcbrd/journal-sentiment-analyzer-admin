"use client";

import { axiosInstance } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

import { HiMiniUserGroup } from "react-icons/hi2";
import { IoIosJournal } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import CurrentTime from "@/components/current-time";

function getData(url: string) {
  const response = axiosInstance
    .get(url, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState(null);
  const [emotions, setEmotions] = useState(null);
  const [journals, setJournals] = useState(null);
  const [messages, setMessages] = useState(null);

  const user = JSON.parse(localStorage.getItem("adminUser")!);

  const fetchData = async () => {
    setIsLoading(true);
    const students = await getData("/student");
    const journals = await getData("/journal");
    const emotions = await getData("/journal/emotions");
    const messages = await getData(`/message/${user._id}`);

    setStudents(students.data);
    setJournals(journals.data);
    setEmotions(emotions.data);
    setMessages(messages.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const conversations = Array.from(
    new Map(
      messages && messages.map((item) => [item.receiver_id, item])
    ).values()
  );

  return (
    <div>
      <div className="px-10 py-6">
        <h3 className="text-xl font-semibold">Hey, {user.firstName}!</h3>
        <CurrentTime />
      </div>
      <Separator />
      <div className="px-10 py-6">
        <PageHeader>Dashboard</PageHeader>
        <div className="grid grid-cols-2 gap-10">
          <Link href="/students">
            <div className="border hover:bg-zinc-200 transition-all p-6 rounded-lg h-32 bg-accent">
              <div className="flex items-center gap-x-4">
                <HiMiniUserGroup size={40} className="text-zinc-600" />
                <p className="font-bold text-3xl text-zinc-600">
                  {students && students.length}{" "}
                  <span className="font-medium text-xl text-zinc-500">
                    Students
                  </span>
                </p>
              </div>
            </div>
          </Link>
          <Link href="/journals">
            <div className="border hover:bg-zinc-200 transition-all p-6 rounded-lg h-32 bg-accent">
              <div className="flex items-center gap-x-4">
                <IoIosJournal size={40} className="text-zinc-600" />
                <p className="font-bold text-3xl text-zinc-600">
                  {journals && journals.length}{" "}
                  <span className="font-medium text-xl text-zinc-500">
                    Journals
                  </span>
                </p>
              </div>
            </div>
          </Link>
          <Link href="/emotions">
            <div className="border hover:bg-zinc-200 transition-all p-6 rounded-lg h-32 bg-accent">
              <div className="flex items-center gap-x-4">
                <MdEmojiEmotions size={40} className="text-zinc-600" />
                <p className="font-bold text-3xl text-zinc-600">
                  {emotions && Object.keys(emotions).length}{" "}
                  <span className="font-medium text-xl text-zinc-500">
                    Emotions
                  </span>
                </p>
              </div>
            </div>
          </Link>
          <Link href="/messages">
            <div className="border hover:bg-zinc-200 transition-all p-6 rounded-lg h-32 bg-accent">
              <div className="flex items-center gap-x-4">
                <AiFillMessage size={40} className="text-zinc-600" />
                <p className="font-bold text-3xl text-zinc-600">
                  {conversations && conversations.length}{" "}
                  <span className="font-medium text-xl text-zinc-500">
                    Messages
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
