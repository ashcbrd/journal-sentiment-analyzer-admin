"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BackButtonClient from "@/components/back-button-client";
import { Input } from "@/components/ui/input";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import { axiosInstance } from "@/lib/utils";

async function getStudents() {
  try {
    const response = await axiosInstance.get(`/student`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students", error);
    return [];
  }
}

export default function SingleChatPage({
  params,
}: {
  params: { slug: string };
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getStudents();
      setStudents(data);
    })();
  }, []);

  const student = students.find((item) => item._id === params.slug);

  usePublicRouteRedirect();

  useEffect(() => {
    if (!user) return;

    const socketInstance = new WebSocket(
      `ws://127.0.0.1:8000/message/ws/${user._id}`
    );

    socketInstance.onopen = () => {
      console.log("WebSocket connection established.");
      setIsSocketConnected(true);

      fetch(
        `http://127.0.0.1:8000/message?sender_id=${user._id}&receiver_id=${params.slug}`
      )
        .then((response) => response.json())
        .then((data) => setMessages(data));
    };

    socketInstance.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message: ", data.message);
      if (data.sender_id !== user._id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, [params.slug, user, user?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && isSocketConnected && messageInput.trim() !== "") {
      const message = {
        sender_name: `${user.firstName} ${user.lastName}`,
        receiver_name: student.userName,
        sender_id: user._id,
        receiver_id: params.slug,
        message: messageInput,
        sender_type: "admin",
        created_at: new Date().toISOString(),
      };

      socket.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex gap-x-6 items-center">
        <BackButtonClient variant="outline" />
        <h3 className="font-semibold text-3xl">{student?.userName}</h3>
      </div>
      <div className="w-full h-full rounded-lg bg-white mt-10 max-h-[80%] px-10 py-4 flex flex-col overflow-y-scroll">
        <div className="h-max">
          {messages &&
            messages.map((message, index) => (
              <div key={index}>
                <motion.div
                  initial={{
                    x: message.sender_type === "admin" ? 150 : -150,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{ x: 0, scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 80 }}
                  className={`${
                    message.sender_type === "admin"
                      ? "bg-primary text-white ml-auto"
                      : "mr-auto border border-zinc-300 text-zinc-600"
                  }  rounded-3xl shadow-sm h-max w-max max-w-[400px] px-4 py-2 my-4 mt-auto relative`}
                >
                  {message.message}
                </motion.div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex gap-x-4 items-center mt-6 pb-10">
        <Input
          type="text"
          className="h-14"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter message"
          onKeyDown={handleKeyDown}
        />
        <Button className="h-14 w-32 text-lg" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
