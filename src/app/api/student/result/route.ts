// app/api/result/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rollNumber } = body;

    if (!rollNumber || typeof rollNumber !== "string") {
      return NextResponse.json(
        { error: "Roll number is required" },
        { status: 400 }
      );
    }

    // Find student with all related data
    const student = await prisma.student.findUnique({
      where: {
        rollNumber: rollNumber.trim(),
      },
      include: {
        result: true,
        center: true,
        school: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "No result found for this roll number" },
        { status: 404 }
      );
    }

    if (!student.result) {
      return NextResponse.json(
        { error: "Result not yet published for this student" },
        { status: 404 }
      );
    }

    // Calculate rank based on class
    // Step 1: Get all students in the same class with results
    const studentsInClass = await prisma.student.findMany({
      where: {
        class: student.class,
        result: {
          isNot: null,
        },
      },
      include: {
        result: true,
      },
    });
    // Step 2: Sort students by total_score (desc), then by correct_attempt (desc)
    const sortedStudents = studentsInClass.sort((a, b) => {
      // First compare by total score (higher is better)
      if (b.result!.total_score !== a.result!.total_score) {
        return b.result!.total_score - a.result!.total_score;
      }
      // If scores are equal, compare by correct attempts (higher is better)
      return b.result!.correct_attempt - a.result!.correct_attempt;
    });

    // Step 3: Find the rank of current student
    let rank = 1;
    let previousScore = sortedStudents[0]?.result?.total_score;
    let previousCorrect = sortedStudents[0]?.result?.correct_attempt;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    let sameRankCount = 0;

    for (let i = 0; i < sortedStudents.length; i++) {
      const currentStudent = sortedStudents[i];
      
      // If score and correct attempts are different from previous, update rank
      if (
        i > 0 &&
        (currentStudent.result!.total_score !== previousScore ||
          currentStudent.result!.correct_attempt !== previousCorrect)
      ) {
        rank = i + 1;
      }

      if (currentStudent.id === student.id) {
        break;
      }

      previousScore = currentStudent.result!.total_score;
      previousCorrect = currentStudent.result!.correct_attempt;
    }

    // Format the response
    const resultData = {
      id: student.id,
      fullName: student.fullName,
      rollNumber: student.rollNumber,
      class: student.class,
      paper: student.paper,
      dateOfBirth: student.dateOfBirth,
      phoneNumber: student.phoneNumber,
      center: {
        id: student.center.id,
        center_name: student.center.center_name,
        center_code: student.center.center_code,
        address: student.center.address,
      },
      school: {
        id: student.school.id,
        school_name: student.school.school_name,
        school_code: student.school.school_code,
        address: student.school.address,
      },
      result: {
        id: student.result.id,
        total_attempt: student.result.total_attempt,
        correct_attempt: student.result.correct_attempt,
        total_score: student.result.total_score,
        rank: rank,
        totalStudents: sortedStudents.length,
        createdAt: student.result.createdAt,
        updatedAt: student.result.updatedAt,
      },
    };

    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
