"use client"

import CreateBook from "@/app/(components)/book/CreateBook";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
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
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Create New Book</h1>
            <CreateBook />
        </div>
    )
}
