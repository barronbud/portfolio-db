import * as z from "zod";

// ledger_transaction
export const ledger_transaction = z.object({
    id: z.string(),
    amount: z.number().min(1, { message: "Amount is required" }),
    date: z.date().optional(),
    merchantId: z.string().min(1, { message: "Merchant is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    userId: z.string().min(1, { message: "User is required" }),
});

export type ledger_transaction = z.infer<typeof ledger_transaction>;
