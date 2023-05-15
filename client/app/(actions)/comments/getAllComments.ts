import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getAllComments() {
    const allComments = await prisma.comments.findMany()
    return (allComments)
}