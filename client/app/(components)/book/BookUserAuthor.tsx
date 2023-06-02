"use client"

import { books } from "@prisma/client"
import UserIcon from "../user-icons/UserIcon"
import getFullDateWithoutWeekDate from "@/app/(libs)/getFullDateWithoutWeekDate"
import { UserProfileInfo } from "@/app/(libs)/types"

interface BookUserProps {
    book: books,
    user: UserProfileInfo
}

export default function BookUserAuthor({ book, user }: BookUserProps) {

    return (
        <div className="flex flex-col gap-2">
            <div className="">
                <h1 className="font-medium">Published by:</h1>
            </div>
            <div className="flex flex-row gap-2 md:items-center">
                <UserIcon auth={true} picture={user?.picture} link={`/user/${user.email}`} />
                <div className="flex flex-col">
                    <p className="font-medium">{book.publishedBy.username}</p>
                    <span className="-mt-[0.3rem] text-sm">{getFullDateWithoutWeekDate(book.publishedDate)}</span>
                </div>
            </div>
        </div>
    )
}