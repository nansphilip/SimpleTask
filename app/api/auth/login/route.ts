'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    console.log('Server received "login" method:', body);

    const getUser = await prisma.user.findUnique({
        where: { email: body.email }
    });
    console.log('User founded:', getUser)

    // Verify if the passwords hash match using bcrypt
    const bcrypt = require('bcrypt');
    const isPasswordValid = getUser ? await bcrypt.compare(body.password, getUser.password) : false;
    console.log('Password is valid:', isPasswordValid);

    // If user does not exist or password is invalid, return "Invalid credentials"
    if (!getUser || !isPasswordValid) {
        return Response.json({
            status: "ok",
            message: "Invalid credentials",
            content: ``,
        })
    }

    // If user exists and password is valid, return "Valid credentials" and user data for the client session
    return Response.json({
        status: "ok",
        message: "Valid credentials",
        content: {
            user: {
                id: getUser.id,
                name: getUser.name,
                email: getUser.email,
                isPremium: getUser.isPremium,
            }
        },
    })
}