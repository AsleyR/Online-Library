"use client"

import { BookOptionsProps } from "@/app/(libs)/types"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

export default function BookOptionsBtn(props: BookOptionsProps) {
    const { user, error, isLoading } = useUser()

    if (props.author.email === user?.email) {
        return (
            <Link href={`/books/options/${props.bookId}`}
                className={`${props.className || ""} flex w-full px-3 py-2 border border-gray-400 rounded-md drop-shadow-sm bg-gray-100 hover:bg-black/80 hover:text-gray-100 transition-all duration-100`}
            >
                Edit Book
            </Link >
        )
    }

    return (
        <></>
    )
}