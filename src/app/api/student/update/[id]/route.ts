import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { studentSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: studentId } = await params;
    const body = await req.json();
    const { error, data: student } = studentSchema.safeParse(body);

    const { session } = await validateRequest();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Student update failed",
          error: error.message,
        },
        { status: 400 },
      );
    }

    if (
      session?.user.role !== "admin" &&
      session?.user.role !== "super-admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to perform this action.",
        },
        { status: 401 },
      );
    }

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID is required for updating.",
        },
        { status: 400 },
      );
    }

    // 1. Upsert center
    const center = await prisma.center.upsert({
      where: { center_code: student.center.center_code },
      update: {},
      create: {
        center_code: student.center.center_code,
        center_name: student.center.center,
      },
    });

    // 2. Upsert school
    const school = await prisma.school.upsert({
      where: { school_code: student.school.school_code },
      update: {},
      create: {
        school_code: student.school.school_code,
        school_name: student.school.school_name,
        centerId: center.id,
      },
    });

    // 3. Update student (NO roll number change)
    const updated = await prisma.student.update({
      where: { id: studentId },
      data: {
        fullName: `${student.firstName} ${student.lastName}`,
        class: student.class,
        paper: student.paper,
        phoneNumber: student.phoneNumber,
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
        schoolId: school.id,
        centerId: center.id,
      },
      include: {
        center: true,
        school: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student updated successfully",
        data: updated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
