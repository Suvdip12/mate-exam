import ResultForm from "@/components/forms/ResultForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen w-full p-2 sm:p-4 md:p-6 lg:flex lg:items-center lg:justify-center">
      <div className="w-full max-w-2xl lg:max-w-3xl">
        <Card className="w-full">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Add Result</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Please enter the student details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResultForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
