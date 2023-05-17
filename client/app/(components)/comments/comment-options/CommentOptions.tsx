"use client"

import { CommentOptionsType } from "@/app/(libs)/context/CommentOptions";
import { CommentOptionsProps } from "@/app/(libs)/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import CommentOption from "./CommentOption";
import { CommentOptionsContext } from "../Comment";

export default function CommentOptions({ author, commentId }: CommentOptionsProps) {
    const { user, error, isLoading } = useUser()

    const { commentOptions, setCommentOptions } = useContext(CommentOptionsContext) as CommentOptionsType

    const setRender = (state: boolean) => {
        setCommentOptions({ ...commentOptions, render: state })
    }

    return (
        <>
            {
                user?.email === author.email ?
                    <div className="md:relative">
                        <button
                            className="h-min hover:text-gray-600 transition-all duration-100"
                            onClick={() => setRender(!commentOptions.render)}
                        >
                            <FontAwesomeIcon className="w-4 h-4" icon={faEllipsisV} />
                        </button >
                        {
                            commentOptions.render ? <CommentOption commentId={commentId} /> : null
                        }
                    </div>
                    : null
            }
        </>
    )
}