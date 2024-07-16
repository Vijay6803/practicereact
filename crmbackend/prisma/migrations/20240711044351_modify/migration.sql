/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Deals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LineItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_userId_fkey";

-- DropForeignKey
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_dealId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Company_id_seq";

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contact_id_seq";

-- AlterTable
ALTER TABLE "Deals" DROP CONSTRAINT "Deals_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Deals_id_seq";

-- AlterTable
ALTER TABLE "LineItems" DROP CONSTRAINT "LineItems_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dealId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LineItems_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LineItems_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "CompanyContact" (
    "companyId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CompanyDeal" (
    "companyId" TEXT NOT NULL,
    "dealId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ContactDeal" (
    "contactId" TEXT NOT NULL,
    "dealId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyContact_companyId_contactId_key" ON "CompanyContact"("companyId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDeal_companyId_dealId_key" ON "CompanyDeal"("companyId", "dealId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactDeal_contactId_dealId_key" ON "ContactDeal"("contactId", "dealId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItems" ADD CONSTRAINT "LineItems_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyContact" ADD CONSTRAINT "CompanyContact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyContact" ADD CONSTRAINT "CompanyContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDeal" ADD CONSTRAINT "CompanyDeal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDeal" ADD CONSTRAINT "CompanyDeal_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDeal" ADD CONSTRAINT "ContactDeal_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactDeal" ADD CONSTRAINT "ContactDeal_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
