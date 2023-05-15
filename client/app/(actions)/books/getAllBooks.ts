import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getAllBooks() {
    const allBooks = await prisma.books.findMany()
    return (allBooks)
}