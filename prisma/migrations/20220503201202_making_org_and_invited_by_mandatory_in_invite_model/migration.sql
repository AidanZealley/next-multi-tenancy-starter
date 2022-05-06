/*
  Warnings:

  - Made the column `organisationId` on table `Invite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "organisationId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
