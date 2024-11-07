/*
  Warnings:

  - You are about to drop the column `cheak_in_time` on the `attendanceGroup` table. All the data in the column will be lost.
  - You are about to drop the column `cheak_up_time` on the `attendanceGroup` table. All the data in the column will be lost.
  - Added the required column `check_in_time` to the `attendanceGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_up_time` to the `attendanceGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attendanceGroup" DROP COLUMN "cheak_in_time",
DROP COLUMN "cheak_up_time",
ADD COLUMN     "check_in_time" TEXT NOT NULL,
ADD COLUMN     "check_up_time" TEXT NOT NULL;
