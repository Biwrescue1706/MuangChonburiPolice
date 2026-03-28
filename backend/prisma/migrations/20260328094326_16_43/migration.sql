-- DropForeignKey
ALTER TABLE "BodyTypeSnapshot" DROP CONSTRAINT "BodyTypeSnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "EthnicitySnapshot" DROP CONSTRAINT "EthnicitySnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "NationalitySnapshot" DROP CONSTRAINT "NationalitySnapshot_personId_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_personId_fkey";

-- DropForeignKey
ALTER TABLE "RequestInfo" DROP CONSTRAINT "RequestInfo_personId_fkey";

-- DropForeignKey
ALTER TABLE "SkinColorSnapshot" DROP CONSTRAINT "SkinColorSnapshot_personId_fkey";

-- AddForeignKey
ALTER TABLE "NationalitySnapshot" ADD CONSTRAINT "NationalitySnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EthnicitySnapshot" ADD CONSTRAINT "EthnicitySnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTypeSnapshot" ADD CONSTRAINT "BodyTypeSnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinColorSnapshot" ADD CONSTRAINT "SkinColorSnapshot_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestInfo" ADD CONSTRAINT "RequestInfo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("personId") ON DELETE CASCADE ON UPDATE CASCADE;
