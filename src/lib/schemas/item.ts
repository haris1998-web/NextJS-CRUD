import z from "zod";

export const ItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
});

export const ItemUpdateSchema = ItemSchema.partial().extend({
    id: z.number("ID is required").int().nonnegative("ID must be a non-negative integer"),
});

export const ItemDeleteSchema = z.object({
    id: z.number("ID is required").int().nonnegative("ID must be a non-negative integer"),
});