"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { StudentCard } from "@/components/StudentCard";
import { studentSearchSchema, StudentSearchValues } from "@/lib/validations";
import { StudentWithSchoolCenter } from "@/types/prisma.types";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/api-response.types";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton";
import UpdateStudentDialog from "@/components/UpdateStudentDialog";

export default function StudentSearchPage() {
  const [searchResults, setSearchResults] = useState<
    StudentWithSchoolCenter[] | []
  >([]);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentWithSchoolCenter | null>(null);
  const [isUpdatedDialogOpen, setIsUpdatedDialogOpen] =
    useState<boolean>(false);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const form = useForm<StudentSearchValues>({
    resolver: zodResolver(studentSearchSchema),
    defaultValues: { query: "" },
  });

  const [hasSearched, setHasSearched] = useState(false);

  async function onSubmit(values: StudentSearchValues) {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await axios.get<ApiResponse<StudentWithSchoolCenter[]>>(
        `/api/student/search?q=${values.query}`,
      );
      if (response.data.success && response.data.data) {
        toast.success(response.data.message);
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.log("Error in signing up :: ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Error signing up");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="text-pretty px-4 pt-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
              User Directory
            </h1>
            <p>Search for users by roll number</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="border-b bg-background px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Enter roll number or name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LoadingButton
                  loading={isSearching}
                  type="submit"
                  className="w-full gap-2 sm:w-auto"
                >
                  <Search className="h-4 w-4" />
                  Search
                </LoadingButton>
              </form>
            </Form>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-background px-4 py-6 sm:px-4">
          <div className="mx-auto max-w-6xl">
            {!hasSearched ? (
              <div className="py-6 text-center">
                <p className="text-lg text-muted-foreground">
                  Enter a roll number and click search to get started
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-lg text-muted-foreground">
                  No users found matching {`"${form.getValues().query}"`}
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Found {searchResults.length}{" "}
                  {searchResults.length === 1 ? "student" : "students"}
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      handleUpdate={(student) => {
                        setSelectedStudent(student);
                        setIsUpdatedDialogOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedStudent && (
        <UpdateStudentDialog
          isOpen={isUpdatedDialogOpen}
          onClose={() => setIsUpdatedDialogOpen(false)}
          student={selectedStudent}
          onUpdateSuccess={(updatedStudent) => {
            setSearchResults((prev) =>
              prev.map((s) =>
                s.id === updatedStudent.id ? updatedStudent : s,
              ),
            );
            toast.success("Student updated successfully!");
            setIsUpdatedDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
