import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getBooksByTags(tags: string) {
    const books = await prisma.books.findMany({
        where: {
            "tags": {
                "has": tags
            }
        }
    })

    return books
}