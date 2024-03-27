import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)

    async function main() {
        await prisma.user.findUnique({
            where: { email: body.email }
        })
    }

    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })

    return Response.json({ body })
}