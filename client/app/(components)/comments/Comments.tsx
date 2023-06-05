import { comments } from "@prisma/client";
import Comment from "./Comment";
import AddComments from "./AddComments";
import MobileComments from "./MobileComments";

export interface CommentsProps {
    comments: comments[] | null;
    bookId: string;
}

export default function Comments({ comments, bookId }: CommentsProps) {
    if (!comments) {
        return (
            <>
                <MobileComments comments={comments} bookId={bookId} />
                <div className="hidden md:flex flex-col gap-3 max-w-none md:max-w-xl transition-all">
                    <h1 className='font-bold text-lg'>
                        0 Comments
                    </h1>
                    <AddComments bookId={bookId} />
                </div>
            </>
        )
    }

    return (
        <>
            <MobileComments comments={comments} bookId={bookId} />
            <div className="hidden md:grid grid-flow-row gap-3 transition-all">
                <h1 className='font-bold text-lg'>
                    {comments?.length} {comments?.length === 1 && comments?.length ? "Comment" : "Comments"}
                </h1>
                <AddComments className="bg-gray-200" bookId={bookId} />
                <div className="flex flex-col gap-3">
                    {
                        comments.map((comment, index) => {
                            return (
                                <Comment key={`${index}-comment`}
                                    className="bg-gray-200"
                                    comment={comment}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
