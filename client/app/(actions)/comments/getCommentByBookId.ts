import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getCommentByBookId(bookId: string) {
    const comments = await prisma.comments.findMany({
        where: {
            "bookId": bookId
        }
    })
    return comments
}