import * as z from "zod"
import { Completeoms_Order, Relatedoms_OrderModel, Completeoms_Product, Relatedoms_ProductModel } from "./index"

export const oms_OrderItemModel = z.object({
  id: z.string().optional(),
  orderId: z.string().min(1, { message: "Order ID is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  quantity: z.number().int().int({ message: "Quantity is required" }).positive({ message: "Quantity must be greater than 0" }),
  price: z.number().int().positive({ message: "Price must be greater than 0" }),
})

export interface Completeoms_OrderItem extends z.infer<typeof oms_OrderItemModel> {
  order: Completeoms_Order
  product: Completeoms_Product
}

/**
 * Relatedoms_OrderItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_OrderItemModel: z.ZodSchema<Completeoms_OrderItem> = z.lazy(() => oms_OrderItemModel.extend({
  order: Relatedoms_OrderModel,
  product: Relatedoms_ProductModel,
}))
