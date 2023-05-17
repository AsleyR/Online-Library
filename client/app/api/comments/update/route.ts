import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Update a single comment
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

    if (!res.commentId || !res.newComment) {

        !res.commentId ? cause.push("commentId") : null
        !res.newComment ? cause.push("newComment") : null

        return new Response(JSON.stringify({
            error: "Bad request.",
            cause: `Missing ${cause.map(str => `'${str}'`)} parameters`
        }), {
            status: 400
        })
    }

    const editedComment = await prisma.comments.update({
        "where": {
            "id": res.commentId
        },
        "data": {
            "comment": res.newComment
        }
    }).catch(err => err)

    return new Response(JSON.stringify(editedComment), {
        status: 200
    })
}