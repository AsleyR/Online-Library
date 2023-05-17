"use client"

import { useContext, useState } from "react";
import { CommentOptionsContext } from "./Comment";
import { CommentOptionsType } from "@/app/(libs)/context/CommentOptions";
import { useRouter } from "next/navigation";
import { comments } from "@prisma/client";

interface EditCommentFormProps {
    input: {
        comment: string;
    };
    props: {
        className?: string;
        comment: comments
    }
}

export default function EditCommentForm({ className, comment }: EditCommentFormProps['props']) {
    const router = useRouter()
    const [input, setInput] = useState<EditCommentFormProps['input']>({
        'comment': comment.comment
    })

    const { commentOptions, setCommentOptions } = useContext(CommentOptionsContext) as CommentOptionsType

    if (commentOptions.edit) {
        document.getElementById('edit-comment-input')?.focus()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formBody = JSON.stringify({
            commentId: comment.id,
            newComment: input.comment
        })

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/update`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err))

        setCommentOptions({ "delete": false, "edit": false, render: false })

        router.refresh()
    }

    return (
        <form method="POST"
            className={`${className || ""} w-full flex flex-col gap-1`}
            onSubmit={handleSubmit}
        >
            <div className="w-full">
                <textarea
                    id="edit-comment-input"
                    name="comment"
                    className="w-full resize-none bg-gray-100 focus:outline-none border-2 border-black/70 rounded"
                    value={input.comment}
                    onChange={handleChangeTextArea}
                />
            </div>
            <div className="flex gap-1">
                <button
                    className="bg-black/80 hover:bg-black/90 duration-200 text-white border-black px-3 py-1 rounded"
                    type={'button'}
                    onClick={() => setCommentOptions({ render: false, delete: false, edit: false })}
                >
                    Cancel
                </button>
                <button
                    type={'submit'}
                    className="bg-red-500 text-white hover:bg-red-600 duration-200 rounded px-3 py-1"
                >
                    Save
                </button>
            </div>
        </form>
    )
}