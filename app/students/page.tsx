import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import response from "../../data/students.json";

const DashboardPage = () => {
  const students = response.data;

  return (
    <div className="w-full">
      <Table>
        <TableCaption>List of students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course of Study</TableHead>
            <TableHead>Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell className="font-semibold capitalize">
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.course_of_study}</TableCell>
              <TableCell>{student.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardPage;
