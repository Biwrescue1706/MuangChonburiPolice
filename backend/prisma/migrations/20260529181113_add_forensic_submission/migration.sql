-- CreateTable
CREATE TABLE "ForensicSubmission" (
    "submissionId" TEXT NOT NULL,
    "submissionNo" TEXT,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForensicSubmission_pkey" PRIMARY KEY ("submissionId")
);

-- CreateTable
CREATE TABLE "ForensicSubmissionPerson" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "ForensicSubmissionPerson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForensicSubmissionPerson_submissionId_personId_key" ON "ForensicSubmissionPerson"("submissionId", "personId");

-- AddForeignKey
ALTER TABLE "ForensicSubmissionPerson" ADD CONSTRAINT "ForensicSubmissionPerson_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ForensicSubmission"("submissionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForensicSubmissionPerson" ADD CONSTRAINT "ForensicSubmissionPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;
