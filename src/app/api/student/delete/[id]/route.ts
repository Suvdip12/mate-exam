import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: studentId } = await params;

    const { session } = await validateRequest();

    // Check if user is authorized
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

    // Check if student ID is provided
    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID is required for deletion.",
        },
        { status: 400 },
      );
    }

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId },
      select: { id: true, fullName: true, rollNumber: true },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found.",
        },
        { status: 404 },
      );
    }

    // Delete the student
    await prisma.student.delete({
      where: { id: studentId },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Student ${existingStudent.fullName} (Roll: ${existingStudent.rollNumber}) deleted successfully.`,
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
