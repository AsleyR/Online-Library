import { prisma } from "@/app/(libs)/client"

export default async function getBooksByAuthor(author: string) {
    const books = await prisma.books.findMany({
        where: {
            "author": {
                "contains": author,
                mode: "insensitive"
            }
        }
    })
    return books
}