/*
  Warnings:

  - You are about to drop the column `movieId` on the `favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "favorite_movieId_key";

-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "movieId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "favorite_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "favorite_id_key" ON "favorite"("id");
