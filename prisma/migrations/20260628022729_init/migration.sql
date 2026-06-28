/*
  Warnings:

  - You are about to drop the column `goal` on the `Fund` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fund" DROP COLUMN "goal",
ADD COLUMN     "months" INTEGER NOT NULL DEFAULT 12;
