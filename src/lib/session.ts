'use server'

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET; // Must be a string with at least 256 bits (32 characters)
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 minutes") // 10 minutes expiration time
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

interface Content {
    user: {
        id: number;
        name: string;
        email: string;
        isPremium: boolean;
    };
}

export async function sessionCreate(content: Content) {
    // Create the session
    const expires = new Date(Date.now() + 600 * 1000); // 10 minutes
    const session = await encrypt({ content, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    // console.log("Session created");
}

export async function sessionUpdate(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 600 * 1000); // 10 minutes

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    
    return res;
}

export async function sessionGet() {
    const session = cookies().get("session")?.value;

    if (session) {
        return await decrypt(session)
    } else {
        return null;
    }
}

export async function sessionDestroy() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
    // console.log("Session destroyed");
}