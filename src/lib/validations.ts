import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  name: requiredString.regex(
    /^[a-zA-Z0-9-_ ]+$/,
    "Only letters, numbers, hyphens, underscores, and spaces allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const centerSchema = z.object({
  center: z
    .string()
    .nonempty("Center name is required.")
    .toUpperCase()
    .min(3, "Center name must be at least 3 characters long.")
    .max(50, "Center name cannot exceed 50 characters."),
  center_code: z
    .string()
    .nonempty("Center code is required.")
    .toUpperCase()
    .regex(
      /^[A-Za-z0-9-]+$/,
      "Center code must contain only letters and numbers.",
    ),
});
export const schoolSchema = z.object({
  school_name: z
    .string()
    .nonempty("School name is required.")
    .toUpperCase()
    .min(3, "School name must be at least 3 characters long.")
    .max(50, "School name cannot exceed 50 characters."),

  school_code: z
    .string()
    .toUpperCase()
    .nonempty("School code is required.")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "School code must contain only letters and numbers.",
    ),
});

export const resultFormSchema = z
  .object({
    center: centerSchema,
    school: schoolSchema,
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot exceed 50 characters."),
    roll_number: z.string().min(1, "Roll number must be a positive number."),
    class: z.string().nonempty("Class is required and cannot be empty."),
    total_attemt: z.coerce
      .number()
      .positive("Total attempts must be a positive number")
      .max(25, "Total attempts cannot exceed 25."),
    currect_attemt: z.coerce
      .number()
      .positive("Correct attempts must be a positive number.")
      .max(25, "Correct attempts cannot exceed 25."),
  })
  .refine(
    (data) => data.total_attemt >= data.currect_attemt, // Custom validation logic
    {
      message:
        "Total attempts must be equal to or greater than correct attempts.",
      path: ["total_attemt"], // Points to the field causing the issue
    },
  );
export type ResultFormValues = z.infer<typeof resultFormSchema>;
