import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetTaskList(userId: number) {
    return {
        message: "Task list retrieved successfully",
        content: await prisma.task.findMany({
            where: { userId: userId }
        })
    }
}