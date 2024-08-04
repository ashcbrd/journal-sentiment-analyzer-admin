"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import response from "../../data/students.json";
import { axiosInstance } from "@/lib/utils";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import { checkAuth } from "@/lib/check-auth";
import Spinner from "@/components/spinner";

function getData() {
  const response = axiosInstance
    .get(`/student`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const StudentsPage = () => {
  // const students = await getData();
  const [students, setStudents] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getData()
      .then((data) => {
        setStudents(data);
      })
      .finally(() => setIsloading(false));
  }, []);

  usePublicRouteRedirect();

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <Table>
          <TableCaption>List of students.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students &&
              students.data.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="text-zinc-500">{index + 1}</TableCell>
                  <TableCell className="font-semibold capitalize">
                    {student.userName
                      ? student.userName
                      : `${student.firstName}  ${student.lastName}`}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default StudentsPage;
