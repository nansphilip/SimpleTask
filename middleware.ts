import { NextRequest } from "next/server";
import { sessionUpdate } from "@/lib";

export async function middleware(request: NextRequest) {
    return await sessionUpdate(request);
}