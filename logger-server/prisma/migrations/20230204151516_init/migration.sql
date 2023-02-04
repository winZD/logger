-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "unit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "invoice" TEXT NOT NULL,
    "discount" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "totalUnitsAvailable" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_invoice_key" ON "Article"("invoice");
