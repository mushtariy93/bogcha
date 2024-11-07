/*
  Warnings:

  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_staffId_fkey";

-- DropTable
DROP TABLE "Feedback";

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "feedback_type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
