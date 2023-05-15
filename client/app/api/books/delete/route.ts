import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function POST(request: Request) {
    const res = await request.json()

    if (!res.id) {

        return new Response(JSON.stringify({ error: "Wrong request." }), {
            status: 400
        })
    }

    const newComment = await prisma.books.delete({
        "where": {
            "id": res.id
        }
    }).catch(error => error)

    return new Response(JSON.stringify(newComment), {
        status: 200
    })
}