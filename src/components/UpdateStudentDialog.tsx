"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import UpdateStudentForm from "./forms/StudentForm";
import { StudentWithSchoolCenter } from "@/types/prisma.types";

interface UpdateStudentDialogProps {
  isOpen: boolean;
  student: StudentWithSchoolCenter;
  onClose: () => void;
  onUpdateSuccess: (data: StudentWithSchoolCenter) => void;
}

export default function UpdateStudentDialog({
  isOpen,
  student,
  onClose,
  onUpdateSuccess,
}: UpdateStudentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Student Data</DialogTitle>
          <DialogDescription>
            Make changes to your student data here.
          </DialogDescription>
        </DialogHeader>
        <UpdateStudentForm
          student={student}
          mode="update"
          onUpdateSuccess={onUpdateSuccess}
        />
        <DialogFooter>
          <button className="text-destructive" onClick={() => onClose()}>
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
