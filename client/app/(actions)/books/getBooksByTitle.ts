import { prisma } from "@/app/(libs)/client"

export default async function getBooksByTitle(title: string) {
    const books = await prisma.books.findMany({
        where: {
            "title": {
                "contains": title,
                mode: "insensitive"
            }
        }
    })
    return books
}