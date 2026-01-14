"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resultFormSchema } from "@/lib/validations";
import { useEffect, useState } from "react";
import LoadingButton from "../LoadingButton";
import { calculateScore } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { StudentWithSchoolCenter } from "@/types/prisma.types";
import { ApiResponse } from "@/types/api-response.types";

export default function ResultForm() {
  const [score, setScore] = useState<number>();
  const [totalAttemt, setTotalAttemt] = useState<number>(0);
  const [currectAttemt, setCurrectAttemt] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFetchingStudent, setIsFetchingStudent] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      center: {
        center: "",
        center_code: "",
      },
      school: {
        school_name: "",
        school_code: "",
      },
      name: "",
      class: "",
      total_attemt: 0,
      roll_number: "",
      currect_attemt: 0,
    },
  });

  // Calculate the score
  useEffect(() => {
    const score = calculateScore(totalAttemt, currectAttemt);
    setScore(score);
  }, [totalAttemt, currectAttemt]);

  const fetchStudentData = async () => {
    const rollNumber = form.getValues("roll_number");

    if (!rollNumber || rollNumber.length < 3) {
      toast.error("Please enter a valid roll number");
      return;
    }

    setIsFetchingStudent(true);
    try {
      const response = await axios.get<ApiResponse<StudentWithSchoolCenter>>(
        `/api/student/${rollNumber}`,
      );

      if (response.data.success && response.data.data) {
        const student = response.data.data;

        // Populate form fields with fetched student data
        form.setValue("name", student.fullName);
        form.setValue("class", student.class);
        form.setValue("center", {
          center: student.center.center_name,
          center_code: student.center.center_code,
        });
        form.setValue("school", student.school);
        toast.success("Student data loaded successfully");
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
      const axiosError = error as AxiosError<ApiResponse>;

      if (axiosError.response?.status === 404) {
        toast.error("Student not found with this roll number");
        // Clear student-related fields
        form.setValue("name", "");
        form.setValue("class", "");
        form.setValue("center", {
          center: "",
          center_code: "",
        });
        form.setValue("school", {
          school_name: "",
          school_code: "",
        });
      } else {
        toast.error(
          axiosError.response?.data.message ?? "Error fetching student data",
        );
      }
    } finally {
      setIsFetchingStudent(false);
    }
  };

  const handleReset = () => {
    const currentRollNumber = form.getValues("roll_number");
    form.reset();
    form.setValue("roll_number", currentRollNumber);
    setTotalAttemt(0);
    setCurrectAttemt(0);
    setScore(undefined);
  };

  async function onSubmit(values: z.infer<typeof resultFormSchema>) {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        "/api/student/result/create",
        {
          ...values,
          score,
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        handleReset();
      }
    } catch (error) {
      console.log("Error creating result:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Error creating result");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-3 pb-5"
      >
        <FormField
          control={form.control}
          name="roll_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll Number</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter student roll number..."
                    type="text"
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={fetchStudentData}
                    disabled={isFetchingStudent}
                    className="shrink-0"
                  >
                    {isFetchingStudent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Enter roll number and click search to auto-fill student details
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student name"
                  type="text"
                  {...field}
                  disabled
                  className="disabled:opacity-70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student class"
                  type="text"
                  {...field}
                  disabled
                  className="disabled:opacity-70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Center</FormLabel>
          <Input
            value={form.watch("center.center")}
            placeholder="Center name"
            disabled
            className="disabled:opacity-70"
          />
          <FormDescription className="mt-1">
            Center Code: {form.watch("center.center_code") || "N/A"}
          </FormDescription>
        </div>

        <div>
          <FormLabel>School</FormLabel>
          <Input
            value={form.watch("school.school_name")}
            placeholder="School name"
            disabled
            className="disabled:opacity-70"
          />
          <FormDescription className="mt-1">
            School Code: {form.watch("school.school_code") || "N/A"}
          </FormDescription>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="total_attemt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Attempt</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total attempt questions.."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTotalAttemt(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="currect_attemt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Attempt</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Correct attempt questions.."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCurrectAttemt(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <p className="font-mono text-destructive">
          Total Mark: {score !== undefined ? score : "N/A"}
        </p>

        <LoadingButton loading={isSubmitting} className="w-full" type="submit">
          Submit Result
        </LoadingButton>
      </form>
    </Form>
  );
}
