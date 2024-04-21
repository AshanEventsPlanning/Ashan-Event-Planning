-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "chair" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "arrangement" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "noOfArrangements" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
