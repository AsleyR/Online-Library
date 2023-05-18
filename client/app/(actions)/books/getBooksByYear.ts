import { prisma } from "@/app/(libs)/client"

/**
 * Fetches and filters books elements based on year
 * @param year string
 * @returns an array of books elements.
 */
export default async function getBooksByYear(year: string) {
    const books = await prisma.books.findMany()

    let parseBooks: any[] = []
    books.map((book) => {
        if (book.bookReleaseDate.toString() === year) {
            parseBooks.push(book)
        }
    })

    return parseBooks
}