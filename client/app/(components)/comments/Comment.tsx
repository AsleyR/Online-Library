"use client"

import { comments } from "@prisma/client";
import CommentOptions from "./comment-options/CommentOptions";
import DefaultUserIcon from "../user-icons/DefaultUserIcon";
import { CommentOptionsType } from "@/app/(libs)/context/CommentOptions";
import { createContext, useEffect, useState } from "react";
import EditCommentForm from "./EditCommentForm";
import UserIcon from "../user-icons/UserIcon";
import deleteComment from "@/app/(libs)/deleteComment";
import { useRouter } from "next/navigation";
import deleteBookById from "@/app/(actions)/books/delete/deleteBookById";
import deleteCommentById from "@/app/(actions)/comments/delete/deleteCommentById";

export const CommentOptionsContext = createContext<CommentOptionsType | null>(null)

export default function Comment({ comment }: { comment: comments }) {
    const router = useRouter()
    const [commentOptions, setCommentOptions] = useState<CommentOptionsType['commentOptions']>({
        "render": false,
        "edit": false,
        "delete": false
    })

    // const deleteComment = async () => {
    //     if (commentOptions.delete) {
    //         await deleteCommentById(comment.id)
    //     }
    // }

    // deleteComment()

    // useEffect(() => {
    //     deleteComment(comment.id)
    //     setCommentOptions({ render: false, edit: false, delete: false })
    // }, [commentOptions.delete === true])

    return (
        <CommentOptionsContext.Provider value={{ commentOptions, setCommentOptions }}>
            <div className="grid grid-cols-[min-content_auto_min-content] items-start gap-3 bg-gray-200 rounded-lg p-3">
                <UserIcon auth={true} picture={comment.author.profilePicture} className="w-10 h-10" />
                <div className="">
                    <div className="flex flex-col md:flex-row gap-1 md:items-center">
                        <h1 className="font-medium text-lg">{comment.author.username}</h1>
                        <p className="hidden md:block">•</p>
                        <span className="-mt-[0.6rem] md:mt-0 text-sm">{`${comment.publishedDate.toDateString()}`}</span>
                    </div>
                    {
                        commentOptions.edit ? <EditCommentForm comment={comment} /> : <p className="">{comment.comment}</p>
                    }
                </div>
                <CommentOptions
                    commentId={comment.id}
                    author={comment.author}
                />
            </div>
        </CommentOptionsContext.Provider>
    )
}
