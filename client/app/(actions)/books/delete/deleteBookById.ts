import { prisma } from "@/app/(libs)/client"

export default async function deleteBookById(bookId: string) {
    const deletedBook = await prisma.books.delete({
        "where": {
            "id": bookId
        }
    })
    return (deletedBook)
}