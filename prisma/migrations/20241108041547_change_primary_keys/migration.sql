/*
  Warnings:

  - The primary key for the `oms_Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `oms_Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `oms_OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `oms_Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `address` on table `oms_Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `oms_Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `oms_Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `oms_Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `oms_Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "oms_Order" DROP CONSTRAINT "oms_Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "oms_OrderItem" DROP CONSTRAINT "oms_OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "oms_OrderItem" DROP CONSTRAINT "oms_OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "oms_Customer" DROP CONSTRAINT "oms_Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "zip" SET NOT NULL,
ADD CONSTRAINT "oms_Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "oms_Customer_id_seq";

-- AlterTable
ALTER TABLE "oms_Order" DROP CONSTRAINT "oms_Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "oms_Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "oms_Order_id_seq";

-- AlterTable
ALTER TABLE "oms_OrderItem" DROP CONSTRAINT "oms_OrderItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ADD CONSTRAINT "oms_OrderItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "oms_OrderItem_id_seq";

-- AlterTable
ALTER TABLE "oms_Product" DROP CONSTRAINT "oms_Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "oms_Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "oms_Product_id_seq";

-- AddForeignKey
ALTER TABLE "oms_Order" ADD CONSTRAINT "oms_Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "oms_Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oms_OrderItem" ADD CONSTRAINT "oms_OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "oms_Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oms_OrderItem" ADD CONSTRAINT "oms_OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "oms_Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
