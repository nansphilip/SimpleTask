import { NextRequest } from "next/server";
import { sessionUpdate } from "@lib/session";

export async function middleware(request: NextRequest) {
    return await sessionUpdate(request);
}