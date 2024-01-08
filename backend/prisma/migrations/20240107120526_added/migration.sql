/*
  Warnings:

  - You are about to drop the column `mediaType` on the `favorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "mediaType",
ADD COLUMN     "media_type" TEXT;
