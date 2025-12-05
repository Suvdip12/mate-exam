"use client";

import RegistrationForm from "@/components/forms/StudentForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student } from "@prisma/client";
import { useState } from "react";

export default function FromFillUpPage() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Student | null>(null);

  function handleSuccess(result: Student) {
    console.log("result", result);
    setData(result);
    setShowModal(true);
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Header */}
            <div
              className="rounded-t-lg p-6 text-white md:p-8"
              style={{
                background: "#000000",
                backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
      `,
                backgroundSize: "20px 20px, 20px 20px, 20px 20px",
                backgroundPosition: "0 0, 0 0, 0 0",
              }}
            >
              <h1 className="text-2xl font-bold md:text-3xl">
                Student Registration
              </h1>
              <p className="mt-2 text-blue-100">
                Fill in your details to register for the program
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <RegistrationForm mode="create" onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      </main>
      {showModal && data && (
        <StudentRegistrationDialog
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          student={data}
        />
      )}
    </>
  );
}
interface StudentRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}
function StudentRegistrationDialog({
  isOpen,
  onClose,
  student,
}: StudentRegistrationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Created Successfully</DialogTitle>
        </DialogHeader>
        {student && (
          <div className="space-y-2">
            <p>
              <strong className="text-ellipsis text-destructive">Name: </strong>{" "}
              {student.fullName}
            </p>
            <p>
              <strong className="text-ellipsis text-destructive">Roll: </strong>{" "}
              {student.rollNumber}
            </p>
            <p>
              <strong className="text-ellipsis text-destructive">
                paper:{" "}
              </strong>{" "}
              {student.paper}
            </p>
            <p>
              <strong className="text-ellipsis text-destructive">
                Class:{" "}
              </strong>{" "}
              {student.class}
            </p>
            {student.dateOfBirth && (
              <p>
                <strong className="text-ellipsis text-destructive">
                  Email:
                </strong>{" "}
                {new Date(student.dateOfBirth).toLocaleDateString("en-GB")}
              </p>
            )}
            {student.phoneNumber && (
              <p>
                <strong className="text-ellipsis text-destructive">
                  Email:
                </strong>{" "}
                {student.phoneNumber}
              </p>
            )}
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
