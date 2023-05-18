"use client";

import { CommentOptionsType } from "@/app/(libs)/context/CommentOptions"
import React, { useContext } from "react"
import { CommentOptionsContext } from "../Comment";
import deleteComment from "@/app/(libs)/deleteComment";
import { useRouter } from "next/navigation";

export default function CommentOption({ commentId }: { commentId: string }) {
    const router = useRouter()

    const { commentOptions, setCommentOptions } = useContext(CommentOptionsContext) as CommentOptionsType

    const setRender = (state: boolean) => {
        setCommentOptions({ ...commentOptions, render: state })
    }

    const setDelete = (state: boolean) => {
        setCommentOptions({ edit: false, delete: state, render: false })
        deleteComment(commentId).then(() => router.refresh())
    }

    const setEdit = (state: boolean) => {
        setCommentOptions({ edit: state, delete: false, render: false })
    }

    return (
        <>
            <div className="hidden md:absolute md:flex flex-col gap-2 w-[10rem] px-2 py-2 text-sm top-[0rem] right-[0.8rem] bg-gray-100 border border-gray-300 rounded">
                <button
                    className="bg-black/80 hover:bg-black/90 duration-200 text-white rounded py-1"
                    onClick={() => setEdit(true)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 duration-200 py-1 text-white rounded"
                    onClick={() => {
                        setDelete(true)
                    }}
                >
                    Delete Comment
                </button>
            </div>
            <div className="absolute z-40 flex md:hidden bg-black/30 inset-0"
                onClick={() => setRender(false)}
            ></div>
            <div className="absolute md:hidden z-50 bottom-0 inset-x-0 py-3 grid gap-3 bg-gray-100 border border-gray-300 rounded">
                <button
                    className="mx-[2rem] bg-black/80 active:scale-95 duration-200 text-white px-2 py-2 rounded"
                    onClick={() => setEdit(true)}
                >
                    Edit Comment
                </button>
                <button
                    className="mx-[2rem] bg-red-500 hover:bg-red-600 active:scale-95 duration-200 text-white px-2 py-2 rounded"
                    onClick={() => setDelete(true)}
                >
                    Delete Comment
                </button>
            </div>
        </>
    )
}