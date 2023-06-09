"use client"

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { comments } from "@prisma/client";
import Image from "next/image";
import DefaultUserIcon from "../user-icons/DefaultUserIcon";

interface AddCommentsProps {
    input: {
        comment: string;
    }
    comment: comments
}

export default function AddComments({ bookId, className }: { bookId: comments['bookId'], className?: string }) {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    const [input, setInput] = useState<AddCommentsProps['input']>({
        "comment": ""
    })

    const [comment, setComment] = useState<AddCommentsProps['comment']>({
        "id": "",
        "author": {
            "email": user?.email || "",
            "profilePicture": user?.picture || "",
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/create`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err))

        router.refresh()
    }

    return (
        <form action={"/api/comments/create"} method={'POST'}
            onSubmit={handleSubmit}
            className={`${className || ""} flex items-center align-middle gap-2 rounded-lg p-3`}
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
            <div className="relative w-full flex flex-col">
                <input
                    className="w-full bg-inherit placeholder:text-black focus:outline-none active:outline-none"
                    type={'text'}
                    name="comment"
                    id="comment"
                    placeholder="Add a comment"
                    value={input.comment}
                    onClick={() => !user ? router.push('/api/auth/login') : null}
                    onChange={handleChange}
                />
                <span className="bottom-0 h-[1px] absolute inset-x-0 bg-black"></span>
            </div>
        </form>
    )
}
