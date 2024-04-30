'use server'

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Must be a string with at least 256 bits (32 characters)
const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30 minutes") // 30 minutes expiration time
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

// Create the session
export async function sessionCreate(content: Content) {
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
    const session = await encrypt({ content, expires });

    // Save the session in a cookie
    cookies().set("session", session, {
        expires, 
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
}

// Update the session expiration time
export async function sessionUpdate(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        expires: parsed.expires,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
    
    return res;
}

// Get the session if it exists
export async function sessionGet() {
    const session = cookies().get("session")?.value;
    return session ? await decrypt(session) : null;
}

// Destroy the session
export async function sessionDestroy() {
    cookies().set("session", "", { expires: new Date(0) });
}