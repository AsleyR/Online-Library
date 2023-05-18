"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { books } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserBooks from "../book/UserBooks"

const LogoutButton = () => {
    return (
        <button className='bg-red-500 hover:scale-105 transition-all text-white px-5 py-2 rounded'>
            <Link href={'/api/auth/logout'}>Logout</Link>
        </button>
    )
}

export default function UserInfo({ books }: { books: books[] }) {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    let userBooks: any = []
    books.map((book) => {
        if (book.publishedBy.email === user?.email) {
            userBooks.push(book)
        }
    })

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
            <div className="">
                <h1 className='font-bold text-2xl'>Account Info</h1>
                <p>Username: <span className=''>{user?.nickname}</span></p>
                <p>Email: <span className='underline'>{user?.email}</span></p>
            </div>
            <div className="flex justify-center">
                <LogoutButton />
            </div>
            <UserBooks books={books} />
        </>
    )
}
