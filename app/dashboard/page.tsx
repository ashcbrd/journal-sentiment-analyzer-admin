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
    const students = await getData("/student");
    const journals = await getData("/journal");
    const emotions = await getData("/journal/emotions");
    const messages = await getData(`/message/${user._id}`);

    setStudents(students.data);
    setJournals(journals.data);
    setEmotions(emotions.data);
    setMessages(messages.data);
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
            <h3>Students</h3>
            <div className="border p-4">
              {students ? `${students.length} Students` : "Loading Students..."}
            </div>
          </Link>
          <Link href="/journals">
            <h3>Journals</h3>
            <div className="border p-4">
              {journals ? `${journals.length} Journals` : "Loading Journals..."}
            </div>
          </Link>
          <Link href="/emotions">
            <h3>Emotions</h3>
            <div className="border p-4">
              {emotions
                ? `${Object.keys(emotions).length} Emotions`
                : "Loading Emotions..."}
            </div>
          </Link>
          <Link href="/messages">
            <h3>Messages</h3>
            <div className="border p-4">
              {conversations.length
                ? `${conversations.length} Messages`
                : "Loading Messages..."}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
