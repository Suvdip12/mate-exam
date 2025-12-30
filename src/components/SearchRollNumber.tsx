"use client";

import * as React from "react";
import { Search, FileText, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
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
import { AdmitCard } from "./AdmitCard";

const MOCK_STUDENTS = [
  {
    rollNo: "295807866",
    appNo: "30152350",
    name: "NANDAN MANNA",
    gender: "Male",
    fatherName: "RABINDRA MANNA",
    address:
      "BALISAI DUBLABARI, Dist.- PURBA MEDINIPUR, P.O.- BALISAI, P.S.- Mandarmani Coastal, Pin : 721423",
    venue:
      "Hatiberia Arun Chandra High School (HS), Vill+PO - Hatiberia, PS - Haldia, Dist - Purba Medinipur",
    examDate: "30.11.2025",
    examTime: "12 Noon - 1 PM",
    reportingTime: "08:00 AM",
    lastEntryTime: "10:30 AM",
  },
  {
    rollNo: "295807867",
    appNo: "30152351",
    name: "SOUMYA DAS",
    gender: "Female",
    fatherName: "SUDIP DAS",
    address:
      "VILL.- MAHISHADAL, P.O.- MAHISHADAL, P.S.- MAHISHADAL, Dist.- PURBA MEDINIPUR, Pin : 721628",
    venue:
      "Mahishadal Raj High School (HS), Vill+PO - Mahishadal, PS - Mahishadal, Dist - Purba Medinipur",
    examDate: "30.11.2025",
    examTime: "12 Noon - 1 PM",
    reportingTime: "08:00 AM",
    lastEntryTime: "10:30 AM",
  },
  {
    rollNo: "295807868",
    appNo: "30152352",
    name: "ANIKET PATRA",
    gender: "Male",
    fatherName: "AMIT PATRA",
    address:
      "VILL.- TAMLUK, P.O.- TAMLUK, P.S.- TAMLUK, Dist.- PURBA MEDINIPUR, Pin : 721636",
    venue:
      "Tamluk Hamilton High School (HS), Vill+PO - Tamluk, PS - Tamluk, Dist - Purba Medinipur",
    examDate: "30.11.2025",
    examTime: "12 Noon - 1 PM",
    reportingTime: "08:00 AM",
    lastEntryTime: "10:30 AM",
  },
  {
    rollNo: "295807869",
    appNo: "30152353",
    name: "PRIYANKA MAITY",
    gender: "Female",
    fatherName: "PRADIP MAITY",
    address:
      "VILL.- CONTAI, P.O.- CONTAI, P.S.- CONTAI, Dist.- PURBA MEDINIPUR, Pin : 721401",
    venue:
      "Contai Deshapran Vidyapith (HS), Vill+PO - Contai, PS - Contai, Dist - Purba Medinipur",
    examDate: "30.11.2025",
    examTime: "12 Noon - 1 PM",
    reportingTime: "08:00 AM",
    lastEntryTime: "10:30 AM",
  },
];

export function SearchRollNumber() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<typeof MOCK_STUDENTS | null>(
    null,
  );
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<
    (typeof MOCK_STUDENTS)[0] | null
  >(null);

  const componentRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Admit_Card_${selectedStudent?.rollNo || "Document"}`,
  });

  // Handle printing for a specific student
  const onPrintClick = (student: (typeof MOCK_STUDENTS)[0]) => {
    setSelectedStudent(student);
    // We need to wait for state update to render the correct data in the hidden AdmitCard
    console.log("HAi");
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const filtered = MOCK_STUDENTS.filter((s) => s.rollNo.includes(query));
      setResults(filtered);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="hidden">
        {selectedStudent && (
          <AdmitCard
            ref={componentRef}
            data={{ ...selectedStudent, venue: selectedStudent.venue }}
          />
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
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Enter Roll Number (e.g. 295807866)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 rounded-none border-2 focus-visible:border-primary focus-visible:ring-0"
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching}
              className="h-11 rounded-none bg-primary px-8 font-bold uppercase hover:bg-primary/90"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {results && (
        <Card className="rounded-none border-2 shadow-sm">
          <CardHeader className="border-b bg-muted/50 py-3">
            <h2 className="text-sm font-bold uppercase tracking-wide">
              Search Results
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            {results.length > 0 ? (
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
                  {results.map((student) => (
                    <TableRow
                      key={student.rollNo}
                      className="border-b last:border-0 hover:bg-transparent"
                    >
                      <TableCell className="border-r font-mono font-medium">
                        {student.rollNo}
                      </TableCell>
                      <TableCell className="border-r font-medium uppercase">
                        {student.name}
                      </TableCell>
                      <TableCell className="border-r py-4 text-sm leading-tight">
                        {student.venue}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-none border-2 border-primary bg-transparent font-bold text-primary hover:bg-primary hover:text-white"
                          onClick={() => onPrintClick(student)}
                        >
                          <FileText className="mr-1 h-3 w-3" />
                          VIEW ADMIT CARD
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center">
                <p className="font-bold uppercase text-destructive">
                  No records found for Roll Number &quot;{query}&quot;
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please verify the roll number and try again.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Important Instructions Box */}
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
            Ensure your photograph and signature are clearly visible on the
            printed card.
          </li>
          <li>
            Reporting time is 45 minutes prior to the commencement of the exam.
          </li>
        </ul>
      </div>
    </div>
  );
}
