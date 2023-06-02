"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { books } from "@prisma/client"
import { useRouter } from "next/navigation"
import EditBookForm from "./EditBookForm"
import HistoryRoute from "../../HistoryRoute"

interface EditBookProps {
    book: books
}

export default function EditBook({ book }: EditBookProps) {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    if (!user) {
        router.push('/api/auth/login')

        return <></>
    }

    if (user.email !== book.publishedBy.email) {
        return (
            <div className="">
                <h1 className="font-bold">User not authorized to edit this book.</h1>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <HistoryRoute text="Return to book" />
                <h1 className="font-bold text-2xl">Book options</h1>
                <EditBookForm book={book} />
            </div>
        </>
    )
}