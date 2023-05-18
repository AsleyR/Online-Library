import { prisma } from "@/app/(libs)/client"

export default async function getAllBooks() {
    const allBooks = await prisma.books.findMany()
    return (allBooks)
}