-- AlterTable
ALTER TABLE "Organisation" ALTER COLUMN "isActive" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;
