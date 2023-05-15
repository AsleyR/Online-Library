import { comments } from "@prisma/client";
import Comment from "./Comment";

export default function Comments({ comments }: { comments: comments[] | null }) {
    if (!comments) {
        return (
            <div className="">
                <h1>No comments</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {
                comments.map((comment) => {
                    return (
                        <Comment comment={comment} />
                    )
                })
            }
        </div>
    )
}
