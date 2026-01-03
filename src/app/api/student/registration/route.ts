import { validateRequest } from "@/auth";
import { generateUniqueRollNumber } from "@/helpers/roll-generater";
import { prisma } from "@/lib/prisma";
import { studentSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, data: student } = studentSchema.safeParse(body);
    const { session } = await validateRequest();
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Student registration failed",
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
    // 1. Upsert center
    const center = await prisma.center.upsert({
      where: { center_code: student.center.center_code },
      update: {},
      create: {
        center_code: student.center.center_code,
        center_name: student.center.center,
        address: student.center.center_address,
      },
    });

    // 2. Upsert school
    const school = await prisma.school.upsert({
      where: { school_code: student.school.school_code },
      update: {},
      create: {
        school_code: student.school.school_code,
        school_name: student.school.school_name,
        centerId: center.id, // school belongs to a center
      },
    });
    const rollNumber = await generateUniqueRollNumber(
      student.center.center_code,
      student.class,
    );
    // 3. Create student
    const result = await prisma.student.create({
      data: {
        fullName: `${student.firstName} ${student.lastName}`,
        class: student.class,
        paper: student.paper,
        phoneNumber: student.phoneNumber,
        rollNumber,
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
        schoolId: school.id,
        centerId: center.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student registration successfully",
        data: result,
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
