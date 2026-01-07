"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LocationSelector from "../ui/location-selector";
import { StudentFormValues, studentSchema } from "@/lib/validations";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios, { AxiosError } from "axios";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api-response.types";
import { Student } from "@prisma/client";
import LoadingButton from "../LoadingButton";
import { StudentWithSchoolCenter } from "@/types/prisma.types";
import { Checkbox } from "@/components/ui/checkbox";

interface StudentFormProps {
  onSuccess?: (data: Student) => void;
  mode: "create" | "update";
  student?: StudentWithSchoolCenter;
  onUpdateSuccess?: (data: StudentWithSchoolCenter) => void;
}

export default function StudentForm({
  onSuccess,
  mode,
  student,
  onUpdateSuccess,
}: StudentFormProps) {
  const isFormResat = false;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [calendarDropdownOpen, setCalendarDropdownOpen] = useState(false);
  const [showAllSchools, setShowAllSchools] = useState(false);

  const name = student?.fullName?.split(" ") ?? ["", ""];
  const initialValues = {
    firstName: name[0] ?? "",
    lastName: name[1] ?? "",
    center: {
      center: student?.center.center_name ?? "",
      center_code: student?.center.center_code ?? "",
      center_address: student?.center.address ?? "",
    },
    school: {
      school_name: student?.school.school_name ?? "",
      school_code: student?.school.school_code ?? "",
    },
    class: student?.class ?? "",
    dateOfBirth: student?.dateOfBirth ?? undefined,
    phoneNumber: student?.phoneNumber ?? "",
    paper: student?.paper ?? "",
  };

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: StudentFormValues) {
    setIsSubmitting(true);
    try {
      if (mode === "create" && onSuccess) {
        const response = await axios.post<ApiResponse<Student>>(
          "/api/student/registration",
          values,
        );
        if (response.data.success && response.data.data) {
          toast.success(response.data.message);
          onSuccess(response.data.data);
          form.reset(
            {
              firstName: "",
              lastName: "",
              dateOfBirth: undefined,
              phoneNumber: "",
              center: form.getValues("center"),
              school: form.getValues("school"),
              class: form.getValues("class"),
              paper: form.getValues("paper"),
            },
            {
              keepDirtyValues: false,
              keepErrors: false,
            },
          );
        }
      }

      if (mode === "update" && student && onUpdateSuccess) {
        const hasChanges =
          JSON.stringify(values) !== JSON.stringify(initialValues);
        if (!hasChanges) {
          toast.info("No changes detected");
          setIsSubmitting(false);
          return;
        }
        const response = await axios.put<ApiResponse<StudentWithSchoolCenter>>(
          `/api/student/update/${student.id}`,
          values,
        );
        if (response.data.success && response.data.data) {
          onUpdateSuccess(response.data.data);
        }
      }
    } catch (error) {
      console.log("Error in registration :: ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Error registration");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="center"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Select Center</FormLabel>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showAllSchools"
                    checked={showAllSchools}
                    onCheckedChange={(checked) =>
                      setShowAllSchools(checked === true)
                    }
                  />
                  <label
                    htmlFor="showAllSchools"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show All Schools
                  </label>
                </div>
              </div>
              <FormControl>
                <LocationSelector
                  valueCenter={form.watch("center")}
                  valueSchool={form.watch("school")}
                  isFormResat={isFormResat}
                  showAllSchools={showAllSchools}
                  onCenterChange={(center) => {
                    form.setValue(field.name, {
                      center: center?.name || "",
                      center_code: center?.code || "",
                      center_address: center?.address || "",
                    });
                  }}
                  onSchoolChange={(school) => {
                    form.setValue("school", {
                      school_name: school?.name || "",
                      school_code: school?.school_code || "",
                    });
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {showAllSchools
                  ? "All schools are shown. Select any school regardless of center."
                  : "If your center has school, it will appear after selecting center"}
              </FormDescription>
              {(form.formState.errors.center?.center ||
                form.formState.errors.center?.center_code ||
                form.formState.errors.school?.school_name ||
                form.formState.errors.school?.school_code) && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.center?.center?.message ||
                    form.formState.errors.center?.center_code?.message ||
                    form.formState.errors.school?.school_name?.message ||
                    form.formState.errors.school?.school_code?.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student class.." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="V">V</SelectItem>
                    <SelectItem value="VI">VI</SelectItem>
                    <SelectItem value="VII">VII</SelectItem>
                    <SelectItem value="VIII">VIII</SelectItem>
                    <SelectItem value="IX">IX</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paper"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="paper preference.." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="BEN">Bengali</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Date of Birth{" "}
                    <span className="text-xs text-muted-foreground">
                      (Optional)
                    </span>
                  </FormLabel>

                  <Popover
                    open={calendarDropdownOpen}
                    onOpenChange={setCalendarDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-between font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString("en-GB")
                          : "Select date"}

                        <ChevronDown className="h-4 w-4 opacity-70" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarDropdownOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1970-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number{" "}
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter student phone number"
                  type="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
        >
          {mode === "create" ? "Register" : "Update"}
        </LoadingButton>
      </div>
    </Form>
  );
}
