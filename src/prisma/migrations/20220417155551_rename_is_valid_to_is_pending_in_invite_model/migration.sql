/*
  Warnings:

  - You are about to drop the column `isValid` on the `Invite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invite" DROP COLUMN "isValid",
ADD COLUMN     "isPending" BOOLEAN NOT NULL DEFAULT true;
