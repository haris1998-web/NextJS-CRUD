import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ItemCreate, ItemDelete, ItemUpdate } from "@/lib/types";
import { ItemDeleteSchema, ItemSchema, ItemUpdateSchema } from "@/lib/schemas/item";

const handleError = (message: string, status: number = 500) => 
    NextResponse.json({ message }, { status });

export async function GET() {
    try {
        const items = await prisma.item.findMany({orderBy: { createdAt: "desc" }});
        return NextResponse.json(items, {status: 200});
    } catch (error: any) {
        return handleError("Failed to fetch items.");
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: ItemCreate = await request.json();
        const parsedData = ItemSchema.parse(body);
        const item = await prisma.item.create({data: parsedData});
        return NextResponse.json({ message: "Item created successfully.", data: item }, { status: 201 });
    } catch (error) {
        return handleError(`Failed to create item, ${error}`);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body: ItemUpdate = await request.json();
        const parsedData = ItemUpdateSchema.parse(body);

        const {id, ...updateData} = parsedData;

        const item = await prisma.item.update({
            where: { id: id },
            data: {
                ...updateData
            }
        })

        return NextResponse.json({ message: `Item ${id} updated successfully!`, data: item}, { status: 200 });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return handleError(`Item with given ID does not exist.`, 404);
        }

        return handleError(`Failed to update item. ${error}`);
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body: ItemDelete = await request.json();
        const parsedData = ItemDeleteSchema.parse(body);

        await prisma.item.delete({
            where: { id: parsedData.id }
        });

        return NextResponse.json({ message: `Item ${parsedData.id} deleted successfully!`, data: null}, { status: 200 });

    } catch (error: any) {
        if (error.code === 'P2025') {
            return handleError(`Item with given ID does not exist.`, 404);
        }

        return handleError(`Failed to delete item. ${error}`);
    }
}