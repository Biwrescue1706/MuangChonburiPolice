/*
  Warnings:

  - You are about to drop the `VerificationFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VerificationFile" DROP CONSTRAINT "VerificationFile_requestId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationRequest" DROP CONSTRAINT "VerificationRequest_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationRequest" DROP CONSTRAINT "VerificationRequest_personId_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "behavior" TEXT DEFAULT 'ปกติ',
ADD COLUMN     "bodyType" TEXT DEFAULT 'สันทัด',
ADD COLUMN     "fingerprintDate" TIMESTAMP(3),
ADD COLUMN     "money" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "moneyText" TEXT,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "receiptBookNo" TEXT,
ADD COLUMN     "receiptDate" TIMESTAMP(3),
ADD COLUMN     "receiptNo" TEXT,
ADD COLUMN     "requestingAgency" TEXT,
ADD COLUMN     "skinColor" TEXT DEFAULT 'ดำแดง',
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "VerificationFile";

-- DropTable
DROP TABLE "VerificationRequest";

-- CreateTable
CREATE TABLE "PersonFile" (
    "fileId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonFile_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "IdentitySnapshot" (
    "identityId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentitySnapshot_pkey" PRIMARY KEY ("identityId")
);

-- CreateTable
CREATE TABLE "AppearanceSnapshot" (
    "appearanceId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "bodyType" TEXT,
    "skinColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppearanceSnapshot_pkey" PRIMARY KEY ("appearanceId")
);

-- CreateTable
CREATE TABLE "RequestInfo" (
    "requestInfoId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "purpose" TEXT,
    "requestingAgency" TEXT,
    "organizationId" TEXT,
    "organizationName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestInfo_pkey" PRIMARY KEY ("requestInfoId")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "receiptId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "organizationId" TEXT,
    "organizationName" TEXT,
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" TIMESTAMP(3),
    "money" INTEGER NOT NULL,
    "moneyText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("receiptId")
);

-- AddForeignKey
ALTER TABLE "PersonFile" ADD CONSTRAINT "PersonFile_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentitySnapshot" ADD CONSTRAINT "IdentitySnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppearanceSnapshot" ADD CONSTRAINT "AppearanceSnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestInfo" ADD CONSTRAINT "RequestInfo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestInfo" ADD CONSTRAINT "RequestInfo_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;
