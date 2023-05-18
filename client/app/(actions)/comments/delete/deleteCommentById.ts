import { prisma } from "@/app/(libs)/client"

export default async function deleteCommentById(commentId: string) {
    const deletedComment = await prisma.books.delete({
        "where": {
            "id": commentId
        }
    })
    return (deletedComment)
}