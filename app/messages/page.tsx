import Link from "next/link";
import response from "../../data/students.json";
import { Button } from "@/components/ui/button";
import EmptyState from "../empty-state";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatPage = () => {
  const students = response.data;
  return (
    <div className="flex flex-col gap-y-4 px-4">
      <div className="flex gap-x-10 mb-20">
        {students.map((student, index) => (
          <div key={index} className="flex flex-col items-center gap-y-2">
            <Link
              key={index}
              href={`/message/student/${student._id}`}
              className="rounded-full bg-zinc-300 border border-blue-300 w-16 h-16 flex items-center justify-center"
            >
              <Avatar>
                <AvatarImage src={`https://robohash.org/${index}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <p>{student.firstName}</p>
          </div>
        ))}
      </div>
      <EmptyState>
        <h2 className="text-2xl font-medium text-zinc-500">
          No Conversations Yet.
        </h2>
      </EmptyState>
    </div>
  );
};

export default ChatPage;
