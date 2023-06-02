import getUserByEmail from '@/app/(actions)/auth0/users/getUsersByEmail';
import getBookById from '@/app/(actions)/books/getBookById';
import getCommentByBookId from '@/app/(actions)/comments/getCommentByBookId';
import HistoryRoute from '@/app/(components)/HistoryRoute';
import Book from '@/app/(components)/book/Book';
import Comments from '@/app/(components)/comments/Comments';
import { UserProfileInfo } from '@/app/(libs)/types';

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

    if (!book) {
        return (
            <div className="">
                <h1 className='font-bold text-3l'>Book not found!</h1>
            </div>
        )
    }

    return (
        <div className='my-[2rem] flex flex-col gap-5'>
            <div className="flex flex-col gap-3">
                <HistoryRoute text='Return to previous page' />
                <Book book={book} bookUser={bookUser} />
            </div>
            <Comments comments={comments} bookId={params.id} />
        </div >
    )
}

export default BookPage
