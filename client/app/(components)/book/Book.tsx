import { books } from "@prisma/client"
import BookOptionsIcon from "./BookOptionsIcon"

export default function Book({ book }: { book: books }) {
    return (
        <>
            <div className="grid grid-cols-[auto_min-content] w-full">
                <div className="grid">
                    <h1 className='font-bold text-3xl'>{book.title}</h1>
                    <h3 className='text-xl italic'>{book.author}</h3>
                    <p className=''>Book release date: <span className="">{book.bookReleaseDate}</span></p>
                    <div className="flex flex-col md:flex-row md:gap-1 md:items-center">
                        <h1>Uploaded by:</h1>
                        <div className="flex flex-col gap-1 md:flex-row">
                            <p className="font-medium">{book.publishedBy.username}</p>
                            <p className="hidden md:block">•</p>
                            <span className="">{book.publishedDate.toDateString()}</span>
                        </div>
                    </div>
                    <div className="grid gap-1 mt-3">
                        <h2 className="font-medium">Genre</h2>
                        <div className="flex flex-wrap gap-2">
                            {
                                book.tags.map((tag, index) => {
                                    return (
                                        <p key={`${index}-tag`} className="bg-gray-200 py-1 px-2 rounded-lg">{tag}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <BookOptionsIcon bookId={book.id} author={book.publishedBy} />
                </div>
            </div>
        </>
    )
}