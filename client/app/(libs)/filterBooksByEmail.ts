import { books } from "@prisma/client";

export default function filterBooksByEmail(books: books[], email: string) {
    let filteredBooks: any = []
    books.map((book) => {
        if (book.publishedBy.email === email) {
            filteredBooks.push(book)
        }
    })
    return filteredBooks
}