import * as z from "zod"
import { Completeoms_Order, Relatedoms_OrderModel } from "./index"

export const oms_CustomerModel = z.object({
  id: z.number().int(),
  email: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
  address: z.string().min(1, { message: "Address is required" }).nullish(),
  city: z.string().min(1, { message: "City is required" }).nullish(),
  phone: z.string().min(1, { message: "Phone number is required" }).nullish(),
  state: z.string().min(1, { message: "State is required" }).nullish(),
  zip: z.string().min(1, { message: "Zip code is required" }).max(5, { message: "Zip code must be 5 digits" }).nullish(),
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
