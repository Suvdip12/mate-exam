"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { StudentWithSchoolCenter } from "@/types/prisma.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserCardProps {
  student: StudentWithSchoolCenter;
  handleUpdate: (student: StudentWithSchoolCenter) => void;
  onDelete?: (student: StudentWithSchoolCenter) => void;
}

export function StudentCard({
  student,
  handleUpdate,
  onDelete,
}: UserCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-foreground">
          {student.fullName}
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Roll: {student.rollNumber}
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pb-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Class:
            </span>
            <span className="text-sm font-semibold text-foreground">
              {student.class}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Paper:
            </span>
            <span className="text-sm font-semibold text-foreground">
              {student.paper}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Center:
            </span>
            <span className="text-sm font-semibold text-foreground">
              {student.center.center_name}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              School:
            </span>
            <span className="ml-2 truncate text-sm font-semibold text-foreground">
              {student.school.school_name}
            </span>
          </div>
        </div>
      </CardContent>
      <div className="px-6 pb-4 pt-0">
        <div className="flex gap-2">
          <Button
            onClick={() => handleUpdate(student)}
            variant="outline"
            className="flex-1 gap-2 bg-transparent"
          >
            <Edit2 className="h-4 w-4" />
            Update
          </Button>

          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete{" "}
                    <span className="font-semibold">{student.fullName}</span>{" "}
                    (Roll: {student.rollNumber}) from the system. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(student)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Student
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </Card>
  );
}
