import { comments } from "@prisma/client";
import Comment from "./Comment";
import AddComments from "./AddComments";

interface CommentsProps {
    comments: comments[] | null;
    bookId: string;
}

export default function Comments({ comments, bookId }: CommentsProps) {
    if (!comments) {
        return (
            <div className="flex flex-col gap-3 max-w-none md:max-w-xl transition-all">
                <h1 className='font-bold text-xl'>
                    0 Comments
                </h1>
                <AddComments bookId={bookId} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3 max-w-none md:max-w-xl transition-all">
            <h1 className='font-bold text-xl'>
                {comments?.length} {comments?.length === 1 && comments?.length ? "Comment" : "Comments"}
            </h1>
            <AddComments bookId={bookId} />
            <div className="flex flex-col gap-3">
                {
                    comments.map((comment, index) => {
                        return (
                            <Comment key={`${index}-comment`} comment={comment} />
                        )
                    })
                }
            </div>
        </div>
    )
}
