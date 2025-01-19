"use server";
import { resultFormSchema, ResultFormValues } from "@/lib/validations";
import { calculateScore, formatRollNumber } from "../utils";
import { prisma } from "../prisma";
import { validateRequest } from "@/auth";
import { TopRankerResult } from "@/types/prisma.types";
import { GetTopRanksResponse } from "@/types/types";

export async function createResult(
  data: ResultFormValues,
): Promise<{ message?: string; error?: string }> {
  try {
    const validatData = resultFormSchema.safeParse(data);
    // console.log(validatData);
    if (!validatData.success) {
      return { error: validatData.error.errors[0].message };
    }
    const { session } = await validateRequest();
    if (session?.user.role !== "admin") {
      return { error: "You are not authorized to perform this action." };
    }
    // calculate the score
    const score = calculateScore(data.total_attemt, data.currect_attemt);
    // formate the roll number
    const rollNumber = formatRollNumber(
      data.roll_number,
      data.class,
      data.center.center_code,
    );
    const existingData = await prisma.result.findFirst({
      where: {
        roll_number: {
          equals: rollNumber,
        },
      },
    });
    if (existingData) {
      return { error: "This data is  already exists please check the data " };
    }

    // db operation
    const result = await prisma.$transaction(async (tx) => {
      // Upsert the Center
      const center = await tx.center.upsert({
        where: { center_code: data.center.center_code },
        update: {},
        create: {
          center_code: data.center.center_code,
          center_name: data.center.center,
        },
      });

      // Upsert the School
      const school = await tx.school.upsert({
        where: { school_code: data.school.school_code },
        update: {},
        create: {
          school_code: data.school.school_code,
          school_name: data.school.school_name,
          center: { connect: { id: center.id } },
        },
      });

      // Create the Result
      const result = await tx.result.create({
        data: {
          name: data.name,
          roll_number: rollNumber,
          class: data.class,
          total_attempt: data.total_attemt,
          correct_attempt: data.currect_attemt,
          total_score: score,
          center: { connect: { id: center.id } },
          school: { connect: { id: school.id } },
          author: { connect: { id: session.user.id } },
        },
      });

      return result;
    });
    console.log("result", result);
    return { message: "Result created successfully." };
  } catch (error) {
    // Your code here
    console.log(JSON.stringify(error));
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function getTopRankers(
  input: "V" | "VI" | "VII" | "VIII" | "IX",
): Promise<GetTopRanksResponse> {
  try {
    console.log("input", input);
    const rankers = await prisma.$queryRaw<TopRankerResult[]>`
      WITH RankedResults AS (
    SELECT 
        r.name,
        r.roll_number,
        r.class,
        r.total_score,
        DENSE_RANK() OVER (ORDER BY r.total_score DESC) as rank,
        s.school_name,
        s.school_code, -- Added school_code
        c.center_name,
        c.center_code  -- Added center_code
    FROM 
        results r
    JOIN 
        schools s ON r."schoolId" = s.id
    JOIN 
        centers c ON r."centerId" = c.id
    WHERE
    r.class=${input}
)
SELECT *
FROM RankedResults
WHERE rank <= 10
ORDER BY total_score DESC,name;`;

    console.log("getTopRankers", rankers);
    return { success: true, data: rankers };
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
