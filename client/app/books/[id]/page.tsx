import getUserByEmail from '@/app/(actions)/auth0/users/getUsersByEmail';
import getBookById from '@/app/(actions)/books/getBookById';
import getRandomBooks from '@/app/(actions)/books/getRandomBooks';
import getCommentByBookId from '@/app/(actions)/comments/getCommentByBookId';
import HistoryRoute from '@/app/(components)/HistoryRoute';
import Book from '@/app/(components)/book/Book';
import SideViewBookCards from '@/app/(components)/book/SideViewBookCards';
import Comments from '@/app/(components)/comments/Comments';
import getFullDateWithoutWeekDate from '@/app/(libs)/getFullDateWithoutWeekDate';
import { UserProfileInfo } from '@/app/(libs)/types';
import { books } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface BookPageProps {
    params: {
        id: string;
    }
}

type MetadataProps = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: MetadataProps) {
    const bookId = params.id
    const bookTitle = await getBookById(bookId).then((book) => book?.title)

    return {
        "title": `${bookTitle} - Online Library`
    }
}

const BookPage = async ({ params }: BookPageProps) => {
    const book = await getBookById(params.id).catch(err => null)
    const comments = await getCommentByBookId(params.id).catch(err => null)

    const bookUser: UserProfileInfo = await getUserByEmail(book?.publishedBy.email || "").then((res) => res[0])

    const parsedRandomBooks: any[] = []
    const randomBooks = await getRandomBooks(99).then((books) => {
        books.map((book: any) => {
            if (book.id !== params.id) {
                parsedRandomBooks.push(book)
            }
        })
    })

    if (!book) {
        return (
            <div className="">
                <h1 className='font-bold text-3l'>Book not found!</h1>
            </div>
        )
    }

    return (
        <div className='my-[2rem] grid grid-flow-row lg:grid-flow-col gap-3 lg:gap-[5rem] transition-all'>
            <div className="flex flex-col gap-3">
                <HistoryRoute text='Return to previous page' />
                <Book book={book} bookUser={bookUser} />
                <Comments comments={comments} bookId={params.id} />
            </div>
            <SideViewBookCards books={parsedRandomBooks} />
        </div >
    )
}

export default BookPage
