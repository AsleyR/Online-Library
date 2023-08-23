import { books } from "@prisma/client"
import BookOptionsBtn from "./book-options/BookOptionsBtn"
import BookUserAuthor from "./BookUserAuthor"
import BookCover from "./BookCover"
import { UserProfileInfo } from "@/app/(libs)/types"
import BookGenre from "./BookGenre"

export default function Book({ book, bookUser }: { book: books, bookUser: UserProfileInfo }) {

    return (
        <>
            <div className="grid grid-cols-[auto_min-content] gap-3 w-full">
                <div className="grid grid-rows-auto md:grid-cols-[min-content_auto] gap-5">
                    <div className="">
                        <BookCover cover={book.cover} />
                    </div>
                    <div className="flex flex-col gap-3 max-w-full md:max-w-sm">
                        <div className="">
                            <h1 className='font-bold text-3xl'>{book.title}</h1>
                            <h3 className='text-lg italic'>{book.author}</h3>
                            <p className=''>{book.bookReleaseDate}</p>
                        </div>
                        <div className="grid grid-cols-[auto_min-content] gap-3 items-center w-full">
                            <BookUserAuthor book={book} user={bookUser} />
                            <div className="block md:hidden w-max justify-self-end self-end">
                                <BookOptionsBtn bookId={book.id} author={book.publishedBy} />
                            </div>
                        </div>
                        {
                            book.tags.length !== 0 ?
                                <BookGenre genres={book.tags} /> : null
                        }
                    </div>
                </div>
                <div className="hidden md:flex w-max h-min justify-end">
                    <BookOptionsBtn bookId={book.id} author={book.publishedBy} />
                </div>
            </div>
        </>
    )
}