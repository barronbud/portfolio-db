import * as z from "zod"
import { Completeoms_OrderItem, Relatedoms_OrderItemModel } from "./index"

export const oms_ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  sku: z.string().nullish(),
})

export interface Completeoms_Product extends z.infer<typeof oms_ProductModel> {
  orderItems: Completeoms_OrderItem[]
}

/**
 * Relatedoms_ProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_ProductModel: z.ZodSchema<Completeoms_Product> = z.lazy(() => oms_ProductModel.extend({
  orderItems: Relatedoms_OrderItemModel.array(),
}))
