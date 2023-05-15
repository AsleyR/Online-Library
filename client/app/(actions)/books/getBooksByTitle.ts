import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getBooksByTitle(title: string) {
    const books = await prisma.books.findMany({
        where: {
            "title": {
                "contains": title,
                mode: "insensitive"
            }
        }
    })
    return books
}