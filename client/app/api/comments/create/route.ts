import { prisma } from "@/app/(libs)/client"

export async function POST(request: Request) {
    const res = await request.json()

    if (!res.author || !res.comment || !res.bookId) {
        if (!res.author.username || !res.author.userId) {
            return new Response(JSON.stringify({ error: "Wrong request." }), {
                status: 400
            })
        }
    }

    const newComment = await prisma.comments.create({
        "data": {
            "author": res.author,
            "bookId": res.bookId,
            "comment": res.comment,
            "publishedDate": new Date()
        }
    }).catch(error => error)

    return new Response(JSON.stringify(newComment), {
        status: 200
    })
}