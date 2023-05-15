import { books } from "@prisma/client"

export default function BookCard({ book }: { book: books }) {
    return (
        <div className="bg-gray-100 p-5 rounded-lg drop-shadow-md w-full hover:scale-105 transition-all">
            <h1 className='font-bold text-lg'>{book.title}</h1>
            <h3 className='font-text-lg'>{book.author}</h3>
            <p className='italic font-light'>{book.bookReleaseDate}</p>
        </div>
    )
}