/*
  Warnings:

  - Made the column `closeDate` on table `Deals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deals" ALTER COLUMN "closeDate" SET NOT NULL;
