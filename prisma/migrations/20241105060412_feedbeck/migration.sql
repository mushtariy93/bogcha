/*
  Warnings:

  - You are about to drop the column `UserId` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `feedback_type` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `staffId` on the `feedback` table. All the data in the column will be lost.
  - Added the required column `userId` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'Parent', 'Staff');

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_UserId_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_groupId_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_staffId_fkey";

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "UserId",
DROP COLUMN "feedback_type",
DROP COLUMN "groupId",
DROP COLUMN "rating",
DROP COLUMN "staffId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "userType" "UserType" NOT NULL;
