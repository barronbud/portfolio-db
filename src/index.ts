import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContext = async (ctx: any): Promise<any> => {
    ctx.callbackWaitsForEmptyEventLoop = false;

    return {
        ...ctx,
        prisma,
    };
};

export * from "../prisma/zod";
