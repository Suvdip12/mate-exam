"use client";

import * as React from "react";
import { FileText, Search } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AdmitCard } from "./AdmitCard";
import { admitSearchSchema, type AdmitSearchValues } from "@/lib/validations";
import { ApiResponse } from "@/types/api-response.types";
import { StudentWithSchoolCenter } from "@/types/prisma.types";
import { AdmitCardData } from "@/types/types";
import LoadingButton from "./LoadingButton";

function transformStudentToAdmitCard(
  student: StudentWithSchoolCenter,
): AdmitCardData {
  const venue = student.center.address
    ? `${student.center.center_name}, ${student.center.address}`
    : student.center.center_name;

  return {
    id: student.id,
    rollNo: student.rollNumber,
    appNo: student.rollNumber.split("/")[3],
    name: student.fullName,
    gender: "",
    fatherName: "",
    address: student.center.address || "",
    examDate: "11/01/2026",
    examTime: "12:00 PM",
    venue,
    reportingTime: "11:00 AM",
    lastEntryTime: "11:45 AM",
  };
}

export function SearchRollNumber() {
  const [student, setStudent] = React.useState<StudentWithSchoolCenter | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [selectedStudent, setSelectedStudent] =
    React.useState<AdmitCardData | null>(null);

  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `admit-card-${selectedStudent?.rollNo || "Document"}`,
  });

  const form = useForm<AdmitSearchValues>({
    resolver: zodResolver(admitSearchSchema),
    defaultValues: {
      rollNumber: "",
    },
  });

  const onPrintClick = (data: AdmitCardData) => {
    setSelectedStudent(data);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  async function onSubmit(values: AdmitSearchValues) {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get<ApiResponse<StudentWithSchoolCenter>>(
        `/api/student/admit/${values.rollNumber}`,
      );

      if (response.data.success && response.data.data) {
        setStudent(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Student not found");
        setStudent(null);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch student data",
      );
      setStudent(null);
    } finally {
      setIsLoading(false);
    }
  }

  const admitCardData = student ? transformStudentToAdmitCard(student) : null;

  return (
    <div className="space-y-6">
      <div className="hidden">
        {selectedStudent && (
          <AdmitCard ref={componentRef} data={selectedStudent} />
        )}
      </div>

      <Card className="rounded-none border-t-4 border-t-primary shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold uppercase">
            Search Student Data
          </CardTitle>
          <CardDescription>
            Enter your Roll Number to view your details and download the Admit
            Card.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 md:flex-row"
            >
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter Roll Number (e.g. KU/26/VII/001)"
                        className="h-11 text-balance rounded border-2 focus-visible:border-primary focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                type="submit"
                loading={isLoading}
                className="h-11 rounded bg-primary px-8 hover:bg-primary/90"
              >
                <Search className="size-4" />
                Search
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>

      {student && admitCardData && (
        <Card className="rounded-none border-2 shadow-sm">
          <CardHeader className="border-b bg-muted/50 py-3">
            <h2 className="text-sm font-bold uppercase tracking-wide">
              Search Results
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[150px] border-r font-bold text-foreground">
                    Roll No.
                  </TableHead>
                  <TableHead className="border-r font-bold text-foreground">
                    Student Name
                  </TableHead>
                  <TableHead className="border-r font-bold text-foreground">
                    Exam Center
                  </TableHead>
                  <TableHead className="text-center font-bold text-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b last:border-0 hover:bg-transparent">
                  <TableCell className="border-r font-mono font-medium">
                    {student.rollNumber}
                  </TableCell>
                  <TableCell className="border-r font-medium uppercase">
                    {student.fullName}
                  </TableCell>
                  <TableCell className="border-r py-4 text-sm leading-tight">
                    {admitCardData.venue}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-none border-2 border-primary bg-transparent font-bold text-primary hover:bg-primary hover:text-white"
                      onClick={() => onPrintClick(admitCardData)}
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      VIEW ADMIT CARD
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {student === null && hasSearched && !isLoading && (
        <Card className="rounded-none border-2 shadow-sm">
          <CardContent className="p-12 text-center">
            <p className="font-bold uppercase text-destructive">
              No records found for Roll Number &quot;
              {form.getValues("rollNumber")}&quot;
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please verify the roll number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="border-l-4 border-amber-500 bg-amber-50 p-4 text-sm">
        <h3 className="mb-2 font-bold uppercase text-amber-900">
          Important Instructions:
        </h3>
        <ul className="list-inside list-disc space-y-1 text-amber-800">
          <li>
            Always carry a printed copy of your admit card to the examination
            center.
          </li>
          <li>
            Candidates must download the admit card only from the official
            website.
          </li>
          <li>
            Verify all personal details on the admit card after downloading. In
            case of any discrepancy, report immediately to the examination
            authority.
          </li>
          <li>
            Do not write or make any markings on the admit card except where
            instructed.
          </li>
        </ul>
      </div>
    </div>
  );
}
