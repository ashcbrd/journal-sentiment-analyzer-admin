"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import response from "../../../../data/students.json";
import BackButtonClient from "@/components/back-button-client";
import { Input } from "@/components/ui/input";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

export default function JournalPage({ params }: { params: { slug: string } }) {
  const [message, setMessage] = useState<string>("");
  const [sentMessage, setSentMessage] = useState<string[]>([]);

  const student = response.data.find((item) => item._id === params.slug);

  usePublicRouteRedirect();

  const handleSendMessage = () => {
    if (message.trim()) {
      setSentMessage([...sentMessage, message]);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex gap-x-6 items-center">
        <BackButtonClient />
        <h3 className="font-semibold text-3xl">
          {student?.firstName} {student?.lastName}
        </h3>
      </div>
      <div className="w-full h-full rounded-lg bg-white mt-10 max-h-[80%] px-10 py-4 flex flex-col justify-end overflow-x-hidden">
        <div>
          {sentMessage &&
            sentMessage.map((message, index) => (
              <OwnMessage key={index} message={message} />
            ))}
        </div>
      </div>
      <div className="flex gap-x-4 items-center mt-6 pb-10">
        <Input
          type="text"
          className="h-14"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button className="h-14 w-32 text-lg" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

const OwnMessage = ({ message }: { message?: string }) => {
  return (
    <motion.div
      initial={{ x: 150, scale: 0, opacity: 0 }}
      animate={{ x: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="bg-primary rounded-3xl h-max w-max max-w-[400px] px-4 py-2 my-4 text-white mt-auto ml-auto relative"
    >
      {message}
    </motion.div>
  );
};
