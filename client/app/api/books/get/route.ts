import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

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



    // if (!res.title || !res.author || !res.bookReleaseDate || !res.publishedBy || !res.tags) {
    //     return new Response(JSON.stringify({
    //         error: "Wrong request.",
    //     }), {
    //         status: 400
    //     })
    // }

    const books = await prisma.books.findMany(reqObject).catch(error => error)

    return new Response(JSON.stringify(books), {
        status: 200
    })
}