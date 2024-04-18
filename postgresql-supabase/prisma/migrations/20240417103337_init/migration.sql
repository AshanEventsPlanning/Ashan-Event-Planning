-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "chair" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "arrangement" TEXT NOT NULL,
    "content" TEXT,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
