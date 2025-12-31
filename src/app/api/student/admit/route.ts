import { prisma } from "@/lib/prisma";
import { rollNumberSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, data } = rollNumberSchema.safeParse(body);

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
    const students = await prisma.student.findMany({
      where: {
        rollNumber: data.rollNumber,
      },
      include: {
        school: true,
        center: true,
      },
      take: 10,
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
