/*
  Warnings:

  - You are about to drop the column `commanderFirstName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderFullName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderFullNameWithRank` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderFullPosition` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderFullRank` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderLastName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderPosition` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `commanderRank` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financeFirstName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financeFullName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financeFullNameWithRank` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financeLastName` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financePosition` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `financeRank` on the `Organization` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_personId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "commanderFirstName",
DROP COLUMN "commanderFullName",
DROP COLUMN "commanderFullNameWithRank",
DROP COLUMN "commanderFullPosition",
DROP COLUMN "commanderFullRank",
DROP COLUMN "commanderLastName",
DROP COLUMN "commanderPosition",
DROP COLUMN "commanderRank",
DROP COLUMN "financeFirstName",
DROP COLUMN "financeFullName",
DROP COLUMN "financeFullNameWithRank",
DROP COLUMN "financeLastName",
DROP COLUMN "financePosition",
DROP COLUMN "financeRank";

-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "personId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OrganizationCommander" (
    "commanderId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "rank" TEXT,
    "fullRank" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "fullNameWithRank" TEXT,
    "position" TEXT,
    "fullPosition" TEXT,
    "signatureImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrganizationCommander_pkey" PRIMARY KEY ("commanderId")
);

-- CreateTable
CREATE TABLE "OrganizationFinance" (
    "financeId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "rank" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "fullNameWithRank" TEXT,
    "position" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrganizationFinance_pkey" PRIMARY KEY ("financeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationCommander_organizationId_key" ON "OrganizationCommander"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationFinance_organizationId_key" ON "OrganizationFinance"("organizationId");

-- AddForeignKey
ALTER TABLE "OrganizationCommander" ADD CONSTRAINT "OrganizationCommander_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationFinance" ADD CONSTRAINT "OrganizationFinance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE SET NULL ON UPDATE CASCADE;
