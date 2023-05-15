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
            <div className="flex flex-col gap-3">
                <h1 className='font-bold text-xl'>
                    {comments?.length} {comments?.length === 1 && comments?.length ? "Comment" : "Comments"}
                </h1>
                <AddComments bookId={params.id} />
                <Comments comments={comments} />
            </div>
        </div >
    )
}

export default BookPage
