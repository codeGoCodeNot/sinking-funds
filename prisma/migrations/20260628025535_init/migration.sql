/*
  Warnings:

  - The `status` column on the `Fund` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FundStatus" AS ENUM ('in_progress', 'completed', 'inactive');

-- AlterTable
ALTER TABLE "Fund" DROP COLUMN "status",
ADD COLUMN     "status" "FundStatus" NOT NULL DEFAULT 'in_progress';
