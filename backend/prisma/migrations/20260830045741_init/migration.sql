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
