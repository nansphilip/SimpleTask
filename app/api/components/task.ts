import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function AddTask(param: { userId: number, title: string, desc: string }) {
    return {
        message: "Task added successfully",
        content: await prisma.task.create({
            data: {
                title: param.title,
                desc: param.desc,
                userId: param.userId,
            }
        })
    }
}

export async function UpdateTask(param: { id: number, title: string, desc: string }) {
    return {
        message: "Task updated successfully",
        content: await prisma.task.update({
            where: { id: param.id },
            data: {
                title: param.title,
                desc: param.desc,
            }
        })
    }
}

export async function DeleteTask(param: { id: number }) {
    return {
        message: "Task deleted successfully",
        content: await prisma.task.delete({
            where: { id: param.id }
        })
    }
}

export async function GetAllTask(userId: number) {
    return {
        message: "Task list retrieved successfully",
        content: await prisma.task.findMany({
            where: { userId: userId }
        })
    }
}

// Export the functions names and types
export const taskFunctions = {
    AddTask,
    UpdateTask,
    DeleteTask,
    GetAllTask,
};