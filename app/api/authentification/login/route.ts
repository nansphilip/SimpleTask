import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const userForm = await request.json();
    // console.log('Server received "login" method:', userForm);

    const userDB = await prisma.user.findUnique({
        where: { email: userForm.email }
    });
    // console.log('User founded:', userDB)

    // Verify if the passwords hash match using bcrypt
    const bcrypt = require('bcrypt');
    const isPasswordValid = userDB ? await bcrypt.compare(userForm.password, userDB.password) : false;
    // console.log('Password is valid:', isPasswordValid);

    // If user does not exist or password is invalid, return "Invalid credentials"
    if (!userDB || !isPasswordValid) {
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
                id: userDB.id,
                name: userDB.name,
                email: userDB.email,
                isPremium: userDB.isPremium,
            }
        },
    })
}