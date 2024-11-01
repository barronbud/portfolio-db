/*
  Warnings:

  - You are about to drop the column `userId` on the `oms_Order` table. All the data in the column will be lost.
  - You are about to drop the `oms_User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `oms_Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "oms_Order" DROP CONSTRAINT "oms_Order_userId_fkey";

-- AlterTable
ALTER TABLE "oms_Order" DROP COLUMN "userId",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "oms_User";

-- CreateTable
CREATE TABLE "oms_Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oms_Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oms_Customer_email_key" ON "oms_Customer"("email");

-- AddForeignKey
ALTER TABLE "oms_Order" ADD CONSTRAINT "oms_Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "oms_Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
