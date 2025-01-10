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
    <main className="flex h-screen items-center justify-center p-5">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add Result</CardTitle>
            <CardDescription>
              Please enter the student details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
