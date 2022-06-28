/*
  Warnings:

  - Made the column `userId` on table `Membership` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organisationId` on table `Membership` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_organisationId_fkey";

-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "organisationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
