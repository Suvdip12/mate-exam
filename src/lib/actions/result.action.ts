"use server";
import { prisma } from "../prisma";
import { StudentResult } from "@/types/prisma.types";

export async function getStudentResult(
  rollNumber: string,
): Promise<StudentResult | null> {
  const result = await prisma.result.findFirst({
    where: {
      roll_number: {
        equals: rollNumber,
        mode: "insensitive",
      },
    },
    include: {
      school: true,
      center: true,
    },
  });

  if (!result) {
    return null;
  }

  // Fetch all classmates' scores in a single query
  const classmatesScores = await prisma.result.findMany({
    where: {
      class: result.class,
    },
    select: {
      total_score: true,
    },
    orderBy: {
      total_score: "desc",
    },
  });

  // Calculate rank efficiently
  const classRank =
    classmatesScores.findIndex(
      (score) => score.total_score <= result.total_score,
    ) + 1;

  return {
    ...result,
    rank: classRank,
    school: {
      id: result.school.id,
      name: result.school.school_name,
      code: result.school.school_code,
    },
    center: {
      id: result.center.id,
      name: result.center.center_name,
      code: result.center.center_code,
    },
  };
}
