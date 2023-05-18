import { prisma } from "@/app/(libs)/client"

export default async function getBooksByUserEmail(userEmail: string) {
    const books = await prisma.books.findMany({
        where: {
            "publishedBy": {
                "is": {
                    "email": userEmail
                }
            }
        }
    })
    return books
}