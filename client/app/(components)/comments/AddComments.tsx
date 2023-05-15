"use client"

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, useRouter } from "next/navigation";
import { comments } from "@prisma/client";
import Image from "next/image";
import { DefaultUserIcon } from "../navbar/NavLinks";

interface AddCommentsProps {
    input: {
        comment: string;
    }
    comment: comments
}

export default function AddComments({ bookId }: { bookId: comments['bookId'] }) {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    const [input, setInput] = useState<AddCommentsProps['input']>({
        "comment": ""
    })

    const [comment, setComment] = useState<AddCommentsProps['comment']>({
        "id": "",
        "author": {
            "email": user?.email || "",
            "username": user?.nickname || user?.email || "User"
        },
        "comment": input.comment,
        "bookId": bookId,
        "publishedDate": new Date(),
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const deleteInput = () => {
        setInput({
            "comment": ""
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const json: any = {}
        formData.forEach((value, prop) => {
            return json[prop] = value
        })

        const formBody = JSON.stringify({
            author: comment.author,
            comment: input.comment,
            bookId: comment.bookId,
        })

        deleteInput()

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/create`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err))

        router.refresh()
    }

    return (
        <form action={"/api/comments/create"} method={'POST'}
            onSubmit={handleSubmit}
            className="flex items-center align-middle gap-2"
        >
            {
                user && user.picture ? <Image
                    className="rounded-full w-10 h-10"
                    width={100}
                    height={100}
                    src={user.picture}
                    alt="user icon"
                /> : <DefaultUserIcon />
            }
            <div className="relative max-w-xs">
                <input
                    className=" w-full border-b border-black placeholder:text-black focus:outline-none active:outline-none"
                    type={'text'}
                    name="comment"
                    id="comment"
                    placeholder="Add a comment"
                    value={input.comment}
                    onClick={() => !user ? router.push('/api/auth/login') : null}
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}
