import Link from "next/link"
import BookCard from "./BookCard"
import { UserBooksProps } from "./UserBooks"

export default function BookCards({ books }: UserBooksProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {
                books?.map((book: any, index) => {
                    return (
                        <Link key={`${index}-link-book-card`} href={`/books/${book.id}`}>
                            <BookCard book={book} />
                        </Link>
                    )
                })
            }
        </div>
    )
}