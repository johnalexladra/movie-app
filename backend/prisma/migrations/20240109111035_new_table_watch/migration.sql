-- CreateTable
CREATE TABLE "watch" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "backdrop_path" TEXT,
    "homepage" TEXT,
    "original_title" TEXT,
    "popularity" DECIMAL(10,3) NOT NULL,
    "poster_path" TEXT,
    "title" TEXT,
    "name" TEXT,
    "media_type" TEXT,
    "vote_average" DECIMAL(10,3) NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "watch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watch_id_key" ON "watch"("id");

-- AddForeignKey
ALTER TABLE "watch" ADD CONSTRAINT "watch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
