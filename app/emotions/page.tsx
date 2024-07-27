"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import Spinner from "@/components/spinner";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getData() {
  try {
    const response = await axiosInstance.get(`/journal/emotions`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
}

const EmotionsPage = () => {
  const [emotions, setEmotions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  usePublicRouteRedirect();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData();
      setEmotions(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Spinner label="Loading Emotions..." />
      ) : (
        <div className="w-full grid grid-cols-4 gap-10 pb-20">
          {emotions &&
            Object.entries(emotions).map(([emotion, students], index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <Card className="hover:bg-zinc-50 w-[260px]">
                    <CardHeader>
                      <CardTitle className="flex flex-col capitalize items-center justify-between">
                        <h3>{emotion}</h3>
                        {/* @ts-ignore */}
                        {students.length <= 2 ? (
                          <div className="gap-y-2 flex flex-col items-center  pl-6 p-3 rounded-md">
                            <p className="text-sm text-zinc-500 py-1 px-4 rounded-xl -ml-3">
                              {/* @ts-ignore */}
                              {students.length} {/* @ts-ignore */}
                              {students.length > 1 ? "students" : "student"}
                            </p>
                            <div className="flex">
                              {/* @ts-ignore */}
                              {students.map((student, index) => (
                                <Avatar
                                  key={index}
                                  className="border-[3px] border-white -ml-3 bg-zinc-500 flex items-center justify-center"
                                >
                                  <p className="text-sm text-white">
                                    {student.userName[0]}
                                  </p>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="gap-y-2 flex flex-col items-center  pl-6 p-3 rounded-md">
                            <p className="text-sm text-zinc-500 py-1 px-2 rounded-full -ml-3">
                              {/* @ts-ignore */}
                              {students.length} {/* @ts-ignore */}
                              {students.length > 1 ? "students" : "student"}
                            </p>
                            <div className="flex">
                              {/* @ts-ignore */}
                              {students.slice(0, 2).map((student, index) => (
                                <Avatar
                                  key={index}
                                  className="border-[3px] border-white -ml-3 flex bg-zinc-500 items-center justify-center"
                                >
                                  <p className="text-sm text-white">
                                    {student.userName[0]}
                                  </p>
                                </Avatar>
                              ))}
                              <Avatar className="border-[3px] border-white -ml-3 flex bg-zinc-500 items-center justify-center">
                                <p className="text-sm text-white">
                                  {/* @ts-ignore */}
                                  {students.slice(2).length}+
                                </p>
                              </Avatar>
                            </div>
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="min-w-[1000px]">
                  <DialogHeader>
                    <DialogTitle className="text-4xl capitalize mb-4">
                      {emotion}
                    </DialogTitle>
                    <DialogDescription>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Emotion Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students &&
                            /* @ts-ignore */
                            students.map((student, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-semibold capitalize">
                                  {student.userName
                                    ? student.userName
                                    : `${student.firstName}  ${student.lastName}`}
                                </TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.course}</TableCell>
                                <TableCell>{student.year}</TableCell>
                                <TableCell>{student.emotion_score}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
        </div>
      )}
    </div>
  );
};

export default EmotionsPage;
