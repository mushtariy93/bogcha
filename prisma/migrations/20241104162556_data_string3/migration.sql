/*
  Warnings:

  - You are about to drop the column `gruop_name` on the `group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[group_name]` on the table `group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group_name` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "group_gruop_name_key";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "gruop_name",
ADD COLUMN     "group_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "group_group_name_key" ON "group"("group_name");
