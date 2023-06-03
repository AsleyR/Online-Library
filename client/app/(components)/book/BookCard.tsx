import { books } from "@prisma/client"
import Image from "next/image"

export default function BookCard({ book }: { book: books }) {
    const defaultBookCover = '/images/default-book-cover.png'

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg drop-shadow-md w-full hover:scale-105 transition-all">
            <div className="overflow-y-hidden h-[112px] rounded-t-lg">
                <Image
                    className=""
                    width={400}
                    height={400}
                    src={book.cover || defaultBookCover}
                    alt="Book cover"
                />
            </div>
            <div className="p-5">
                <h1 className='font-bold text-lg'>{book.title}</h1>
                <h3 className='font-text-lg'>{book.author}</h3>
                <p className='italic font-light'>{book.bookReleaseDate}</p>
            </div>
        </div>
    )
}