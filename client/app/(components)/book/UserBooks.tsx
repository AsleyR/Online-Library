import { ComponentProps } from "@/app/(libs)/types"
import BookCard from "./BookCard"
import { books } from "@prisma/client"
import Link from "next/link"
import BookCards from "./BookCards";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import capitalizeFirstLetter from "@/app/(libs)/capitalizeFirstLetter";

export interface UserBooksProps extends ComponentProps {
    user?: UserProfile;
    books: books[] | null;
    auth?: boolean
}

export default function UserBooks({ books, user, auth }: UserBooksProps) {

    auth = auth ? true : false // HAHAHAHA

    if (!books || books.length === 0) {
        return (
            <div className="border border-gray-300 p-5 drop-shadow-sm rounded">
                <h1 className='font-bold text-2xl'>
                    {
                        auth ? "My books" : `Published books`
                    }
                </h1>
                {
                    auth ?
                        <p className="">{`You haven't uploaded any book entries yet!`}</p>
                        :
                        <p className="">{`This user hasn't uploaded any book entries yet!`}</p>
                }
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-5 border border-gray-300 p-5 drop-shadow-sm rounded">
            <h1 className='font-bold text-2xl'>
                {
                    auth ?
                        "My books" : `Published books`
                }
            </h1>
            <BookCards books={books} />
        </div>
    )
}
