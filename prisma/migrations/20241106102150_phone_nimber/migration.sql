/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_roleId_fkey";

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- DropTable
DROP TABLE "role";

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_number_key" ON "admin"("phone_number");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
