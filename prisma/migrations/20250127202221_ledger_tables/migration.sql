-- CreateTable
CREATE TABLE "ledger_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledger_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_Transaction" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ledger_Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ledger_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ledger_Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ledger_User_email_key" ON "ledger_User"("email");

-- AddForeignKey
ALTER TABLE "ledger_Transaction" ADD CONSTRAINT "ledger_Transaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "ledger_Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_Transaction" ADD CONSTRAINT "ledger_Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ledger_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_Transaction" ADD CONSTRAINT "ledger_Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ledger_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
