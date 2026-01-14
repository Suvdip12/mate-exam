/*
  Warnings:

  - You are about to drop the column `class` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `roll_number` on the `results` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `results` will be added. If there are existing duplicate values, this will fail.
  - Made the column `studentId` on table `results` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_centerId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_studentId_fkey";

-- AlterTable
ALTER TABLE "results" DROP COLUMN "class",
DROP COLUMN "name",
DROP COLUMN "roll_number",
ALTER COLUMN "centerId" DROP NOT NULL,
ALTER COLUMN "schoolId" DROP NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "results_studentId_key" ON "results"("studentId");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
