import { prisma } from "@/app/(libs)/client"

/**
 * Takes the search params 'userEmail' to get documents that match.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    // const res = await request.json()
    let reqObject: any = null

    if (searchParams.has('userEmail')) {
        console.log(searchParams.get('userEmail'))
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