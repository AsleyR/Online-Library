import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

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