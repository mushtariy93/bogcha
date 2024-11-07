/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "admin_phone_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "admin_login_key" ON "admin"("login");
