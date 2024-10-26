-- CreateTable
CREATE TABLE "oms_User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oms_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oms_Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oms_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oms_Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oms_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oms_OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "oms_OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oms_User_email_key" ON "oms_User"("email");

-- AddForeignKey
ALTER TABLE "oms_Order" ADD CONSTRAINT "oms_Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "oms_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oms_OrderItem" ADD CONSTRAINT "oms_OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "oms_Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oms_OrderItem" ADD CONSTRAINT "oms_OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "oms_Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
