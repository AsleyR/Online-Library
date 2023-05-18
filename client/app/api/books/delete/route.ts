import { prisma } from "@/app/(libs)/client"

// Delete book(s)
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const quantity = searchParams.get('quantity') || "single"
    const res = await request.json()

    let deleteBook: any = null

    if (quantity === "many") {

        if (!res.email) {
            return new Response(JSON.stringify({
                error: "Bad request.",
                casue: "Missing or incorrect 'email' parameter"
            }), {
                status: 400
            })
        }

        deleteBook = await prisma.books.deleteMany({
            "where": {
                "author": res.email
            }
        }).catch(error => error)

    } else {

        if (!res.bookId) {
            return new Response(JSON.stringify({
                error: "Bad request.",
                cause: "Missing 'bookId' parameter"
            }), {
                status: 400
            })
        }

        deleteBook = await prisma.books.delete({
            "where": {
                "id": res.bookId
            }
        }).catch(error => error)
    }

    return new Response(JSON.stringify(deleteBook), {
        status: 200
    })
}