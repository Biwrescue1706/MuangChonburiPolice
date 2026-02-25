/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "key" TEXT NOT NULL DEFAULT 'MAIN',
ADD COLUMN     "position" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_key_key" ON "Organization"("key");
