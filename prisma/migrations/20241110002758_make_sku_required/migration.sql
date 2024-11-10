/*
  Warnings:

  - Made the column `sku` on table `oms_Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "oms_Product" ALTER COLUMN "sku" SET NOT NULL;
