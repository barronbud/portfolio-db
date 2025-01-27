import * as z from "zod";

// ledger_user
export const ledger_user = z.object({
    id: z.string(),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type ledger_user = z.infer<typeof ledger_user>;
