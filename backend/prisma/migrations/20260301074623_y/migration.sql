-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organizationId" TEXT NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'MAIN',
    "organizationName" TEXT NOT NULL,
    "rank" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fullNameWithRank" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "Person" (
    "personId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "prefix" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "birthDay" TEXT,
    "birthMonth" TEXT,
    "birthYear" TEXT,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "weight" INTEGER,
    "height" INTEGER,
    "bodyType" TEXT DEFAULT 'สันทัด',
    "skinColor" TEXT DEFAULT 'ดำแดง',
    "behavior" TEXT DEFAULT 'ปกติ',
    "distinguishingMarks" TEXT,
    "address" TEXT,
    "occupation" TEXT,
    "workplaceAddress" TEXT,
    "father" TEXT,
    "mother" TEXT,
    "spouse" TEXT DEFAULT '-',
    "fingerprintDate" TEXT,
    "purpose" TEXT,
    "requestingAgency" TEXT,
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" TEXT,
    "money" INTEGER NOT NULL DEFAULT 100,
    "moneyText" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "statusUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personId")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_key_key" ON "Organization"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Person_citizenId_key" ON "Person"("citizenId");

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
