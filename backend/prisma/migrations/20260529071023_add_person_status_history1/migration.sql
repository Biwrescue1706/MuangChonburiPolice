-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_personId_fkey";

-- CreateTable
CREATE TABLE "PersonStatusHistory" (
    "historyId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "oldStatus" INTEGER NOT NULL,
    "newStatus" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonStatusHistory_pkey" PRIMARY KEY ("historyId")
);

-- CreateIndex
CREATE INDEX "PersonStatusHistory_personId_idx" ON "PersonStatusHistory"("personId");

-- CreateIndex
CREATE INDEX "PersonStatusHistory_oldStatus_newStatus_idx" ON "PersonStatusHistory"("oldStatus", "newStatus");

-- CreateIndex
CREATE INDEX "PersonStatusHistory_changedAt_idx" ON "PersonStatusHistory"("changedAt");

-- AddForeignKey
ALTER TABLE "PersonStatusHistory" ADD CONSTRAINT "PersonStatusHistory_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;
