import * as z from "zod";
import {
    Completeoms_Order,
    Relatedoms_OrderModel,
    Completeoms_Product,
    Relatedoms_ProductModel,
} from "./index";

export const oms_OrderItemModel = z.object({
    id: z.string(),
    quantity: z.coerce
        .number()
        .positive({ message: "Quantity must be greater than 0" }),
    price: z.coerce
        .number()
        .positive({ message: "Price must be greater than 0" }),
});

export interface Completeoms_OrderItem
    extends z.infer<typeof oms_OrderItemModel> {
    order: Completeoms_Order;
    product: Completeoms_Product;
}

/**
 * Relatedoms_OrderItemModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_OrderItemModel: z.ZodSchema<Completeoms_OrderItem> =
    z.lazy(() =>
        oms_OrderItemModel.extend({
            order: Relatedoms_OrderModel,
            product: Relatedoms_ProductModel,
        })
    );
