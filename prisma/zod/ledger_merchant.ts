import * as z from "zod";

// ledger_merchant
export const ledger_merchant = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Name is required" }),
    isFlagged: z.boolean().default(false),
});

export type ledger_merchant = z.infer<typeof ledger_merchant>;
