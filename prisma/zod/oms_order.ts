import * as z from "zod";
import {
    Completeoms_Customer,
    Relatedoms_CustomerModel,
    Completeoms_OrderItem,
    Relatedoms_OrderItemModel,
} from "./index";

export const oms_OrderModel = z.object({
    id: z.string().optional(),
    status: z.string().min(1, { message: "Status is required" }),
    total: z.coerce
        .number()
        .positive({ message: "Total must be greater than 0" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    customerId: z.string().min(1, { message: "Customer ID is required" }),
    shipping: z.coerce.number().nonnegative({
        message: "Shipping must be greater than or equal to 0",
    }),
    tax: z.coerce
        .number()
        .nonnegative({ message: "Tax must be greater than or equal to 0" }),
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
