import { books } from "@prisma/client"
import HorizontalBookCard from "./HorizontalBookCard"

export default function SideViewBookCards({ books }: { books: books[] }) {
    return (
        <div className='flex flex-col gap-5'>
            {
                books.map((book: books, index: number) => {
                    return (
                        <HorizontalBookCard key={`${index}-book-vertical-card`} book={book} />
                    )
                })
            }
        </div>
    )
}