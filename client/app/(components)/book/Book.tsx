import { books } from "@prisma/client"

export default function Book({ book }: { book: books }) {
    return (
        <div className="rounded-lg w-full">
            <h1 className='font-bold text-3xl'>{book.title}</h1>
            <h3 className='text-xl'>{book.author}</h3>
            <p className=''>Publishing date: <span className="">{book.bookReleaseDate}</span></p>
            <div className="flex gap-2">
                {
                    book.tags.map((tag, index) => {
                        return (
                            <p key={`${index}-tag`}>{tag}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}