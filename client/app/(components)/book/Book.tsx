import { books } from "@prisma/client"
import BookOptionsIcon from "./BookOptionsIcon"
import BookUserAuthor from "./BookUserAuthor"
import BookCover from "./BookCover"
import { UserProfileInfo } from "@/app/(libs)/types"
import BookGenre from "./BookGenre"

export default function Book({ book, bookUser }: { book: books, bookUser: UserProfileInfo }) {

    return (
        <>
            <div className="grid grid-cols-[auto_min-content] w-full">
                <div className="grid grid-rows-auto md:grid-cols-[min-content_auto] gap-5">
                    <div className="">
                        <BookCover cover={book.cover} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="">
                            <h1 className='font-bold text-3xl'>{book.title}</h1>
                            <h3 className='text-lg italic'>{book.author}</h3>
                            <p className=''>{book.bookReleaseDate}</p>
                        </div>
                        <BookUserAuthor book={book} user={bookUser} />
                        {
                            book.tags.length !== 0 ?
                                <BookGenre genres={book.tags} /> : null
                        }
                    </div>
                </div>
                <div className="flex justify-end">
                    <BookOptionsIcon bookId={book.id} author={book.publishedBy} />
                </div>
            </div>
        </>
    )
}