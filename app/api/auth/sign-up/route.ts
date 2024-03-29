import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const userForm = await request.json();
    console.log('Server received "signUp" method:', userForm);

    const userDB = await prisma.user.findUnique({
        where: { email: userForm.email }
    });
    // console.log('User founded:', userDB)

    if (userDB) {
        return Response.json({
            status: "ok",
            message: "Email already used",
            content: ``,
        })
    }
    
    // Hash the password using bcrypt
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userForm.password, salt);

    const createUser = await prisma.user.create({
        data: {
            name: userForm.name,
            email: userForm.email,
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