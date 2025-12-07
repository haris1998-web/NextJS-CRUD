import z from "zod";

export const ItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
})