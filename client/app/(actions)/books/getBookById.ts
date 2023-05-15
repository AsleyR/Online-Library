import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getBookById(bookId: string) {
    const book = await prisma.books.findUnique({
        where: {
            "id": bookId
        }
    })
    return book
}