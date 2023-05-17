import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Update a single book
export async function POST(request: Request) {
    const res = await request.json().catch(err => null)
    let cause = []

    if (!res) {
        return new Response(JSON.stringify({
            error: "Bad Request"
        }), {
            status: 400
        })
    }

    if (!res.bookId || !res.author || !res.title || !res.bookReleaseDate || !res.tags) {

        !res.bookId ? cause.push("bookId") : null // Inmutable
        !res.title ? cause.push("title") : null
        !res.author ? cause.push("author") : null
        !res.bookReleaseDate ? cause.push("bookReleaseDate") : null
        !res.tags ? cause.push("tags") : null

        return new Response(JSON.stringify({
            error: "Bad request.",
            cause: `Missing ${cause.map(str => `'${str}'`)} parameters`
        }), {
            status: 400
        })
    }

    const editedComment = await prisma.books.update({
        "where": {
            "id": res.bookId
        },
        "data": {
            "title": res.title,
            "author": res.author,
            "bookReleaseDate": res.bookReleaseDate,
            "tags": res.tags
        }
    }).catch(err => err)

    return new Response(JSON.stringify(editedComment), {
        status: 200
    })
}