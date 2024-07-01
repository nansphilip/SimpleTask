import prisma from '@lib/prisma'

export async function AddTask(param: {
    userId: number,
    id: number,
    title: string,
    desc: string,
    status: "todo" | "pending" | "inprogress" | "done",
}) {

    const data = {
        message: "Task added successfully",
        content: await prisma.task.create({
            data: {
                userId: param.userId,
                title: param.title,
                desc: param.desc,
                status: param.status,
            }
        })
    }

    console.log("Task added: ", data);

    return data;
}

export async function UpdateTask(param: {
    id: number,
    title: string,
    desc: string,
    status: "todo" | "pending" | "inprogress" | "done",
    startDate: Date,
    endDate: Date,
}) {
    const data = {
        message: "Task updated successfully",
        content: await prisma.task.update({
            where: { id: param.id },
            data: {
                title: param.title,
                desc: param.desc,
                status: param.status,
                startDate: param.startDate,
                endDate: param.endDate,
            }
        })
    }

    console.log("Task updated: ", data);

    return data;
}

export async function DeleteTask(param: { id: number }) {
    const data = {
        message: "Task deleted successfully",
        content: await prisma.task.delete({
            where: { id: param.id }
        })
    }

    console.log("Task deleted: ", data);

    return data;
}

export async function GetAllTask(userId: number) {
    const data = {
        message: "Task list retrieved successfully",
        content: await prisma.task.findMany({
            where: { userId: userId }
        })
    }

    console.log("Task list retrieved: ", data);

    return data;
}

// Export the functions names and types
export const taskFunctions = {
    AddTask,
    UpdateTask,
    DeleteTask,
    GetAllTask,
};