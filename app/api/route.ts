import { Body, Data, functions } from '@lib/types';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

/**
 * API router that handles the POST request, dynamically calls the function and returns a JSON response.
 * @param request - The request object.
 * @returns A promise that resolves to a JSON response.
 */
export async function POST(request: Request) {
    const body: Body = await request.json();

    // Dynamically call the function based on the request body
    const data: Data = await functions[body.function](body.param);

    // console.log('Server received:', body);
    // console.log('Server responded:', data);

    return Response.json({
        message: data.message,
        content: data.content,
    })
}