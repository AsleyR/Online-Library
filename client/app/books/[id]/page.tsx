import getBookById from '@/app/(actions)/books/getBookById';
import getAllComments from '@/app/(actions)/comments/getAllComments';
import getCommentByBookId from '@/app/(actions)/comments/getCommentByBookId';
import Book from '@/app/(components)/book/Book';
import AddComments from '@/app/(components)/comments/AddComments';
import Comment from '@/app/(components)/comments/Comment';
import Comments from '@/app/(components)/comments/Comments';

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

    if (!book) {
        return (
            <div className="">
                <h1 className='font-bold text-3l'>Book not found!</h1>
            </div>
        )
    }

    return (
        <div className='my-[2rem] flex flex-col gap-5'>
            <Book book={book} />
            <Comments comments={comments} bookId={params.id} />
        </div >
    )
}

export default BookPage
