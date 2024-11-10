/*
  Warnings:

  - You are about to alter the column `total` on the `oms_Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `shipping` on the `oms_Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `tax` on the `oms_Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `oms_OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `oms_Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "oms_Order" ALTER COLUMN "total" SET DEFAULT 0,
ALTER COLUMN "total" SET DATA TYPE INTEGER,
ALTER COLUMN "shipping" SET DEFAULT 0,
ALTER COLUMN "shipping" SET DATA TYPE INTEGER,
ALTER COLUMN "tax" SET DEFAULT 0,
ALTER COLUMN "tax" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "oms_OrderItem" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "oms_Product" ALTER COLUMN "price" SET DATA TYPE INTEGER;
