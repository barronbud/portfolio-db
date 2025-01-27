import * as z from "zod";

// ledger_category
export const ledger_category = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ledger_category = z.infer<typeof ledger_category>;
