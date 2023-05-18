import { prisma } from "@/app/(libs)/client"

export default async function getAllComments() {
    const allComments = await prisma.comments.findMany()
    return (allComments)
}