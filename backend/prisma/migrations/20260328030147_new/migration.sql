/*
  Warnings:

  - You are about to drop the column `organizationId` on the `RequestInfo` table. All the data in the column will be lost.
  - You are about to drop the column `organizationName` on the `RequestInfo` table. All the data in the column will be lost.
  - You are about to drop the `AppearanceSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdentitySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Made the column `fullName` on table `Receipt` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AppearanceSnapshot" DROP CONSTRAINT "AppearanceSnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "IdentitySnapshot" DROP CONSTRAINT "IdentitySnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_personId_fkey";

-- DropForeignKey
ALTER TABLE "RequestInfo" DROP CONSTRAINT "RequestInfo_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "RequestInfo" DROP CONSTRAINT "RequestInfo_personId_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "fullNameOrg" TEXT,
ADD COLUMN     "fullNameWithRank" TEXT,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "organizationName" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "rank" TEXT;

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "fullNameOrg" TEXT,
ADD COLUMN     "fullNameWithRank" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "prefix" TEXT NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL;

-- AlterTable
ALTER TABLE "RequestInfo" DROP COLUMN "organizationId",
DROP COLUMN "organizationName";

-- DropTable
DROP TABLE "AppearanceSnapshot";

-- DropTable
DROP TABLE "IdentitySnapshot";

-- CreateTable
CREATE TABLE "NationalitySnapshot" (
    "nationalityId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "nationality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NationalitySnapshot_pkey" PRIMARY KEY ("nationalityId")
);

-- CreateTable
CREATE TABLE "EthnicitySnapshot" (
    "ethnicityId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "ethnicity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EthnicitySnapshot_pkey" PRIMARY KEY ("ethnicityId")
);

-- CreateTable
CREATE TABLE "BodyTypeSnapshot" (
    "bodyTypeId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "bodyType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyTypeSnapshot_pkey" PRIMARY KEY ("bodyTypeId")
);

-- CreateTable
CREATE TABLE "SkinColorSnapshot" (
    "skinColorId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "skinColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkinColorSnapshot_pkey" PRIMARY KEY ("skinColorId")
);

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NationalitySnapshot" ADD CONSTRAINT "NationalitySnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EthnicitySnapshot" ADD CONSTRAINT "EthnicitySnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTypeSnapshot" ADD CONSTRAINT "BodyTypeSnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinColorSnapshot" ADD CONSTRAINT "SkinColorSnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestInfo" ADD CONSTRAINT "RequestInfo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;
