import { prisma } from "@/app/(libs)/client"

export default async function getCommentByBookId(bookId: string) {
    const comments = await prisma.comments.findMany({
        where: {
            "bookId": bookId
        }
    })
    return comments
}