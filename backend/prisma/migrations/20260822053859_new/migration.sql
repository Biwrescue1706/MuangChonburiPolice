-- CreateTable
CREATE TABLE "Foreigner" (
    "id" TEXT NOT NULL,
    "sequenceNo" INTEGER,
    "foreignerIdNo" TEXT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "certificateRegistrationNo" TEXT,
    "certificateDate" DATE,
    "district" TEXT,
    "province" TEXT,
    "domicile" TEXT,
    "applicationDate" DATE,
    "expirationDate" DATE,
    "amount" DECIMAL(65,30),
    "receiptBookNo" TEXT,
    "receiptNo" TEXT,
    "receiptDate" DATE,
    "certificateNo" TEXT,
    "petitionDate" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Foreigner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Foreigner_foreignerIdNo_idx" ON "Foreigner"("foreignerIdNo");

-- CreateIndex
CREATE INDEX "Foreigner_name_idx" ON "Foreigner"("name");

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
