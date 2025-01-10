import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Format the roll number
export function formatRollNumber(
  rollNumber: number,
  class_name: string,
  center_code: string,
): string {
  const currentYear = new Date().getFullYear(); // Get the current year
  const yearLastTwoDigits = currentYear % 100; // Extract the last two digits of the year
  // Format the roll number
  const formattedRollNumber = `${center_code}/${yearLastTwoDigits}/${class_name}/${rollNumber}`;
  return formattedRollNumber;
}
export function calculateScore(
  totalAttempts: number,
  correctAttempts: number,
): number {
  const correctMark = 4; // Marks for each correct answer
  const wrongMark = -1; // Marks deducted for each wrong answer

  // Validate inputs
  if (correctAttempts > totalAttempts) return 0;
  const wrongAttempts = totalAttempts - correctAttempts; // Calculate wrong attempts
  const score = correctAttempts * correctMark + wrongAttempts * wrongMark; // Calculate total score

  return score;
}
