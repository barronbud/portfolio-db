import * as z from "zod";

export const oms_CustomerModel = z.object({
    id: z.string().optional(),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zip: z
        .string()
        .min(1, { message: "Zip code is required" })
        .max(10, { message: "Zip code must be less than 10 digits" }),
    isActive: z.boolean().optional(),
});

export interface Completeoms_Customer
    extends z.infer<typeof oms_CustomerModel> {}

/**
 * Relatedoms_CustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const Relatedoms_CustomerModel: z.ZodSchema<Completeoms_Customer> =
    z.lazy(() => oms_CustomerModel);
