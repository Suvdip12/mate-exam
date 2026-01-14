import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateScore } from "@/lib/utils";
import { resultFormSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, data: student } = resultFormSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Student result add failed",
          error: error.message,
        },
        { status: 400 },
      );
    }
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

    const existingStudent = await prisma.student.findFirst({
      where: {
        rollNumber: student?.roll_number,
      },
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
    const score = calculateScore(student.total_attemt, student.currect_attemt);

    await prisma.result.create({
      data: {
        correct_attempt: student?.currect_attemt,
        total_attempt: student?.currect_attemt,
        total_score: score,
        authorId: session.user.id,
        schoolId: existingStudent.schoolId,
        centerId: existingStudent.centerId,
        studentId: existingStudent.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Student ${existingStudent.fullName} (Roll: ${existingStudent.rollNumber}) result added.`,
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
