import { PrismaClient, comments } from "@prisma/client"
const prisma = new PrismaClient()

/**
 * 
 * @param author 
 * @param comment 
 * @param bookId 
 * @returns 
 */
export default async function createComment(author: comments['author'], comment: comments['comment'], bookId: comments['bookId']) {
    const createComment = await prisma.comments.create({
        "data": {
            "author": author,
            "comment": comment,
            "publishedDate": new Date(),
            "bookId": bookId
        }
    })

    return createComment
}