'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    console.log('Server received "signUp" method:', body);

    const getUser = await prisma.user.findUnique({
        where: { email: body.email }
    });
    // console.log('User founded:', getUser)

    if (getUser) {
        return Response.json({
            status: "ok",
            message: "Email already used",
            content: ``,
        })
    }
    
    // Hash the password using bcrypt
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const createUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        }
    });
    console.log('User created:', createUser)

    return Response.json({
        status: "ok",
        message: "New user created",
        content: {
            user: {
                id: createUser.id,
                name: createUser.name,
                email: createUser.email,
                isPremium: createUser.isPremium,
            }
        },
    })
}