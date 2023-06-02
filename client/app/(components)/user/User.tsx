"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserInfo from "./UserInfo"
import { books } from "@prisma/client"

interface UserProps {
    books: books[]
}

export default function User({ books }: UserProps) {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    useEffect(() => {
        if (!user) {
            router.push('/api/auth/login')
        }
    }, [user])

    if (!user) {
        return <></>
    }

    return (
        <>
            <UserInfo books={books} user={user} auth={true} />
        </>
    )
}