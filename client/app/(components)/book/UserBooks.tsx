import { ComponentProps } from "@/app/(libs)/types"
import BookCard from "./BookCard"
import { books } from "@prisma/client"
import Link from "next/link"
import BookCards from "./BookCards";

export interface UserBooksProps extends ComponentProps {
    // user: UserProfile | undefined
    books: books[] | null;
}

export default function UserBooks({ books }: UserBooksProps) {
    // const books = await getBooksByUserEmail(user?.email || "").catch(err => null)

    if (!books) {
        return (
            <div className="">
                <h1 className='font-bold text-2xl'>My books</h1>
                <p className="">{`You haven't uploaded any book entries yet!`}</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-5">
            <h1 className='font-bold text-2xl'>My books</h1>
            <BookCards books={books} />
        </div>
    )
}
