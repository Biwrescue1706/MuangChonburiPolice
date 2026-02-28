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
CREATE TABLE "Person" (
    "personId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prefix" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "birthDay" INTEGER,
    "birthMonth" INTEGER,
    "birthYear" INTEGER,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "weight" INTEGER,
    "height" INTEGER,
    "distinguishingMarks" TEXT,
    "address" TEXT,
    "occupation" TEXT,
    "workplaceAddress" TEXT,
    "father" TEXT,
    "mother" TEXT,
    "spouse" TEXT DEFAULT '-',
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personId")
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
CREATE TABLE "VerificationRequest" (
    "requestId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "organizationId" TEXT,
    "purpose" TEXT,
    "requestingAgency" TEXT,
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" TIMESTAMP(3),
    "submittedDate" TIMESTAMP(3),
    "status" INTEGER NOT NULL DEFAULT 0,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("requestId")
);

-- CreateTable
CREATE TABLE "VerificationFile" (
    "fileId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "VerificationFile_pkey" PRIMARY KEY ("fileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Person_citizenId_key" ON "Person"("citizenId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_key_key" ON "Organization"("key");

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationFile" ADD CONSTRAINT "VerificationFile_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "VerificationRequest"("requestId") ON DELETE CASCADE ON UPDATE CASCADE;
