import { prisma } from "@/app/(libs)/client"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let reqObject: any = null

    if (searchParams.has('userEmail')) {
        reqObject = {
            "where": {
                "publishedBy": {
                    "is": {
                        'email': searchParams.get('userEmail')
                    }
                }
            }
        }
    }

    const books = await prisma.books.findMany(reqObject).catch(error => error)

    return new Response(JSON.stringify(books), {
        status: 200
    })
}