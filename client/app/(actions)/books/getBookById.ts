import { prisma } from "@/app/(libs)/client"

export default async function getBookById(bookId: string) {
    const book = await prisma.books.findUnique({
        where: {
            "id": bookId
        }
    })
    return book
}