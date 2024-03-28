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

    if (!getUser || getUser.password !== body.password) {
        return Response.json({
            status: "ok",
            message: "Invalid credentials",
            content: ``,
        })
    }

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