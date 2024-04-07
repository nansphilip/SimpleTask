import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const userForm = await request.json();
    // console.log('User ID:', userForm.id);

    const taskList = await prisma.task.findMany({
        where: { userId: userForm.id }
    });
    // console.log('Tasks founded:', taskList)

    // If user does not exist or password is invalid, return "Invalid credentials"
    if (!taskList) {
        return Response.json({
            status: "ok",
            message: "Task list does not exist",
            content: ``,
        })
    }

    // If user exists and password is valid, return "Valid credentials" and user data for the client session
    return Response.json({
        status: "ok",
        message: "Task list retrieved successfully",
        content: {
            taskList,
        },
    })
}