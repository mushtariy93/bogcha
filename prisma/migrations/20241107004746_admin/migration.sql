-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "hashed_refresh_token" TEXT;

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "expiration_time" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
