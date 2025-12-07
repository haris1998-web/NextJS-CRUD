import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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