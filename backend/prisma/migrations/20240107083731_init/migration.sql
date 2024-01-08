/*
  Warnings:

  - Made the column `vote_average` on table `favorite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vote_count` on table `favorite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "favorite" ALTER COLUMN "vote_average" SET NOT NULL,
ALTER COLUMN "vote_count" SET NOT NULL;
