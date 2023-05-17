import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function deleteCommentById(commentId: string) {
    const deletedComment = await prisma.books.delete({
        "where": {
            "id": commentId
        }
    })
    return (deletedComment)
}