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

export const studentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  center: centerSchema,
  school: schoolSchema,
  class: z.string().min(1, "Class is required"),
  paper: z.string().min(1, "paper is required"),
  dateOfBirth: z.coerce
    .date({
      required_error: "Date of birth is required",
    })
    .optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9\s\-+]*$/.test(val),
      "Invalid phone number format",
    ),
});
export type StudentFormValues = z.infer<typeof studentSchema>;

export const studentSearchSchema = z.object({
  query: z.string().min(3, "Enter roll number or name"),
});

export type StudentSearchValues = z.infer<typeof studentSearchSchema>;

export const rollNumberSchema = z.object({
  rollNumber: z.string().min(5, "Roll nimber must me at last 5 characters"),
});

export type RollNumber = z.infer<typeof rollNumberSchema>;
