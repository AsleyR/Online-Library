import { prisma } from "@/app/(libs)/client"

export async function POST(request: Request) {
    const res = await request.json()

    if (!res.title || !res.author || !res.cover || !res.bookReleaseDate || !res.publishedBy || !res.tags) {
        return new Response(JSON.stringify({
            error: "Wrong request.",
        }), {
            status: 400
        })
    }

    const newComment = await prisma.books.create({
        "data": {
            "title": res.title,
            "author": res.author,
            "cover": res.cover,
            "bookReleaseDate": res.bookReleaseDate,
            "publishedBy": {
                "username": res.publishedBy.username,
                "email": res.publishedBy.email
            },
            "publishedDate": new Date(),
            "tags": res.tags,
        }
    }).catch(error => error)

    return new Response(JSON.stringify(newComment), {
        status: 200
    })
}