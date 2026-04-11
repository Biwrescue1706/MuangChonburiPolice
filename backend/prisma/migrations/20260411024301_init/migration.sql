/*
  Warnings:

  - You are about to drop the `BodyTypeSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EthnicitySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NationalitySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkinColorSnapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BodyTypeSnapshot" DROP CONSTRAINT "BodyTypeSnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "EthnicitySnapshot" DROP CONSTRAINT "EthnicitySnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "NationalitySnapshot" DROP CONSTRAINT "NationalitySnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "PersonFile" DROP CONSTRAINT "PersonFile_personId_fkey";

-- DropForeignKey
ALTER TABLE "SkinColorSnapshot" DROP CONSTRAINT "SkinColorSnapshot_personId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "commanderFirstName" TEXT,
ADD COLUMN     "commanderFullName" TEXT,
ADD COLUMN     "commanderFullNameWithRank" TEXT,
ADD COLUMN     "commanderFullPosition" TEXT,
ADD COLUMN     "commanderFullRank" TEXT,
ADD COLUMN     "commanderLastName" TEXT,
ADD COLUMN     "commanderPosition" TEXT,
ADD COLUMN     "commanderRank" TEXT,
ADD COLUMN     "financeFirstName" TEXT,
ADD COLUMN     "financeFullName" TEXT,
ADD COLUMN     "financeFullNameWithRank" TEXT,
ADD COLUMN     "financeLastName" TEXT,
ADD COLUMN     "financePosition" TEXT,
ADD COLUMN     "financeRank" TEXT;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Receipt" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "BodyTypeSnapshot";

-- DropTable
DROP TABLE "EthnicitySnapshot";

-- DropTable
DROP TABLE "NationalitySnapshot";

-- DropTable
DROP TABLE "PersonFile";

-- DropTable
DROP TABLE "SkinColorSnapshot";
