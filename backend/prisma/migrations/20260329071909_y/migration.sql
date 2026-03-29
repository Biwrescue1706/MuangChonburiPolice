/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personId]` on the table `RequestInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Receipt_personId_key" ON "Receipt"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "RequestInfo_personId_key" ON "RequestInfo"("personId");
