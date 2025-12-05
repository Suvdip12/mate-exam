import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";

  const searchQuery = q.trim();
  try {
    const { session } = await validateRequest();
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
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { fullName: { contains: searchQuery, mode: "insensitive" } },
          { rollNumber: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
      include: {
        center: true,
        school: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    });
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
