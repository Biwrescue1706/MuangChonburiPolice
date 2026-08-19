-- DropForeignKey
ALTER TABLE "OrganizationCommander" DROP CONSTRAINT "OrganizationCommander_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationFinance" DROP CONSTRAINT "OrganizationFinance_organizationId_fkey";

-- CreateIndex
CREATE INDEX "ForensicSubmissionPerson_submissionId_idx" ON "ForensicSubmissionPerson"("submissionId");

-- CreateIndex
CREATE INDEX "ForensicSubmissionPerson_personId_idx" ON "ForensicSubmissionPerson"("personId");

-- AddForeignKey
ALTER TABLE "OrganizationCommander" ADD CONSTRAINT "OrganizationCommander_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationFinance" ADD CONSTRAINT "OrganizationFinance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;
