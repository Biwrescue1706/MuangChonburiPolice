-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

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
    "birthDate" TEXT,
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
    "distinguishingMarks" TEXT DEFAULT '-',
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
    "deleteAt" TIMESTAMP(3),
    "organizationId" TEXT,
    "organizationName" TEXT,
    "fullNameOrg" TEXT,
    "rank" TEXT,
    "position" TEXT,
    "fullNameWithRank" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "returnDate" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("personId")
);

-- CreateTable
CREATE TABLE "PersonStatusHistory" (
    "historyId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "oldStatus" INTEGER NOT NULL,
    "newStatus" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonStatusHistory_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "RequestInfo" (
    "requestInfoId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "purpose" TEXT,
    "requestingAgency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestInfo_pkey" PRIMARY KEY ("requestInfoId")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "receiptId" TEXT NOT NULL,
    "personId" TEXT,
    "prefix" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "organizationId" TEXT,
    "organizationName" TEXT,
    "fullNameOrg" TEXT,
    "rank" TEXT,
    "position" TEXT,
    "fullNameWithRank" TEXT,
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" TEXT,
    "money" INTEGER NOT NULL,
    "moneyText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("receiptId")
);

-- CreateTable
CREATE TABLE "ForensicSubmission" (
    "submissionId" TEXT NOT NULL,
    "submissionNo" TEXT,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    "statusUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "ForensicSubmission_pkey" PRIMARY KEY ("submissionId")
);

-- CreateTable
CREATE TABLE "ForensicSubmissionPerson" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "ForensicSubmissionPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForensicSubmissionStatusHistory" (
    "historyId" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "oldStatus" INTEGER NOT NULL,
    "newStatus" INTEGER NOT NULL,
    "remark" TEXT,
    "changedBy" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForensicSubmissionStatusHistory_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "organizationpersonnel" (
    "personnelId" TEXT NOT NULL,
    "rank" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fullNameWithRank" TEXT NOT NULL,
    "position" TEXT,
    "duty" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "organizationpersonnel_pkey" PRIMARY KEY ("personnelId")
);

-- CreateTable
CREATE TABLE "Foreigner" (
    "id" TEXT NOT NULL,
    "sequenceNo" INTEGER,
    "year" INTEGER,
    "foreignerIdNo" TEXT,
    "prefix" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "certificateRegistrationNo" TEXT,
    "certificateDate" TEXT,
    "district" TEXT,
    "province" TEXT,
    "policeStation" TEXT,
    "policeProvince" TEXT,
    "houseNo" TEXT,
    "moo" TEXT,
    "road" TEXT,
    "subdistrict" TEXT,
    "domicileDistrict" TEXT,
    "domicileProvince" TEXT,
    "domicile" TEXT,
    "applicationType" TEXT,
    "applicationDate" TEXT,
    "expirationDate" TEXT,
    "previousExpirationDate" TEXT,
    "amount" INTEGER,
    "amountText" TEXT,
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" TEXT,
    "certificateNo" TEXT,
    "petitionDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Foreigner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationCommander_organizationId_key" ON "OrganizationCommander"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationFinance_organizationId_key" ON "OrganizationFinance"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_key_key" ON "Organization"("key");

-- CreateIndex
CREATE INDEX "PersonStatusHistory_personId_idx" ON "PersonStatusHistory"("personId");

-- CreateIndex
CREATE INDEX "PersonStatusHistory_oldStatus_newStatus_idx" ON "PersonStatusHistory"("oldStatus", "newStatus");

-- CreateIndex
CREATE INDEX "PersonStatusHistory_changedAt_idx" ON "PersonStatusHistory"("changedAt");

-- CreateIndex
CREATE INDEX "ForensicSubmissionPerson_submissionId_idx" ON "ForensicSubmissionPerson"("submissionId");

-- CreateIndex
CREATE INDEX "ForensicSubmissionPerson_personId_idx" ON "ForensicSubmissionPerson"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "ForensicSubmissionPerson_submissionId_personId_key" ON "ForensicSubmissionPerson"("submissionId", "personId");

-- CreateIndex
CREATE INDEX "ForensicSubmissionStatusHistory_submissionId_idx" ON "ForensicSubmissionStatusHistory"("submissionId");

-- CreateIndex
CREATE INDEX "ForensicSubmissionStatusHistory_changedAt_idx" ON "ForensicSubmissionStatusHistory"("changedAt");

-- CreateIndex
CREATE INDEX "Foreigner_foreignerIdNo_idx" ON "Foreigner"("foreignerIdNo");

-- CreateIndex
CREATE INDEX "Foreigner_fullName_idx" ON "Foreigner"("fullName");

-- CreateIndex
CREATE INDEX "Foreigner_certificateRegistrationNo_idx" ON "Foreigner"("certificateRegistrationNo");

-- CreateIndex
CREATE INDEX "Foreigner_certificateNo_idx" ON "Foreigner"("certificateNo");

-- CreateIndex
CREATE INDEX "Foreigner_receiptNo_idx" ON "Foreigner"("receiptNo");

-- CreateIndex
CREATE INDEX "Foreigner_applicationDate_idx" ON "Foreigner"("applicationDate");

-- CreateIndex
CREATE INDEX "Foreigner_expirationDate_idx" ON "Foreigner"("expirationDate");

-- CreateIndex
CREATE INDEX "Foreigner_petitionDate_idx" ON "Foreigner"("petitionDate");

-- AddForeignKey
ALTER TABLE "OrganizationCommander" ADD CONSTRAINT "OrganizationCommander_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationFinance" ADD CONSTRAINT "OrganizationFinance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonStatusHistory" ADD CONSTRAINT "PersonStatusHistory_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestInfo" ADD CONSTRAINT "RequestInfo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForensicSubmissionPerson" ADD CONSTRAINT "ForensicSubmissionPerson_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ForensicSubmission"("submissionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForensicSubmissionPerson" ADD CONSTRAINT "ForensicSubmissionPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForensicSubmissionStatusHistory" ADD CONSTRAINT "ForensicSubmissionStatusHistory_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ForensicSubmission"("submissionId") ON DELETE CASCADE ON UPDATE CASCADE;
