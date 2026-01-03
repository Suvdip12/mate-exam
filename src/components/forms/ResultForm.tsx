"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import LocationSelector from "../ui/location-selector";
import { resultFormSchema } from "@/lib/validations";
import { useEffect, useState, useTransition } from "react";
import { createResult } from "@/lib/actions/result.action";
import LoadingButton from "../LoadingButton";
import { calculateScore } from "@/lib/utils";

export default function ResultForm() {
  const [score, setScore] = useState<number>();
  const [totalAttemt, setTotalAttemt] = useState<number>(0);
  const [currectAttemt, setCurrectAttemt] = useState<number>(0);
  const [isFormResat, setIsFormResat] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition(); // 1. Define your form.

  const form = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      center: {
        center: "",
        center_code: "",
        center_address: "",
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
  // calculate the score
  useEffect(() => {
    const score = calculateScore(totalAttemt, currectAttemt);
    setScore(score);
  }, [totalAttemt, currectAttemt]);

  const handleReset = () => {
    form.reset();
    setIsFormResat((prv) => !prv);
  };

  function onSubmit(values: z.infer<typeof resultFormSchema>) {
    startTransition(async () => {
      const { error, message } = await createResult(values);
      if (message) {
        toast.success(message);
        handleReset();
      }
      if (error) {
        toast.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4 pb-5"
      >
        <FormField
          control={form.control}
          name="center"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Center</FormLabel>
              <FormControl>
                <LocationSelector
                  isFormResat={isFormResat}
                  onCenterChange={(center) => {
                    form.setValue(field.name, {
                      center: center?.name || "",
                      center_code: center?.code || "",
                      center_address: center?.address || "",
                    });
                  }}
                  onSchoolChange={(school) => {
                    // setSchoolName(school?.name || "");
                    form.setValue("school", {
                      school_name: school?.name || "",
                      school_code: school?.school_code || "",
                    });
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                If your center has school, it will be appear after selecting
                center
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
                <Input placeholder="Student name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roll_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roll</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student roll number..."
                  type="number"
                  {...field}
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
              <FormDescription className="font-bold">
                This is the roll number of student:{" "}
                {form.watch("class") &&
                  `${form.getValues("center.center_code")}/25/${form.getValues("class")}/${form.getValues("roll_number")}`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="total_attemt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Attemt</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total attemt questions.."
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
                  <FormLabel>Currect Attemt</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Currect Aatemt questions .."
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
          This is the total mark:{score}
        </p>
        <LoadingButton loading={isPending} className="w-full" type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
