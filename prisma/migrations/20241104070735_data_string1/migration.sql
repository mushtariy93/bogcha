/*
  Warnings:

  - You are about to drop the column `parentId` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the `childParent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roleParent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserId` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "childParent" DROP CONSTRAINT "childParent_childId_fkey";

-- DropForeignKey
ALTER TABLE "childParent" DROP CONSTRAINT "childParent_parentId_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_parentId_fkey";

-- DropForeignKey
ALTER TABLE "parent" DROP CONSTRAINT "parent_roleId_fkey";

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "parentId",
ADD COLUMN     "UserId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "childParent";

-- DropTable
DROP TABLE "parent";

-- DropTable
DROP TABLE "roleParent";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passportInfo" TEXT NOT NULL,
    "workplace" TEXT,
    "roleId" INTEGER NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "childUser" (
    "id" SERIAL NOT NULL,
    "childId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "childUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roleUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roleUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "childUser_childId_userId_key" ON "childUser"("childId", "userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roleUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "childUser" ADD CONSTRAINT "childUser_childId_fkey" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "childUser" ADD CONSTRAINT "childUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
