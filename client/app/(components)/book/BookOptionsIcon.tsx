"use client"

import { BookOptionsProps } from "@/app/(libs)/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { faPencil, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BookOptionsIcon({ className, bookId, author }: BookOptionsProps) {
    const { user, error, isLoading } = useUser()

    return (
        <>
            {
                user?.email === author.email ?
                    <Link href={`/books/options/${bookId}`}
                        className={`${className || ""} h-min hover:text-gray-600 transition-all duration-100`}
                    >
                        <FontAwesomeIcon className="w-4 h-4" icon={faWrench} />
                    </Link >
                    : null
            }
        </>
    )
}