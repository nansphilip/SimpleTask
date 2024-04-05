import { NextRequest } from "next/server";
import { sessionUpdate } from "@/lib";

export async function middleware(request: NextRequest) {
    console.log("Middleware");
    return await sessionUpdate(request);
}