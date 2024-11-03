-- AlterTable
ALTER TABLE "oms_Customer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "oms_Order" ADD COLUMN     "shipping" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "total" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "oms_Product" ADD COLUMN     "sku" TEXT;
