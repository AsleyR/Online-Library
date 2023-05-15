import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const quantity = searchParams.get('quantity') || "single"
    const res = await request.json()

    if (!res.author) {
        if (!res.bookId)
            return new Response(JSON.stringify({ error: "Bad request." }), {
                status: 400
            })
    }

    let deletedComment: any = null

    if (quantity === "many") {
        deletedComment = await prisma.comments.deleteMany({
            "where": {
                "bookId": res.bookId
            }
        })

    } else {
        deletedComment = await prisma.comments.delete({
            "where": {
                "id": res.id
            }
        })
    }

    return new Response(JSON.stringify(deletedComment), {
        status: 200
    })
}