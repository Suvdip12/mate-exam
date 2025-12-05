import { prisma } from "@/lib/prisma";

export async function generateUniqueRollNumber(
  centerCode: string,
  className: string,
) {
  const year = "26";

  return await prisma.$transaction(async (tx) => {
    // 1. Find or create counter
    let counter = await tx.rollCounter.findFirst({
      where: { center_code: centerCode, class: className, year },
    });

    if (!counter) {
      counter = await tx.rollCounter.create({
        data: { center_code: centerCode, class: className, year, counter: 0 },
      });
    }

    // 2. Increment
    const updated = await tx.rollCounter.update({
      where: { id: counter.id },
      data: { counter: { increment: 1 } },
    });

    const padded = String(updated.counter).padStart(3, "0");

    // 3. Build roll number
    return `${centerCode}/${className}/${year}/${padded}`;
  });
}
