import * as z from "zod";
import {
    Completeoms_Customer,
    Relatedoms_CustomerModel,
    Completeoms_OrderItem,
    Relatedoms_OrderItemModel,
} from "./index";

export const oms_OrderModel = z.object({
    id: z.number().int(),
    status: z.string(),
    total: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    customerId: z.number().int(),
    shipping: z.number(),
    tax: z.number(),
});

export interface Completeoms_Order extends z.infer<typeof oms_OrderModel> {
    customer: Completeoms_Customer;
    orderItems: Completeoms_OrderItem[];
}

/**
 * Relatedoms_OrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_OrderModel: z.ZodSchema<Completeoms_Order> = z.lazy(
    () =>
        oms_OrderModel.extend({
            customer: Relatedoms_CustomerModel,
            orderItems: Relatedoms_OrderItemModel.array(),
        })
);
