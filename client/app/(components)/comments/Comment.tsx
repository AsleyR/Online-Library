import { comments } from "@prisma/client";

export default function Comment({ comment }: { comment: comments }) {
    const day = comment.publishedDate.getDate()
    const month = comment.publishedDate.getMonth()
    const year = comment.publishedDate.getFullYear()

    return (
        <div className="flex flex-col gap-2 bg-gray-200 rounded-lg p-3">
            <div className="">
                <h1 className="font-medium text-lg">{comment.author.username}</h1>
                <span>{`${day}-${month}-${year}`}</span>
            </div>
            <p>{comment.comment}</p>
        </div>
    )
}
