import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
import { env } from "prisma/config";

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({url: env("DATABASE_URL")}),
});
export default prisma;