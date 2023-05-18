import { prisma } from "@/app/(libs)/client"

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