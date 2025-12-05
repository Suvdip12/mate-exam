"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { StudentWithSchoolCenter } from "@/types/prisma.types";

interface UserCardProps {
  student: StudentWithSchoolCenter;
  handleUpdate: (student: StudentWithSchoolCenter) => void;
}

export function StudentCard({ student, handleUpdate }: UserCardProps) {
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
        <Button
          onClick={() => handleUpdate(student)}
          variant="outline"
          className="w-full gap-2 bg-transparent"
        >
          <Edit2 className="h-4 w-4" />
          Update
        </Button>
      </div>
    </Card>
  );
}
