/*
  Warnings:

  - You are about to drop the column `organisationId` on the `Membership` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_organisationId_fkey";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "organisationId";
