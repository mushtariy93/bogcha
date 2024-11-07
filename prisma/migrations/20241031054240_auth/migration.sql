/*
  Warnings:

  - The `created_at` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "login" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
