-- AlterTable
ALTER TABLE "ForensicSubmission" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3);

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

-- CreateIndex
CREATE INDEX "ForensicSubmissionStatusHistory_submissionId_idx" ON "ForensicSubmissionStatusHistory"("submissionId");

-- CreateIndex
CREATE INDEX "ForensicSubmissionStatusHistory_changedAt_idx" ON "ForensicSubmissionStatusHistory"("changedAt");

-- AddForeignKey
ALTER TABLE "ForensicSubmissionStatusHistory" ADD CONSTRAINT "ForensicSubmissionStatusHistory_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ForensicSubmission"("submissionId") ON DELETE CASCADE ON UPDATE CASCADE;
