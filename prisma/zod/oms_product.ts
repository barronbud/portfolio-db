import * as z from "zod";
import { Completeoms_OrderItem, Relatedoms_OrderItemModel } from "./index";

export const oms_ProductModel = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.coerce
        .number()
        .positive({ message: "Price must be greater than 0" }),
    stock: z.coerce
        .number()
        .positive({ message: "Stock must be greater than 0" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    sku: z.string().min(1, { message: "SKU is required" }),
    isActive: z.boolean().optional(),
});

export interface Completeoms_Product extends z.infer<typeof oms_ProductModel> {
    orderItems: Completeoms_OrderItem[];
}

/**
 * Relatedoms_ProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_ProductModel: z.ZodSchema<Completeoms_Product> = z.lazy(
    () =>
        oms_ProductModel.extend({
            orderItems: Relatedoms_OrderItemModel.array(),
        })
);
