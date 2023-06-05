"use client"

import { comments } from "@prisma/client";
import CommentOptions from "./comment-options/CommentOptions";
import { CommentOptionsType } from "@/app/(libs)/context/CommentOptions";
import { createContext, useState } from "react";
import EditCommentForm from "./EditCommentForm";
import UserIcon from "../user-icons/UserIcon";
import { useRouter } from "next/navigation";
import getFullDateWithoutWeekDate from "@/app/(libs)/getFullDateWithoutWeekDate";
import { ComponentProps } from "@/app/(libs)/types";

export const CommentOptionsContext = createContext<CommentOptionsType | null>(null)

interface CommentProps extends ComponentProps {
    comment: comments
}

export default function Comment({ comment, className }: CommentProps) {
    const router = useRouter()
    const [commentOptions, setCommentOptions] = useState<CommentOptionsType['commentOptions']>({
        "render": false,
        "edit": false,
        "delete": false
    })

    return (
        <CommentOptionsContext.Provider value={{ commentOptions, setCommentOptions }}>
            <div className={`${className || ""} grid grid-cols-[min-content_auto_min-content] items-start gap-3 rounded-lg p-3`}>
                <UserIcon auth={true} picture={comment.author.profilePicture} link={`/user/${comment.author.email}`} className="w-10 h-10" />
                <div className="w-full">
                    <div className="flex flex-col md:flex-row gap-1 md:items-center">
                        <h1 className="font-medium text-lg">{comment.author.username}</h1>
                        <p className="hidden md:block">•</p>
                        <span className="-mt-[0.6rem] md:mt-0 text-sm">{getFullDateWithoutWeekDate(comment.publishedDate)}</span>
                    </div>
                    {
                        commentOptions.edit ? <EditCommentForm comment={comment} /> : <p className="">{comment.comment}</p>
                    }
                    {/* <div className="flex gap-3">
                        <LikeButton commentId={comment.id} />
                        <DislikeButton commentId={comment.id} />
                        <button className="w-8 h-8 hover:bg-gray-100 flex justify-center align-middle items-center rounded-full transition-all relative">
                            <FontAwesomeIcon className="w-4" icon={faCommentDots} />
                        </button>
                    </div> */}
                </div>
                <CommentOptions
                    commentId={comment.id}
                    author={comment.author}
                />
            </div>
        </CommentOptionsContext.Provider>
    )
}
