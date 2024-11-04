import * as z from "zod"
import { Completeoms_Order, Relatedoms_OrderModel } from "./index"

export const oms_CustomerModel = z.object({
  id: z.number().int(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  phone: z.string().nullish(),
  state: z.string().nullish(),
  zip: z.string().nullish(),
})

export interface Completeoms_Customer extends z.infer<typeof oms_CustomerModel> {
  orders: Completeoms_Order[]
}

/**
 * Relatedoms_CustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_CustomerModel: z.ZodSchema<Completeoms_Customer> = z.lazy(() => oms_CustomerModel.extend({
  orders: Relatedoms_OrderModel.array(),
}))
