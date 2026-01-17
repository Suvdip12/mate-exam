import { prisma } from "@/lib/prisma";
import { admitSearchSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ roll: string[] }> },
) {
  try {
    const { roll } = await params;
    // Join the array segments back into a roll number string (e.g., ["KU", "26", "VII", "001"] -> "KU/26/VII/001")
    const rollNumber = roll.join("/");

    const { error, data } = admitSearchSchema.safeParse({
      rollNumber,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Roll number not valid",
          error: error.message,
        },
        { status: 400 },
      );
    }
    const students = await prisma.student.findUnique({
      where: {
        rollNumber: data.rollNumber,
      },
      include: {
        school: true,
        center: true,
        result:true
      },
    });
    if (!students) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Students fetched successfully",
        data: students,
      },
      { status: 201 },
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
