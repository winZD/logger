-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "note" TEXT,
    "oib" TEXT NOT NULL,
    "payed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_invoice_key" ON "Customer"("invoice");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_oib_key" ON "Customer"("oib");
