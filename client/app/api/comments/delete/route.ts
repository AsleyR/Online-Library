import { prisma } from "@/app/(libs)/client"

// Delete comment(s)
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const quantity = searchParams.get('quantity') || "single"
    const res = await request.json()

    let deletedComment: any = null

    if (quantity === "many") {
        if (!res.bookId) {
            return new Response(JSON.stringify({
                error: "Bad request.",
                cause: "Missing 'bookId' parameter"
            }), {
                status: 400
            })
        }

        deletedComment = await prisma.comments.deleteMany({
            "where": {
                "bookId": res.bookId
            }
        }).catch(error => error)

    } else {
        if (!res.commentId)
            return new Response(JSON.stringify({
                error: "Bad request.",
                cause: "Missing 'commentId' parameter"
            }), {
                status: 400
            })

        deletedComment = await prisma.comments.delete({
            "where": {
                "id": res.commentId
            }
        }).catch(error => error)
    }

    return new Response(JSON.stringify(deletedComment), {
        status: 200
    })
}