import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ItemCreate } from "@/lib/types";
import { ItemSchema } from "@/lib/schemas/item";

const handleError = (message: string, status: number = 500) => 
    NextResponse.json({ message }, { status });

export async function GET() {
    try {
        const items = await prisma.item.findMany({orderBy: { createdAt: "desc" }});
        return NextResponse.json(items, {status: 200});
    } catch (error) {
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