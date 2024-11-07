-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT;
