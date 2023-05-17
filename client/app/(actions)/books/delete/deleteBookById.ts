import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function deleteBookById(bookId: string) {
    const deletedBook = await prisma.books.delete({
        "where": {
            "id": bookId
        }
    })
    return (deletedBook)
}